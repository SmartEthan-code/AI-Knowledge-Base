# Windows 下用 VitePress + GitHub/Vercel 部署静态知识库（教程）

简要：在 Windows 上用 VitePress 建站，代码推到 GitHub，再用 Vercel 自动部署。适合写知识库（docs/ 目录）。

## 前置条件
- Windows（PowerShell / cmd / WSL 均可）
- Node.js（LTS）
- Git（并已登录 GitHub）
- GitHub 账号与仓库
- Vercel 账号（可连接 GitHub）

## 快速步骤概览
1. 新建项目目录并初始化 npm
2. 安装 VitePress
3. 创建 docs/ 内容与配置
4. 本地预览与构建
5. 推送到 GitHub
6. 在 Vercel 连接仓库并部署

## 详细步骤

1) 新建项目与依赖
- 在 PowerShell:
    ```
    mkdir aikb && cd aikb
    npm init -y
    npm i -D vitepress
    ```
- 建议安装 vite（可选）：
    ```
    npm i -D vite
    ```

2) package.json（示例 scripts）
- 在 package.json 中加入：
    ```json
    {
        "scripts": {
            "dev": "vitepress dev docs",
            "build": "vitepress build docs",
            "serve": "vitepress serve docs"
        }
    }
    ```

3) 项目结构（示例）
```
aikb/
    package.json
    docs/
        .vitepress/
            config.js
        index.md
        guide.md
```

4) 最小配置示例
- docs/.vitepress/config.js
    ```js
    module.exports = {
        title: '知识库',
        description: '基于 VitePress 的静态知识库',
        themeConfig: {
            nav: [
                { text: 'Home', link: '/' },
                { text: '指南', link: '/guide' }
            ],
            sidebar: {
                '/': [
                    { text: '介绍', link: '/' },
                    { text: '指南', link: '/guide' }
                ]
            }
        }
    }
    ```
- docs/index.md
    ```md
    # 欢迎
    这是知识库主页。
    ```
- docs/guide.md
    ```md
    # 指南
    写一些文档内容。
    ```

5) 本地开发与构建
- 本地预览：
    ```
    npm run dev
    ```
    在浏览器访问 http://localhost:5173
- 构建产物：
    ```
    npm run build
    ```
    构建输出目录（当 source 为 docs）：
    docs/.vitepress/dist

6) 推送到 GitHub
- 初始化 git，提交并推到远程仓库：
    ```
    git init
    git add .
    git commit -m "init vitepress docs"
    git remote add origin https://github.com/USERNAME/REPO.git
    git branch -M master
    git push -u origin master
    ```

7) 在 Vercel 上部署（通过 GitHub 集成）
- 登录 Vercel，Import Project → 选择你的 GitHub 仓库。
- Build Command: npm run build
- Output Directory: docs/.vitepress/dist
- Root Directory: 留空或 /
- Environment: 使用默认即可
- 点击 Deploy → 部署成功后会给出站点 URL

8) 常见注意点
- 输出目录必须设置为 docs/.vitepress/dist（如果 docs 为源目录）。
- 若使用自定义域，在 Vercel 仪表盘添加并按提示配置 DNS。
- 若想用 GitHub Actions 或 GitHub Pages，可改用相应流程，但 Vercel 更简单直接。

完成后：编辑 docs/ 下的 Markdown 文件，推送到 GitHub，Vercel 会自动 rebuild 并发布新版本。
