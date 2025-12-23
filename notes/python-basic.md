
# Python 学习记录

## 基础概念
- 变量和数据类型
- 运算符
- 控制流（if、for、while）
- 函数定义和调用

## 数据结构
- 列表（List）
- 元组（Tuple）
- 字典（Dictionary）
- 集合（Set）

## 面向对象编程
- 类和对象
- 继承
- 多态
- 封装

## 常用模块
- os - 系统操作
- sys - 系统参数
- json - 数据处理
- requests - HTTP 请求

## 实践项目
- [ ] 计算器程序
- [ ] 文件操作练习
- [ ] 数据处理脚本
- [ ] Web 爬虫

## 学习资源
- 官方文档：https://docs.python.org/3/
- 在线编译器：https://replit.com/

## 笔记
# BOM数量一致性检查
```python
import os
import sys

# 强制修正 Tcl/Tk 路径，指向 Python 3.13 的标准默认位置
if os.path.exists(r'C:\Python313\tcl'):
    os.environ['TCL_LIBRARY'] = r'C:\Python313\tcl\tcl8.6'
    os.environ['TK_LIBRARY'] = r'C:\Python313\tcl\tk8.6'

# 如果是打包后的环境，sys._MEIPASS 会指向临时目录，需要特殊处理
if hasattr(sys, '_MEIPASS'):
    tcl_path = os.path.join(sys._MEIPASS, 'tcl')
    if os.path.exists(tcl_path):
        os.environ['TCL_LIBRARY'] = os.path.join(tcl_path, 'tcl8.6')
        os.environ['TK_LIBRARY'] = os.path.join(tcl_path, 'tk8.6')

# -------------------------------

import tkinter as tk
from tkinter import filedialog, messagebox
import pandas as pd
import re

def parse_designators(raw_string):
    """
    解析位号字符串，支持逗号/空格/分号分隔，并自动展开连字符（如 C1-C3）
    """
    if pd.isna(raw_string) or str(raw_string).strip() == "":
        return []
    
    # 替换中文逗号或其他特殊符号，统一用空格分割
    text = str(raw_string).replace('，', ',').replace('；', ';')
    parts = re.split(r'[,\s;/]+', text.strip())
    full_list = []
    
    for part in parts:
        part = part.strip()
        if not part: continue
        
        if '-' in part:
            # 匹配 C1-C3 或 R101-105 这种形式
            # 模式：字母前缀 + 数字起始 - (可选字母前缀) + 数字结束
            match = re.match(r'([a-zA-Z]+)(\d+)-([a-zA-Z]*)(\d+)', part)
            if match:
                prefix, start, end_prefix, end = match.groups()
                current_prefix = end_prefix if end_prefix else prefix
                try:
                    for i in range(int(start), int(end) + 1):
                        full_list.append(f"{current_prefix}{i}")
                except:
                    full_list.append(part)
            else:
                full_list.append(part)
        else:
            full_list.append(part)
            
    return full_list

def select_file():
    """
    弹出文件选择对话框
    """
    root = tk.Tk()
    root.withdraw()  # 隐藏主窗口
    # 仅显示 Excel 文件
    file_path = filedialog.askopenfilename(
        title="请选择 BOM Excel 文件",
        filetypes=[("Excel files", "*.xlsx *.xls")]
    )
    return file_path

def check_bom_accuracy():
    # 1. 选择文件
    target_file = select_file()
    if not target_file:
        print("未选择任何文件，程序退出。")
        return

    # 2. 读取数据
    try:
        print(f"正在读取文件: {os.path.basename(target_file)} ...")
        df = pd.read_excel(target_file)
    except Exception as e:
        messagebox.showerror("错误", f"读取文件失败: {e}")
        return

    # 3. 配置列名
    COL_QTY = 'QTY'
    COL_REF = 'Cir.Ref.Num'
    
    if COL_QTY not in df.columns or COL_REF not in df.columns:
        error_msg = f"Excel 中找不到列名 '{COL_QTY}' 或 '{COL_REF}'\n当前列名为: {list(df.columns)}"
        messagebox.showerror("列名错误", error_msg)
        return

    results = []
    
    # 4. 遍历检查
    for index, row in df.iterrows():
        try:
            expected_qty = int(row[COL_QTY]) if not pd.isna(row[COL_QTY]) else 0
        except:
            expected_qty = 0
            
        ref_text = row[COL_REF]
        designator_list = parse_designators(ref_text)
        actual_count = len(designator_list)
        
        # 检查重复
        seen = {}
        duplicates = []
        for d in designator_list:
            seen[d] = seen.get(d, 0) + 1
            if seen[d] == 2:
                duplicates.append(d)
        
        is_match = (expected_qty == actual_count)
        has_dup = len(duplicates) > 0
        
        if not is_match or has_dup:
            results.append({
                'Excel行号': index + 2,
                'QTY': expected_qty,
                '实际位号数': actual_count,
                '数量状态': '✅' if is_match else f'❌ 差额:{actual_count - expected_qty}',
                '重复项': '✅ 无' if not has_dup else f'❌ {",".join(duplicates)}',
                '原始位号内容': ref_text
            })

    # 5. 反馈结果
    if not results:
        messagebox.showinfo("检查完毕", "🎉 恭喜！所有行均匹配且无重复位号。")
    else:
        report_df = pd.DataFrame(results)
        print("\n" + "!"*10 + f" 发现 {len(results)} 处异常 " + "!"*10)
        print(report_df.to_string(index=False))
        
        # 保存结果
        output_path = os.path.join(os.path.dirname(target_file), "BOM数量一致性检查报告.xlsx")
        report_df.to_excel(output_path, index=False)
        messagebox.showwarning("发现异常", f"检测到 {len(results)} 处不匹配或重复。\n详细报告已保存至同目录下的：\nBOM_错误报告.xlsx")

if __name__ == "__main__":
    check_bom_accuracy()
