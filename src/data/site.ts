export type SectionKey = 'home' | 'resume' | 'work' | 'preview' | 'possibilities'

export type ProjectTone = 'graphite' | 'moss' | 'sage' | 'ink'

export type Project = {
  slug: string
  title: string
  englishTitle: string
  category: string
  role: string
  year: string
  mark: string
  tone: ProjectTone
  summary: string
  output: string
  productionCycle?: string
  software?: string
  coverImage?: string
  externalUrl?: string
  processUrl?: string
}

export const sectionIds: Record<SectionKey, string> = {
  home: 'home',
  resume: 'resume',
  work: 'work',
  preview: 'preview',
  possibilities: 'possibilities',
}

export const projects: Project[] = [
  {
    slug: 'the-killer-project',
    title: '我当杀手的那些事儿',
    englishTitle: 'The Killer Among Us',
    category: 'AI 漫剧 · 剧情短片',
    role: '导演、分镜、视觉开发、生成、剪辑',
    year: '2026',
    mark: '杀',
    tone: 'moss',
    summary: '从日常空间切入的 AI 漫剧短片，通过分镜、场景资产、角色一致性与声音设计完成完整叙事。',
    output: 'AI 漫剧 / 分镜资产 / 成片',
    productionCycle: '8天 · 10月1日 - 10月9日',
    software: 'TapNow / 小云雀 / 即梦 / 剪映',
    coverImage: '/images/the-killer-project-poster.jpg',
    externalUrl: 'https://v.douyin.com/24RHd3jslnA',
    processUrl: 'https://www.xiaoyunque.com/canvas-share?scene=project&shareId=ACrI2VVh4J24GIr0z2YSsXnAY98k3yy5RX-sDRLtCsXaL0SGDKXJ5_zNA0_QbgpCpI5SXyWt_GhjRXBRnQ&projectId=10224954241036',
  },
  {
    slug: 'brand-film',
    title: '品牌影像项目',
    englishTitle: 'Brand Moving Image',
    category: '品牌影像 · 概念条目',
    role: '视觉开发、生成、后期',
    year: '2026',
    mark: '界',
    tone: 'graphite',
    summary: '用于展示品牌视觉开发、镜头测试、动态画面与最终交付之间的关系。',
    output: '品牌视频 / 视觉提案 / 动态封面',
  },
  {
    slug: 'visual-system',
    title: '视觉系统实验',
    englishTitle: 'Visual System Lab',
    category: '视觉开发 · 概念条目',
    role: '风格研究、生成、精修',
    year: '2026',
    mark: '构',
    tone: 'sage',
    summary: '用于整理风格测试、材质研究、角色一致性与镜头语言实验。',
    output: '视觉设定 / 镜头测试 / 图像序列',
  },
  {
    slug: 'independent-product',
    title: '独立产品实验',
    englishTitle: 'Independent Product',
    category: '数字产品 · 概念条目',
    role: '概念、界面、前端开发',
    year: '2026',
    mark: '生',
    tone: 'ink',
    summary: '用于呈现独立开发项目的问题、产品判断、界面结构与技术实现。',
    output: '产品原型 / 页面实现 / 交互体验',
  },
]

