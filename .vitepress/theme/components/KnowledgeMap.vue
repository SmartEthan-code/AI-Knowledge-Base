<template>
  <div ref="chartContainer" style="width: 100%; height: 600px;"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

// 定义知识图谱数据结构
const graphData = {
  // 节点（Nodes）列表，即您的知识点分类
  nodes: [
    { name: 'AI 知识库', symbolSize: 60, category: 0 },
    { name: '🧠机器学习核心', symbolSize: 30, category: 1 },
    { name: '💡深度学习', symbolSize: 30, category: 1 },
    { name: '🛠️开发与部署', symbolSize: 30, category: 1 },
    { name: '⚙️硬件设计', symbolSize: 30, category: 1 },
    { name: '📡Wi-Fi', symbolSize: 30, category: 1 },
    { name: '📶LTE/NR', symbolSize: 30, category: 1 },
    { name: '🌐语言学习', symbolSize: 30, category: 1 },
    
    // 子节点示例  
    { name: '基础算法', symbolSize: 15, category: 2 },
    { name: '模型评估', symbolSize: 15, category: 2 },
    { name: 'Transformer', symbolSize: 15, category: 2 },
    { name: 'Pytoch', symbolSize: 15, category: 2 },
    { name: 'CNN/CV', symbolSize: 15, category: 2 },
    { name: 'Python', symbolSize: 15, category: 2 },
    { name: 'Git/Github', symbolSize: 15, category: 2 },
    { name: 'Vercel', symbolSize: 15, category: 2 },
    { name: '硬件设计', symbolSize: 15, category: 2 },
    { name: '硬件测试', symbolSize: 15, category: 2 },
    { name: 'WiFi协议', symbolSize: 15, category: 2 },
    { name: 'WiFi开发', symbolSize: 15, category: 2 },
    { name: 'WiFi测试', symbolSize: 15, category: 2 },
    { name: 'LTE协议', symbolSize: 15, category: 2 },
    { name: 'NR协议', symbolSize: 15, category: 2 },
    { name: 'LTE开发', symbolSize: 15, category: 2 },
    { name: 'NR开发', symbolSize: 15, category: 2 },
    { name: 'LTE测试', symbolSize: 15, category: 2 },
    { name: 'NR测试', symbolSize: 15, category: 2 },
    { name: '英语学习', symbolSize: 15, category: 2 },
    { name: '日语学习', symbolSize: 15, category: 2 },
    { name: '法语学习', symbolSize: 15, category: 2 },
  ],
  // 关系（Links）列表，连接父子节点
  links: [
    { source: 'AI 知识库', target: '🧠机器学习核心' },
    { source: 'AI 知识库', target: '💡深度学习' },
    { source: 'AI 知识库', target: '🛠️开发与部署' },
    { source: 'AI 知识库', target: '⚙️硬件设计' },
    { source: 'AI 知识库', target: '📡Wi-Fi' },
    { source: 'AI 知识库', target: '📶LTE/NR' },
    { source: 'AI 知识库', target: '🌐语言学习' },
    { source: '🧠机器学习核心', target: '基础算法' },
    { source: '🧠机器学习核心', target: '模型评估' },
    { source: '💡深度学习', target: 'Transformer' },
    { source: '💡深度学习', target: 'Pytoch' },
    { source: '💡深度学习', target: 'CNN/CV' },
    { source: '🛠️开发与部署', target: 'Python' },
    { source: '🛠️开发与部署', target: 'Git/Github' },
    { source: '🛠️开发与部署', target: 'Vercel' },
    { source: '⚙️硬件设计', target: '硬件设计' },
    { source: '⚙️硬件设计', target: '硬件测试' },
    { source: '📡Wi-Fi', target: 'WiFi协议' },
    { source: '📡Wi-Fi', target: 'WiFi开发' },
    { source: '📡Wi-Fi', target: 'WiFi测试' },
    { source: '📶LTE/NR', target: 'LTE协议' },
    { source: '📶LTE/NR', target: 'NR协议' },
    { source: '📶LTE/NR', target: 'LTE开发' },
    { source: '📶LTE/NR', target: 'NR开发' },
    { source: '📶LTE/NR', target: 'LTE测试' },
    { source: '📶LTE/NR', target: 'NR测试' },
    { source: '🌐语言学习', target: '英语学习' },
    { source: '🌐语言学习', target: '日语学习' },
    { source: '🌐语言学习', target: '法语学习' }
  ],
  // 分类（Categories）
  categories: [
    { name: '根目录' },
    { name: '主要领域' },
    { name: '知识点' }
  ]
};

const chartContainer = ref(null);

onMounted(() => {
  if (chartContainer.value) {
    const myChart = echarts.init(chartContainer.value);
    
    // ECharts 配置项
    const option = {
      // 启用拖拽和缩放
      series: [
        {
          type: 'graph',
          layout: 'force', // 使用力导向布局，自动排布节点并支持拖拽
          data: graphData.nodes,
          links: graphData.links,
          categories: graphData.categories,
          roam: true, // 启用鼠标缩放平移
          draggable: true, // 启用节点拖拽
          force: {
            // 力导向图的参数，控制布局紧凑度
            repulsion: 1000,
            edgeLength: [50, 100],
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{b}' // 显示节点名称
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          },
          emphasis: {
            focus: 'adjacency'
          },
        }
      ]
    };

    myChart.setOption(option);
    
    // 响应窗口大小变化
    window.addEventListener('resize', () => myChart.resize());
  }
});
</script>