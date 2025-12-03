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

步骤一：准备本地环境
您需要安装 Node.js 和 Git，它们是运行和管理静态网站的必需工具。
    1. 安装 Node.js
    下载： 访问 Node.js 官方网站。
    
    安装： 下载 LTS (长期支持版) 的 Windows 安装包，双击运行并按照提示安装。
    
    验证： 安装完成后，打开 命令提示符 (CMD) 或 PowerShell，输入以下命令验证：
    node -v
    npm -v
    （如果能显示版本号，说明安装成功。npm 是 Node.js 的包管理器。）

    2. 安装 Git
    下载： 访问 Git 官方网站。

    安装： 下载 Windows 安装包，双击运行。在安装过程中，推荐选择默认设置即可。

    验证： 打开 命令提示符 或 PowerShell，输入以下命令验证：

    git --version
    

步骤二：创建和初始化 VitePress 项目
我们使用 pnpm 作为包管理器，因为它更高效。

    1. 安装 pnpm
    在命令提示符或 PowerShell 中执行：

    npm install -g pnpm
    
    2. 初始化项目文件夹
    选择一个目录来存放您的知识库项目：

    # 创建并进入项目文件夹
    mkdir aikb
    cd aikb

    # 初始化 Node.js 项目
    pnpm init
    
    3. 安装和初始化 VitePress
    安装 VitePress 作为一个开发依赖：

    pnpm add -D vitepress
    执行 VitePress 初始化脚本：

    pnpm vitepress init
    根据提示进行配置：

        where to create source files? (源代码目录)：输入 . (当前目录)。

        site title? (网站标题)：输入您的知识库名称，例如 我的知识库。

        generate with a custom theme? (使用自定义主题)：选择 No (使用默认主题)。

        install dependencies? (安装依赖)：选择 Yes。

    此时，项目文件夹内会生成一个 .vitepress 文件夹（包含配置文件）和 index.md 主页文件。
    
    4. 配置启动脚本
    打开项目根目录下的 package.json 文件，确认 scripts 部分如下，确保开发和构建命令正确：

        JSON
    ```
        "scripts": {
        "docs:dev": "vitepress dev",
        "docs:build": "vitepress build",
        "docs:preview": "vitepress preview"
        }
    ```

步骤三：撰写内容和本地预览
    1. 撰写内容
    在项目根目录或 .vitepress/ 目录外创建子文件夹，例如 notes。

    在 notes 文件夹下创建 Markdown 文件，例如 notes/python-basic.md。

    2. 配置导航（Sidebar） 文件类型可以配置，我这里使用默认推荐的TypeScript (ES Module)
    编辑 .vitepress/config.mts 文件，设置侧边栏导航：

    // .vitepress/config.mts

    import { defineConfig } from 'vitepress'

    // https://vitepress.dev/reference/site-config
    export default defineConfig({
    title: "myaikb",
    description: "A AI knowledge base",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
        { text: 'Home', link: '/' },
        { text: 'Examples', link: '/markdown-examples' }
        ],

        sidebar: [
        {
            text: 'Examples',
            items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' }
            ]
        }
        ],

        socialLinks: [
        { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
    })


    3. 本地预览，开发模式
    在命令提示符或 PowerShell 中运行：

    pnpm docs:dev
    VitePress 会启动本地服务器，您会看到网址地址的提示。在浏览器中访问该地址，即可实时查看和编辑您的知识库。

    4. 生产环境构建
    在命令提示符或 PowerShell 中运行：

    npm run docs:build
    执行项目的生产环境构建 (Production Build)，将您所有的 Markdown 源文件、配置和主题资源编译成可部署的静态网页文件。
    
    成功执行 npm run docs:build 后，它会在您的项目目录下创建一个特定的输出文件夹。在 VitePress 中，这个文件夹默认是 .vitepress/dist。

    这个 dist 文件夹内包含了网站运行所需的一切（如 index.html、assets 文件夹等），并且可以直接上传到任何 Web 服务器或托管服务（如 Vercel）。


步骤四：部署上线（免费托管）
使用 Git 将代码推送到 GitHub，并使用 Vercel 或 GitHub Pages 进行自动部署。

    1. 初始化 Git 仓库并提交
    在项目根目录执行以下 Git 命令：


    # 初始化本地 Git 仓库
    git init

    # 添加所有文件
    git add -A

    # 提交到本地仓库
    git commit -m "Initial commit for VitePress wiki"
    2. 创建 GitHub 远程仓库
    登录 GitHub，点击 New repository（新建仓库）。

    输入仓库名称（例如 my-personal-wiki），选择 Public，然后点击 Create repository。

    关联远程仓库： 复制 GitHub 页面上提供的远程仓库 URL（通常是 HTTPS 链接）。在命令行中执行：

    git remote add origin <你的 GitHub 仓库 URL>
    推送到 GitHub：

    git push -u origin main
    3. 使用 Vercel 免费部署 (推荐，最简单)
    登录 Vercel： 访问 Vercel 官网 并使用您的 GitHub 账号登录。

    创建新项目： 点击 Add New... > Project。

    导入 Git 仓库： 选择您刚才创建的 GitHub 仓库 (my-personal-wiki)。

    配置构建设置： Vercel 会自动识别这是一个 VitePress/Node.js 项目。您只需要确认配置：

    FRAMEWORK PRESET: Other (通常 Vercel 会识别为 Vite)

    BUILD COMMAND: npm run docs:build (或 pnpm docs:build)

    OUTPUT DIRECTORY: .vitepress/dist

    部署： 点击 Deploy。Vercel 会自动拉取代码、构建并部署。部署成功后，会为您提供一个公共 URL（例如 https://my-wiki-site-xxxx.vercel.app）。

常见注意点
- 输出目录必须设置为 docs/.vitepress/dist（如果 docs 为源目录）。
- 若使用自定义域，在 Vercel 仪表盘添加并按提示配置 DNS。


完成后：编辑 docs/ 下的 Markdown 文件，推送到 GitHub，Vercel 会自动 rebuild 并发布新版本。
