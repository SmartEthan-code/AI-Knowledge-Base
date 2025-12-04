# Git/GitHub 新手教程

## 1. 安装 Git

### Windows
- 访问 [git-scm.com](https://git-scm.com)
- 下载 Git for Windows
- 运行安装程序，使用默认设置即可

### macOS
```bash
# 使用 Homebrew
brew install git

# 或使用 Xcode Command Line Tools
xcode-select --install
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install git
```

## 2. 初始配置

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global core.editor "vim"  # 或其他编辑器
```

## 3. 基础概念

- **Repository**: 代码库
- **Commit**: 提交快照
- **Branch**: 分支
- **Push**: 推送到远程
- **Pull**: 从远程拉取

## 4. 常用命令

```bash
git init                    # 初始化仓库
git clone <url>            # 克隆仓库
git status                  # 查看状态
git add <file>             # 暂存文件
git commit -m "message"    # 提交更改
git push                    # 推送到远程
git pull                    # 拉取更新
git branch                  # 查看分支
git checkout -b <branch>   # 创建分支
```

## 5. GitHub 工作流

1. Fork 项目
2. Clone 到本地
3. 创建功能分支
4. 提交更改
5. Push 到 GitHub
6. 创建 Pull Request
