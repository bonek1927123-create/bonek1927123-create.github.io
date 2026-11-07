# 唐俊贤个人简历与作品集

基于 React、TypeScript、Vite 与 GSAP 构建的单页个人作品集，包含个人介绍、简历、主要作品、作品预览和联系方式。

## 本地开发

```powershell
pnpm install
pnpm dev
```

默认访问地址：`http://127.0.0.1:5173/`

## 生产构建

```powershell
pnpm build
pnpm preview
```

生产文件输出到 `dist/`。

## 部署

项目使用 Vercel 长期部署方案：

- Node.js：22
- Install Command：`pnpm install --frozen-lockfile`
- Build Command：`pnpm build`
- Output Directory：`dist`

推送到 GitHub 主分支后，由 Vercel 自动构建和发布。

## 素材说明

- 页面图片：`public/images/`
- 首页视频：`public/videos/`
- 简历文件：`public/documents/`
