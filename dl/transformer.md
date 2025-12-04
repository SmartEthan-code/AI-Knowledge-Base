
# Transformer Architecture Learning Guide / Transformer 架构学习指南

## Overview / 概述
Transformer is a deep learning architecture based on self-attention mechanisms, revolutionizing NLP and computer vision tasks.

Transformer 是一种基于自注意力机制的深度学习架构，革新了自然语言处理和计算机视觉任务。

## Core Components / 核心组件

### 1. Self-Attention / 自注意力
- Computes relationships between all positions in a sequence / 计算序列中所有位置之间的关系
- Query, Key, Value projection matrices / 查询、键、值投影矩阵
- Parallel processing advantage over RNNs / 相比 RNN 的并行处理优势

### 2. Multi-Head Attention / 多头注意力
- Multiple attention heads for diverse feature representations / 多个注意力头用于多样化特征表示
- Concatenate and project outputs / 连接和投影输出
- Typical: 8 or 16 heads / 通常：8 或 16 个头

### 3. Feed-Forward Network / 前馈网络
- Position-wise fully connected layers / 位置级全连接层
- ReLU or GELU activation / ReLU 或 GELU 激活函数
- Expansion then compression / 扩展后压缩

### 4. Layer Normalization / 层归一化
- Stabilizes training / 稳定训练
- Pre-norm vs post-norm / 应用于子层前后（前归一化 vs 后归一化）

### 5. Positional Encoding / 位置编码
- Sine/cosine embeddings for sequence position / 正弦/余弦嵌入表示序列位置
- Alternatively: learned embeddings / 或：可学习嵌入

## Architecture Variants / 架构变体

| Component / 组件 | Encoder / 编码器 | Decoder / 解码器 |
|---|---|---|
| Input / 输入 | Sequence / 序列 | Sequence + Context / 序列+上下文 |
| Attention / 注意力 | Self-attention / 自注意力 | Masked + Cross-attention / 掩蔽+交叉注意力 |
| Output / 输出 | Encoded representation / 编码表示 | Predictions / 预测 |

## Training Tips / 训练技巧
- Use learning rate warmup / 使用学习率预热
- Apply dropout for regularization / 应用 dropout 进行正则化
- Batch or layer normalization / 批量归一化或层归一化
- Gradient clipping for stability / 梯度裁剪以保持稳定性

## Resources / 资源
- Original paper: "Attention is All You Need" (Vaswani et al., 2017)
- Popular implementations: PyTorch, TensorFlow

