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
### 步骤一：准备本地环境

快速安装与检查步骤（Windows 下推荐使用 PowerShell 或 CMD；也可用 WSL）。
#### 1. 安装 Node.js
- 下载：访问 https://nodejs.org/ ，选择 LTS（长期支持）版本的 Windows 安装包并运行安装程序。
- 安装时可保留默认选项，安装完成后重启终端（若需要）。
- 验证安装（在 CMD 或 PowerShell 中运行）：
```
node -v
npm -v
```
若显示版本号表示安装成功。

#### 2. 安装 Git
- 下载：访问 https://git-scm.com/ 下载适用于 Windows 的安装包并运行安装程序。
- 安装时可使用默认设置（或根据喜好调整换行符/命令行集成等选项）。
- 验证安装（在 CMD 或 PowerShell 中运行）：
```
git --version
```
若显示版本号表示安装成功。

提示：如果命令未被识别，请确认安装时已将 Node.js / Git 添加到系统 PATH，并重启终端窗口。

---

### 步骤二：创建并初始化 VitePress 项目

1. 新建项目目录并进入：
```
mkdir aikb
cd aikb
```

2. 初始化 Node 项目（任选 npm 或 pnpm）：
```
pnpm init -y
```
或
```
npm init -y
```

3. 安装 VitePress（开发依赖）：
```
pnpm add -D vitepress
```
或
```
npm install -D vitepress
```

4. 创建站点源文件结构（最简单方式）：
- 在项目根创建 docs/ 或直接以当前目录为源，添加主页文件，如 index.md 或 README.md。
- 建议创建 .vitepress 文件夹用于配置与主题文件。

5. 在 package.json 添加便捷脚本（示例）：
```json
"scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "preview": "vitepress preview"
}
```

---

### 步骤三：编写内容与本地预览

1. 内容组织
- 在 docs/ 或项目根目录下按主题新建子目录（如 notes/、guide/ 等），每个 Markdown 文件即为一个页面。

2. 配置站点（示例使用 ES 模块配置）
- 在 .vitepress 中创建 config.mts（或 config.js）并导出站点配置，设置标题、导航与侧边栏项。示例结构：
```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
    title: '我的知识库',
    description: '在 Windows 上用 VitePress 搭建的个人文档站',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '示例', link: '/markdown-examples' }
        ],
        sidebar: [
            {
                text: '指南',
                items: [
                    { text: '快速开始', link: '/quick-start' },
                    { text: '配置', link: '/config' }
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/yourname/yourrepo' }
        ]
    }
})
```

3. 启动开发服务器（实时预览）
```
pnpm run dev
```
或
```
npm run dev
```
访问终端给出的本地地址，编辑 Markdown 文件后浏览器会自动刷新。

4. 生产构建
```
pnpm run build
```
构建输出目录通常是 .vitepress/dist（或根据配置调整）。

---

### 步骤四：发布到 GitHub 并用 Vercel 自动部署

1. 本地 Git 提交
```
git init
git add .
git commit -m "Initial: add VitePress site"
```

2. 在 GitHub 创建远程仓库并关联（以 HTTPS 或 SSH）
```
git remote add origin <仓库地址>
git push -u origin main
```
如远程分支是 master 或其他名称，请相应替换。

3. 在 Vercel 上部署
- 登录 Vercel 并导入刚创建的 GitHub 仓库。
- 构建配置建议：
    - Build Command: npm run build 或 pnpm run build
    - Output Directory: .vitepress/dist
- 点击 Deploy，Vercel 会自动构建并提供公开访问链接。每次向仓库推送新提交时，Vercel 会触发自动重建与部署。

可选：若使用 GitHub Actions 或其他 CI/CD，也可以将 .vitepress/dist 上传到静态主机。

---

### 常见问题与解决办法

- 构建后看不到更新：确认 Vercel 的构建命令与输出目录配置正确，且触发了新部署（查看 Vercel 仪表盘的构建日志）。
- 依赖安装失败：检查网络或代理设置，必要时使用国内镜像或设置 pnpm registry。
- 文件路径问题：确保侧边栏/导航中的链接与实际 Markdown 文件路径一致（不带扩展名的相对路径）。
- 静态资源未加载：检查构建输出中 assets 路径是否正确，若使用自定义 base，需要在 config 中设置 base。

---

### 可选：通过 SSH（443 端口）访问 GitHub（适用于被 22 端口阻断的网络）

1. 在本地生成 SSH 密钥（以 ed25519 为例）：
```
ssh-keygen -t ed25519 -C "your_email@example.com"
```
按提示保存（默认路径通常在 C:\Users\YourUser\.ssh\）。

2. 将公钥（如 id_ed25519.pub）内容复制到 GitHub 的 Settings → SSH and GPG keys。

3. 在 ~/.ssh/config（Windows 上为 C:\Users\YourUser\.ssh\config）添加以下配置，强制使用 443 端口连接 github.com：
```
Host github.com
    Hostname ssh.github.com
    Port 443
    User git
```

4. 测试连接：
```
ssh -T git@github.com
```
若返回欢迎信息说明配置成功。然后可以把远程地址换成 SSH 地址并 push：
```
git remote set-url origin git@github.com:username/repo.git
git push -u origin main
```

---

完成后：继续在 docs/（或你的源目录）中添加/修改 Markdown 页面，提交到仓库，Vercel 会自动重新构建并发布最新站点版本。

