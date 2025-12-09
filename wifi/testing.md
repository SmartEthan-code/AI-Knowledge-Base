# WiFi 调试与测试指南

简短、结构化的 WiFi 排查与测试流程，覆盖物理层到应用层的常见问题、命令与判读要点。

## 目的
- 验证连通性、吞吐、延迟、丢包、稳定性与安全性。
- 快速定位问题（信号/干扰、配置、驱动、认证、链路、中上层性能）。

## 测试前准备
- 设备：测试客户端（笔记本/手机）、AP、以太网后台服务器（用于 iperf）、频谱分析仪（可选）。
- 工具：ping, traceroute, iperf3, tcpdump/tshark, Wireshark, iw/iwconfig/nmcli（Linux），netsh（Windows），Airport/airportctl（macOS），rfkill, lspci/lsusb, dmesg/journalctl。
- 环境记录：时间、位置、AP 型号与 SSID、频道、带宽（20/40/80/160MHz）、加密类型、固件/驱动版本。

## 快速检查（先做） 
- 确认客户端无线已启用（硬/软开关、rfkill）。
    - Linux: rfkill list; sudo rfkill unblock wifi
    - Windows: netsh wlan show interfaces
- 检查信号与速率
    - Linux: iw dev wlan0 link 或 iwconfig wlan0
    - macOS: /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I
    - Windows: netsh wlan show interfaces
- DHCP / IP
    - Linux: ip addr show wlan0; sudo dhclient -v wlan0
    - Windows: ipconfig /all; ipconfig /renew
- DNS 与路由
    - ping 网关、上游 DNS、互联网 IP（例如 8.8.8.8）

## 常用诊断命令（摘要）
- 连通性：
    - ping -c 10 <gateway|8.8.8.8>
    - traceroute <host> （Windows: tracert）
- 带宽/吞吐：
    - Server: iperf3 -s
    - Client: iperf3 -c <server-ip> -t 60 -P 4
- 抓包：
    - tcpdump -i wlan0 -w capture.pcap
    - sudo tshark -i wlan0 -f "port 80 or port 443" -w out.pcap
- 无线信息：
    - sudo iw dev wlan0 scan
    - sudo iwlist wlan0 scanning
- 驱动/内核日志：
    - dmesg | grep -i wlan
    - journalctl -u NetworkManager -e

## 信号与干扰检查
- 测量 RSSI/信噪比（SNR），RSSI 低或 SNR 小表示物理层问题。
- 频道冲突：
    - 检测邻近 AP（iwlist/airport/win：netsh wlan show networks mode=bssid）
    - 避免拥挤频道，选择 20MHz 在 2.4GHz；40/80/160 在 5GHz/6GHz 并考虑 DFS。
- 频谱分析（有工具时）：查找非 WiFi 源（微波、蓝牙、邻近设备）。

## 性能测试流程（建议顺序）
1. 有线基线：在同一台客户端连有线时对 server 做 iperf3，记录基线吞吐与 RTT。
2. 单客户端无线测试：
     - 静态点位：iperf3 TCP/UDP（-u）三次取中位。
     - 不同距离、不同角度、不同 AP 天线定向测试。
3. 并发客户端：多客户端并发 iperf3 -P 或多台客户端同时测试。
4. 大文件/应用层测试：HTTP/HTTPS 下载、视频流播放测试（记录缓冲、重连）。
5. 移动/漫游测试：在楼层/房间间漫游，记录切换时间与失包。

示例 iperf3：
- 服务器：iperf3 -s
- 客户：iperf3 -c 10.0.0.2 -t 30 -P 4

判读：
- TCP 值远低于有线基线 → 尝试降低 MCS、检查重传、看是否丢包/干扰。
- UDP：使用 -u 查看丢包率与抖动：iperf3 -c <ip> -u -b 100M

## 丢包与重传诊断
- 抓包查看 802.11 重传序列（Wireshark 过滤：wlan.fc.retry == 1）。
- 查看 TCP 重传（tcp.analysis.retransmission）。
- SIGNS:
    - 大量 802.11 重传 → 物理/干扰/距离问题。
    - TCP 重传但 802.11 重传少 → 中间网络问题或 ACK 丢失。

## 认证与关联问题
- wpa_supplicant 日志（Linux）：sudo journalctl -u wpa_supplicant -e 或查看 /var/log/syslog。
- Windows: Event Viewer -> Applications and Services Logs -> Microsoft -> Windows -> WLAN-AutoConfig。
- 常见错误：EAP 认证失败、PSK 错误、VLAN/AAA 配置错误。检查 RADIUS 日志。

## 安全扫描与配置检查
- 检查加密类型（WPA2/WPA3）、ESSID 隐藏、管理帧保护（802.11w）。
- 使用 Kali/aircrack 等工具仅限授权测试环境。

## 日志与抓包建议
- 抓取同时包含无线接口（monitor 模式）与 AP/服务器侧抓包（有线镜像），对比分析。
- 在 Wireshark 中启用 802.11 解码，使用 Radiotap 字段查看 RSSI、速率、PHY 信息。
- 抓包长度足够长以覆盖发生问题的时刻，并记录相应时间线与操作（操作日志）。

## 常见问题与应对
- 无法获取 IP：检查 DHCP 服务、AP DHCP 中继、客户端防火墙。
- 低速但信号好：检查频道、邻频干扰、AP 带宽限制、客户端功耗模式（省电）。
- 频繁掉线/重连：更新驱动、检查电源管理、查看 AP 负载、RADIUS 超时。
- 无线网速高却应用差：检查 DNS、TCP 窗口大小、上游链路瓶颈。

## 测试报告模板（简短）
- 测试时间/地点：
- 设备清单（AP/客户端/固件）：
- 测试用例（连通/带宽/漫游/并发）与步骤：
- 结果摘要（基线、有线 vs 无线、丢包率、平均吞吐、最大吞吐、延迟）：
- 复现步骤与抓包文件位置：
- 结论与建议（调频、调整 AP 功率、升级驱动/固件、配置优化）：

## 常用工具速查
- Linux: iw, iwconfig, ip, iperf3, tcpdump, tshark, nmcli, rfkill, dmesg, journalctl
- Windows: netsh wlan, ipconfig, ping, tracert, Wireshark, Performance Monitor
- macOS: airport, ifconfig, tcpdump, Wireshark
- 专业：Wireshark, iPerf3, NetSpot, Ekahau, AirMagnet, spectrum analyzers

结束语：按“从物理到应用、先复现再定位、并记录证据”的原则执行每项测试，能显著缩短定位时间并给出可实施的修复建议。