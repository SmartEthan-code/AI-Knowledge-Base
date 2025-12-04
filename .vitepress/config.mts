import { defineConfig } from 'vitepress';

// 侧边栏配置函数，为了简洁，我们定义一个可复用的结构
const sidebar = [
  {
    text: '🚀 知识库导览',
    items: [
      { text: '简介与使用指南', link: '/guide/introduction' },
      { text: '知识地图', link: '/guide/knowledge-map' }
    ]
  },
  {
    text: '🧠 机器学习核心',
    items: [
      { text: '基础算法 (LR, DT, RF)', link: '/ml/basic-algos' },
      { text: '模型评估与优化', link: '/ml/evaluation' }
    ],
    collapsible: true
  },
  {
    text: '💡 深度学习 (DL)',
    items: [
      { text: 'Transformer 架构', link: '/dl/transformer' },
      { text: 'PyTorch 笔记', link: '/dl/pytorch-notes' },
      { text: 'CNN 与 CV 应用', link: '/dl/cnn-cv' }
    ],
    collapsible: true
  },
  {
    text: '🛠️ 开发与部署',
    items: [
      { text: 'Python 环境配置', link: '/dev/python-setup' },
      { text: 'Git & GitHub 高级', link: '/dev/git-advanced' },
      { text: 'Vercel 部署流程', link: '/dev/vercel-flow' }
    ],
    collapsible: true
  },
  {
    text: '⚙️ 硬件设计与测试',
    items: [
      { text: '硬件架构设计', link: '/hardware/architecture' },
      { text: '硬件测试方法', link: '/hardware/testing' }
    ],
    collapsible: true
  },
  {
    text: '📡 WiFi 开发与测试',
    items: [
      { text: 'WiFi 协议基础', link: '/wifi/protocol' },
      { text: 'WiFi 开发指南', link: '/wifi/development' },
      { text: 'WiFi 测试与调试', link: '/wifi/testing' }
    ],
    collapsible: true
  },
  {
    text: '📶 LTE/NR 开发与测试',
    items: [
      { text: 'LTE 协议基础', link: '/cellular/lte-protocol' },
      { text: '5G NR 基础', link: '/cellular/nr-protocol' },
      { text: '开发与集成', link: '/cellular/development' },
      { text: '测试与验证', link: '/cellular/testing' }
    ],
    collapsible: true
  }
];

// 导出 VitePress 配置
export default defineConfig({
  // ===================================
  // 基础配置
  // ===================================
  title: "我的 AI 知识库 (AIKB)", // 网站标题
  description: "个人学习、研究与项目文档的结构化存储。", // 网站描述 (用于 SEO)
  lang: 'zh-CN', // 语言设置

  // 注意：修复 Vercel 纯文本问题，确保是 '/'
  base: '/', 

  // 修复死链接问题
  ignoreDeadLinks: ['http://localhost:5173'], 

  // ===================================
  // 主题配置
  // ===================================
  themeConfig: {
    // 导航栏 (顶部链接)
    nav: [
      { text: '主页', link: '/' },
      { text: '📚 知识笔记', link: '/notes/' },
      { text: '🔗 外部链接', link: 'https://github.com/SmartEthan-code/AI-Knowledge-Base' }
    ],

    // 侧边栏
    sidebar: sidebar, // 引用上面定义的侧边栏结构

    // 搜索 (默认支持本地搜索，如果您需要 Algolia 搜索，需要额外配置)
    search: {
      provider: 'local'
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/SmartEthan-code/AI-Knowledge-Base' }
    ],

    // 页面底部配置
    footer: {
      message: '内容基于 MIT 许可协议发布。',
      copyright: 'Copyright © 2025-Present SmartEthan'
    }
  }
});

// *别忘了在您的项目根目录和各个分类文件夹中创建对应的 Markdown 文件，
// 例如 /notes/introduction.md, /ml/basic-algos.md 等。