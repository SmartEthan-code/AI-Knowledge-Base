# PyTorch 学习指南

## 1. 基础概念

### 张量（Tensor）
```python
import torch

# 创建张量
x = torch.tensor([1, 2, 3])
y = torch.zeros(3, 4)
z = torch.randn(2, 3)
```

### 自动求导（Autograd）
```python
x = torch.tensor([2.0], requires_grad=True)
y = x ** 2
y.backward()
print(x.grad)  # 梯度
```

## 2. 神经网络基础

### 构建模型
```python
import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 5)
        self.fc2 = nn.Linear(5, 1)
    
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        return self.fc2(x)
```

## 3. 训练流程

- 准备数据
- 构建模型
- 定义损失函数和优化器
- 迭代训练（前向传播→计算损失→反向传播→更新参数）

## 4. 常用模块

| 模块 | 用途 |
|------|------|
| `nn.Linear` | 全连接层 |
| `nn.Conv2d` | 卷积层 |
| `nn.LSTM` | 循环神经网络 |
| `nn.Transformer` | Transformer |

## 5. 数据处理

```python
from torch.utils.data import DataLoader, TensorDataset

dataset = TensorDataset(X, y)
loader = DataLoader(dataset, batch_size=32, shuffle=True)
```
