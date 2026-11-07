import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import './annotation-tool.css'

type StoredAnnotation = {
  id: string
  selector: string
  tag: string
  label: string
  text: string
  note: string
  x: number
  y: number
  width: number
  height: number
}

type SelectedTarget = {
  element: HTMLElement
  selector: string
  tag: string
  label: string
  text: string
}

const STORAGE_KEY = 'codex-portfolio-annotations'

const escapeClass = (value: string) => {
  try {
    return CSS.escape(value)
  } catch {
    return value.replace(/[^a-zA-Z0-9_-]/g, (char) => String.fromCharCode(92) + char)
  }
}

const getSelector = (element: HTMLElement) => {
  if (element.id) return '#' + escapeClass(element.id)

  const parts: string[] = []
  let current: HTMLElement | null = element

  while (current && current !== document.body && parts.length < 6) {
    let part = current.tagName.toLowerCase()
    const stableClasses = Array.from(current.classList)
      .filter((name) => !name.startsWith('is-') && !name.startsWith('annotation-'))
      .slice(0, 2)

    if (stableClasses.length > 0) {
      part += '.' + stableClasses.map(escapeClass).join('.')
    }

    const nextParent: HTMLElement | null = current.parentElement
    if (nextParent) {
      const currentTag: string = current.tagName
      const childElements: Element[] = Array.from(nextParent.children)
      const siblings: Element[] = childElements.filter((child) => child.tagName === currentTag)
      if (siblings.length > 1) {
        part += ':nth-of-type(' + (siblings.indexOf(current) + 1) + ')'
      }
    }

    parts.unshift(part)
    current = nextParent
  }

  return parts.join(' > ')
}

const getVisibleText = (element: HTMLElement) => {
  return (element.innerText || element.getAttribute('aria-label') || element.getAttribute('alt') || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100)
}

const findAnnotatableElement = (target: Element | null) => {
  if (!target || target.closest('[data-annotation-ui]')) return null

  const candidate = target.closest(
    'h1,h2,h3,h4,p,a,button,section,article,header,nav,footer,img,video,li,.project-card,.project-media,.hero-video-slot,.page-intro,.resume-summary__card,.circular-carousel__title,.circular-carousel__subtitle,.circular-carousel__count',
  ) as HTMLElement | null

  const element = candidate ?? (target instanceof HTMLElement ? target : null)
  if (!element || element === document.body || element === document.documentElement) return null
  return element
}

function AnnotationToolInner() {
  const [active, setActive] = useState(false)
  const [selected, setSelected] = useState<SelectedTarget | null>(null)
  const [note, setNote] = useState('')
  const [annotations, setAnnotations] = useState<StoredAnnotation[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as StoredAnnotation[]) : []
    } catch {
      return []
    }
  })
  const [hoverRect, setHoverRect] = useState<DOMRect | null>(null)
  const [, refreshLayout] = useReducer((value: number) => value + 1, 0)
  const [flashId, setFlashId] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(annotations))
  }, [annotations])

  const closeTool = useCallback(() => {
    setActive(false)
    setHoverRect(null)
    setSelected(null)
    setNote('')
  }, [])

  const toggleTool = useCallback(() => {
    if (active) closeTool()
    else setActive(true)
  }, [active, closeTool])

  useEffect(() => {
    document.body.classList.toggle('annotation-active', active)
    return () => document.body.classList.remove('annotation-active')
  }, [active])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'a') {
        event.preventDefault()
        toggleTool()
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [toggleTool])

  useEffect(() => {
    if (!selected) return
    window.setTimeout(() => textAreaRef.current?.focus(), 50)
  }, [selected])

  useEffect(() => {
    if (!active) return undefined

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null
      if (target?.closest('[data-annotation-ui]')) {
        setHoverRect(null)
        return
      }
      const element = findAnnotatableElement(target)
      setHoverRect(element ? element.getBoundingClientRect() : null)
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null
      if (target?.closest('[data-annotation-ui]')) return
      const element = findAnnotatableElement(target)
      if (!element) return

      event.preventDefault()
      event.stopPropagation()
      const label = getVisibleText(element)
      setSelected({
        element,
        selector: getSelector(element),
        tag: element.tagName.toLowerCase(),
        label,
        text: label,
      })
      setNote('')
      setHoverRect(null)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (selected) {
          setSelected(null)
          setNote('')
        } else {
          closeTool()
        }
      }
    }

    document.addEventListener('pointerover', handlePointerOver, true)
    document.addEventListener('click', handleClick, true)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerover', handlePointerOver, true)
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [active, selected, closeTool])

  useEffect(() => {
    if (!active || annotations.length === 0) return undefined

    let frame = 0
    const refresh = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => refreshLayout())
    }
    window.addEventListener('scroll', refresh, { passive: true })
    window.addEventListener('resize', refresh)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', refresh)
      window.removeEventListener('resize', refresh)
    }
  }, [active, annotations.length])

  const annotationRects = useMemo(() => {
    return annotations.map((annotation) => {
      let element: Element | null = null
      try {
        element = document.querySelector(annotation.selector)
      } catch {
        element = null
      }
      return {
        annotation,
        rect: element ? element.getBoundingClientRect() : null,
      }
    })
  }, [annotations])

  const saveAnnotation = () => {
    if (!selected || !note.trim()) return
    const rect = selected.element.getBoundingClientRect()
    const next: StoredAnnotation = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      selector: selected.selector,
      tag: selected.tag,
      label: selected.label,
      text: selected.text,
      note: note.trim(),
      x: Math.round(rect.left),
      y: Math.round(rect.top),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    }
    setAnnotations((current) => [...current, next])
    setSelected(null)
    setNote('')
    setStatus('标注已保存')
  }

  const buildMarkdown = () => {
    const lines = [
      '# 网页修改标注',
      '',
      '页面：' + window.location.origin + window.location.pathname,
      '视口：' + window.innerWidth + '×' + window.innerHeight,
      '',
    ]
    annotations.forEach((annotation, index) => {
      lines.push('## 标注 ' + (index + 1) + ' · ' + annotation.tag.toUpperCase())
      lines.push('')
      lines.push('- 元素：' + annotation.selector)
      if (annotation.label) lines.push('- 元素文本：' + annotation.label)
      lines.push('- 页面位置：x=' + annotation.x + '，y=' + annotation.y + '，w=' + annotation.width + '，h=' + annotation.height)
      lines.push('- 修改要求：' + annotation.note)
      lines.push('')
    })
    return lines.join(String.fromCharCode(10))
  }

  const downloadMarkdown = () => {
    const blob = new Blob([buildMarkdown()], { type: 'text/markdown;charset=utf-8' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = '网页修改标注.md'
    link.click()
    URL.revokeObjectURL(href)
  }

  const copyMarkdown = async () => {
    const text = buildMarkdown()
    try {
      await navigator.clipboard.writeText(text)
      setStatus('已复制，回到对话粘贴即可')
    } catch {
      downloadMarkdown()
      setStatus('剪贴板不可用，已下载 Markdown')
    }
  }

  const locateAnnotation = (id: string, selector: string) => {
    let element: Element | null = null
    try {
      element = document.querySelector(selector)
    } catch {
      element = null
    }
    if (!element) {
      setStatus('找不到该元素，可能页面结构已变化')
      return
    }
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setFlashId(id)
    window.setTimeout(() => setFlashId(null), 1600)
  }

  return (
    <div data-annotation-ui data-ui="annotation-tool">
      {!active ? (
        <button
          type="button"
          className="annotation-toggle"
          onClick={() => setActive(true)}
          title="快捷键：Ctrl+Shift+A"
        >
          页面标注
        </button>
      ) : null}

      {active ? (
        <aside className="annotation-panel" aria-label="页面标注工具">
          <header className="annotation-panel__header">
            <div>
              <p className="annotation-panel__title">页面标注</p>
              <p className="annotation-panel__hint">点击页面元素，写下修改要求</p>
            </div>
            <button type="button" className="annotation-close" onClick={closeTool}>
              退出
            </button>
          </header>

          {selected ? (
            <section className="annotation-editor">
              <p className="annotation-editor__element">{selected.selector}</p>
              {selected.label ? <p className="annotation-editor__preview">{selected.label}</p> : null}
              <label className="annotation-editor__label" htmlFor="annotation-note">
                修改要求
              </label>
              <textarea
                id="annotation-note"
                ref={textAreaRef}
                className="annotation-editor__textarea"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="例如：这个标题太大，缩小10%，并与下方正文左对齐"
              />
              <div className="annotation-editor__actions">
                <button type="button" className="annotation-primary" onClick={saveAnnotation} disabled={!note.trim()}>
                  保存标注
                </button>
                <button type="button" className="annotation-secondary" onClick={() => setSelected(null)}>
                  取消
                </button>
              </div>
            </section>
          ) : (
            <p className="annotation-empty">在页面上点击要修改的文字、图片、卡片或区块。</p>
          )}

          <section className="annotation-list">
            <div className="annotation-list__heading">
              <span>已保存 {annotations.length} 条</span>
              {annotations.length > 0 ? (
                <button type="button" className="annotation-text-button" onClick={() => setAnnotations([])}>
                  清空
                </button>
              ) : null}
            </div>
            {annotations.length === 0 ? (
              <p className="annotation-list__empty">还没有标注</p>
            ) : (
              annotations.map((annotation, index) => (
                <article className="annotation-card" key={annotation.id}>
                  <div className="annotation-card__top">
                    <span className="annotation-card__index">{index + 1}</span>
                    <button
                      type="button"
                      className="annotation-card__selector"
                      onClick={() => locateAnnotation(annotation.id, annotation.selector)}
                    >
                      {annotation.selector}
                    </button>
                    <button
                      type="button"
                      className="annotation-card__delete"
                      onClick={() => setAnnotations((current) => current.filter((item) => item.id !== annotation.id))}
                      aria-label={'删除标注 ' + (index + 1)}
                    >
                      删除
                    </button>
                  </div>
                  <p className="annotation-card__note">{annotation.note}</p>
                </article>
              ))
            )}
          </section>

          <footer className="annotation-panel__footer">
            <button type="button" className="annotation-primary" onClick={copyMarkdown} disabled={!annotations.length}>
              复制给 Codex
            </button>
            <button type="button" className="annotation-secondary" onClick={downloadMarkdown} disabled={!annotations.length}>
              下载 .md
            </button>
            {status ? <p className="annotation-status">{status}</p> : null}
          </footer>
        </aside>
      ) : null}

      {active && hoverRect ? (
        <div
          className="annotation-highlight"
          style={{ left: hoverRect.left, top: hoverRect.top, width: hoverRect.width, height: hoverRect.height }}
        />
      ) : null}

      {active ? annotationRects.map(({ annotation, rect }, index) => {
        if (!rect) return null
        return (
          <div key={annotation.id}>
            <div
              className={
                'annotation-box' +
                (flashId === annotation.id ? ' annotation-box--flash' : '')
              }
              style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }}
            />
            <button
              type="button"
              className="annotation-pin"
              style={{ left: rect.left + 10, top: rect.top + 10 }}
              onClick={() => locateAnnotation(annotation.id, annotation.selector)}
              aria-label={'定位标注 ' + (index + 1)}
            >
              {index + 1}
            </button>
          </div>
        )
      }) : null}
    </div>
  )
}

function AnnotationTool() {
  if (!import.meta.env.DEV) return null
  return <AnnotationToolInner />
}

export default AnnotationTool
