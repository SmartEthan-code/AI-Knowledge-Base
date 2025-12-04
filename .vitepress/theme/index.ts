// .vitepress/theme/index.ts

import DefaultTheme from 'vitepress/theme';
import KnowledgeMap from './components/KnowledgeMap.vue'; // 导入您的组件
//import './custom.css'; // 如果您有自定义CSS，也可以在这里导入

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件，让所有 Markdown 文件都能直接使用 <KnowledgeMap /> 标签
    app.component('KnowledgeMap', KnowledgeMap);
  },
};