# Markdown Developer Guide

## Introduction
This guide covers best practices for writing and maintaining Markdown files in development projects.

## File Structure
- Use `.md` extension for all Markdown files
- Keep files organized in logical directories
- Include a `README.md` in each project directory

## Formatting Standards

### Headings
```markdown
# H1 - Main Title
## H2 - Section
### H3 - Subsection
```

### Code Blocks
Use fenced code blocks with language specification:
```markdown
\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`
```

### Lists
- Use hyphens for unordered lists
- Use numbers for ordered lists
- Indent nested items with 2-4 spaces

### Links and Images
```markdown
[Link text](url)
![Alt text](image-path)
```

## Best Practices
- Keep lines under 100 characters for readability
- Use consistent spacing between sections
- Add table of contents for long documents
- Include code examples where applicable
- Proofread before committing

## Version Control
Treat Markdown files like source code in Git repositories.
Use meaningful commit messages for documentation changes.
Review changes before merging to main branches.

---

# Markdown 开发指南

## 介绍
本指南涵盖了在开发项目中编写和维护 Markdown 文件的最佳实践。

## 文件结构
- 所有 Markdown 文件使用 `.md` 扩展名
- 将文件组织在逻辑目录中
- 在每个项目目录中包含 `README.md`

## 格式标准

### 标题
```markdown
# H1 - 主标题
## H2 - 章节
### H3 - 小节
```

### 代码块
使用带有语言规范的栅栏式代码块：
```markdown
\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`
```

### 列表
- 无序列表使用连字符
- 有序列表使用数字
- 嵌套项缩进 2-4 个空格

### 链接和图像
```markdown
[链接文本](url)
![替代文本](image-path)
```

## 最佳实践
- 保持行长度在 100 个字符以内，便于阅读
- 在章节之间使用一致的间距
- 为长文档添加目录
- 包含适用的代码示例
- 提交前校对

## 版本控制
在 Git 存储库中像对待源代码一样对待 Markdown 文件。
为文档更改使用有意义的提交消息。
在合并到主分支之前查看更改。