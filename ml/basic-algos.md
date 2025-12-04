# 机器学习核心基础算法学习指南

简明覆盖常见监督学习基础算法：逻辑回归（LR）、决策树（DT）、随机森林（RF）。包含直观理解、数学要点、Scikit-learn 快速示例、重要超参数、优缺点与实践建议。

---

## 目录
- 共同准备（特征工程与评估）
- 逻辑回归（Logistic Regression, LR）
- 决策树（Decision Tree, DT）
- 随机森林（Random Forest, RF）
- 实践建议与常见陷阱
- 推荐学习资源

---

## 共同准备
- 数据分割：train / val / test 或交叉验证（k-fold）。
- 特征处理：
    - 连续值：标准化（StandardScaler）或归一化（MinMax）。
    - 类别值：独热编码（one-hot）或有序编码。
    - 缺失值处理：插补或删除。
- 评价指标：
    - 二分类：准确率、精确率、召回率、F1、ROC-AUC。
    - 多分类：accuracy、macro/micro F1。
- 基线模型：先用简单模型（如常数预测或LR）建立基线。

---

## 逻辑回归（LR）
### 直观
用于二分类（或多分类 via softmax），预测类概率，线性模型 + sigmoid/softmax。

### 数学要点
- 模型：p(y=1|x) = sigmoid(w^T x + b)
- 损失：对数似然（交叉熵），可加 L1 / L2 正则化（稀疏或收缩）。

### Scikit-learn 示例
```python
from sklearn.linear_model import LogisticRegression
clf = LogisticRegression(penalty='l2', C=1.0, solver='lbfgs', max_iter=1000)
clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)
```

### 重要超参数
- penalty: 'l2' / 'l1' / 'elasticnet' / 'none'
- C: 正则化强度的倒数（越小正则化越强）
- solver: 求解器（'liblinear','lbfgs','saga' 等）
- class_weight: 处理类别不平衡

### 优缺点与建议
- 优点：简单、可解释、速度快、概率输出。
- 缺点：对线性决策边界；对特征交互不敏感（可手动构造交互项）。
- 建议：做基线模型；合理正则化；对特征标准化。

---

## 决策树（DT）
### 直观
基于特征阈值做递归分裂，生成可解释的树结构，适用于分类与回归。

### 数学要点
- 分裂准则：信息增益、信息增益率、GINI、方差减少。
- 剪枝：限制深度、叶节点最小样本数、最小分裂增益等防过拟合。

### Scikit-learn 示例
```python
from sklearn.tree import DecisionTreeClassifier
clf = DecisionTreeClassifier(criterion='gini', max_depth=6, min_samples_leaf=5)
clf.fit(X_train, y_train)
```

### 重要超参数
- max_depth、min_samples_split、min_samples_leaf
- criterion: 'gini' 或 'entropy'
- max_features: 控制每次分裂考虑特征数

### 优缺点与建议
- 优点：直观可解释、能处理非线性与类别特征、不需要特征缩放。
- 缺点：易过拟合、对噪声敏感、单棵树稳定性差。
- 建议：限制树复杂度；可视化树以理解决策路径。

---

## 随机森林（RF）
### 直观
基于多棵随机化的决策树集成（bagging + 随机特征子集），通过投票或平均提高泛化能力。

### 数学要点
- Bagging：对样本进行有放回抽样，训练多棵树。
- 随机子特征：每棵树分裂时随机选择特征子集，降低相关性。
- 集成：分类投票、回归取平均。

### Scikit-learn 示例
```python
from sklearn.ensemble import RandomForestClassifier
clf = RandomForestClassifier(n_estimators=100, max_depth=None, max_features='sqrt', n_jobs=-1)
clf.fit(X_train, y_train)
```

### 重要超参数
- n_estimators：树的数量
- max_features：每次分裂考虑的特征数（'sqrt'/'log2'/int）
- max_depth、min_samples_leaf 等控制单棵树复杂度
- n_jobs：并行训练

### 优缺点与建议
- 优点：稳健、泛化好、对缺失与异常不太敏感、可估算特征重要性。
- 缺点：模型较大，不易解释；在高维稀疏数据（如文本）上不一定优于线性模型。
- 建议：先用 RF 作为强基线；调 n_estimators 到稳定；用 OOB （out-of-bag）估计监控。

---

## 实践建议与常见陷阱
- 特征重要性要结合业务理解，不盲目删特征。
- 类别不平衡：使用 class_weight、重采样、阈值调整或专门指标（ROC-AUC、PR）。
- 过拟合检测：使用验证集或交叉验证，观察训练/验证差距。
- 可解释性：LR 系数、DT 路径、RF 的特征重要性、SHAP/LIME 提供更细粒度解释。
- 超参数搜索：GridSearchCV / RandomizedSearchCV / Bayesian Optimization。

---

## 推荐学习资源
- 书籍：Pattern Recognition and Machine Learning（Bishop），Hands-On Machine Learning（Aurélien Géron）
- 文档：scikit-learn 官方教程与 API 文档
- 课程：Andrew Ng 的机器学习课程（基础概念）

--- 

快速上手：先做数据探索 -> 预处理 -> 简单基线（LR/DT）-> 集成模型（RF）-> 调参与解释。