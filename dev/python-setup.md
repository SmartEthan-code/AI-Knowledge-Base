
# Python 环境部署指南

## Windows

### 下载安装
1. 访问 [python.org](https://www.python.org/downloads/)
2. 下载 Windows installer
3. 运行安装程序
4. **重要**：勾选 "Add Python to PATH"
5. 选择 "Install Now" 或自定义安装

### 验证安装
```bash
python --version
pip --version
```

### 配置虚拟环境
```bash
python -m venv venv
venv\Scripts\activate
```

## macOS

### 使用 Homebrew（推荐）
```bash
brew install python@3.11
```

### 验证安装
```bash
python3 --version
pip3 --version
```

### 配置虚拟环境
```bash
python3 -m venv venv
source venv/bin/activate
```

## Linux (Ubuntu/Debian)

### 安装依赖
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

### 验证安装
```bash
python3 --version
pip3 --version
```

### 配置虚拟环境
```bash
python3 -m venv venv
source venv/bin/activate
```

## 通用步骤

### 升级 pip
```bash
pip install --upgrade pip
```

### 安装项目依赖
```bash
pip install -r requirements.txt
```

### 停用虚拟环境
```bash
deactivate
```
