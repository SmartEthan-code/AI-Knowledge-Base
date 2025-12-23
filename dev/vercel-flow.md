# Vercel 新手教程

## 什么是 Vercel？

Vercel 是一个现代化的云平台，专为前端开发者设计。它提供无服务器函数、静态站点托管和边缘计算能力。

## 快速开始

### 1. 创建账户
- 访问 [vercel.com](https://vercel.com)
- 使用 GitHub、GitLab 或 Bitbucket 账户登录

### 2. 部署第一个项目

```bash
# 安装 Vercel CLI
npm i -g vercel

# 进入项目目录
cd your-project

# 部署
vercel
```

### 3. 连接 Git 仓库
- 在 Vercel Dashboard 点击 "New Project"
- 选择你的 Git 仓库
- 配置构建设置
- 点击 Deploy

## 核心功能

### 自动部署
- 每次推送到主分支时自动部署
- 预览部署用于 Pull Request

### 环境变量
在 Settings → Environment Variables 中配置：
```
API_KEY=your_key
DATABASE_URL=your_url
```

### 自定义域名
- 在 Domains 标签页添加域名
- 按照 DNS 说明配置

## 支持的框架

- Next.js（官方最佳支持）
- React
- Vue.js
- Svelte
- 静态站点生成器

## 最佳实践

- 使用环境变量保护敏感信息
- 定期检查分析数据
- 使用预览部署测试更改

<br>

# 本地部署
```
npm run docs:dev
```

