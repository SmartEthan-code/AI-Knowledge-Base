# WiFi 调试与测试指南

简短、结构化的 WiFi 排查与测试流程，覆盖物理层到应用层的常见问题、命令与判读要点。

## 目的
- 验证网络连通性、吞吐量、延迟、丢包率、稳定性和安全性。
- 快速定位问题来源，包括信号干扰、配置错误、驱动问题、认证失败及链路性能。

## 测试前准备
- **设备**：测试客户端（笔记本/手机）、接入点（AP）、以太网服务器（用于 iperf）、频谱分析仪（可选）。
- **工具**：ping, traceroute, iperf3, tcpdump/tshark, Wireshark, iw/iwconfig/nmcli（Linux），netsh（Windows），Airport/airportctl（macOS），rfkill, lspci/lsusb, dmesg/journalctl。
- **环境记录**：记录测试时间、地点、AP 型号与 SSID、频道、带宽、加密类型及固件版本。

## 快速检查（先做） 
- 确认客户端无线功能已启用。
    - Linux: `rfkill list; sudo rfkill unblock wifi`
    - Windows: `netsh wlan show interfaces`
- 检查信号强度与速率。
    - Linux: `iw dev wlan0 link` 或 `iwconfig wlan0`
    - macOS: `/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I`
    - Windows: `netsh wlan show interfaces`
- 检查 DHCP 和 IP 配置。
    - Linux: `ip addr show wlan0; sudo dhclient -v wlan0`
    - Windows: `ipconfig /all; ipconfig /renew`
- 测试 DNS 和路由连通性。
    - 使用 ping 命令测试网关和 DNS。

## 常用诊断命令（摘要）
- **连通性测试**：
    - `ping -c 10 <gateway|8.8.8.8>`
    - `traceroute <host>` （Windows: `tracert`）
- **带宽测试**：
    - 服务器端：`iperf3 -s`
    - 客户端：`iperf3 -c <server-ip> -t 60 -P 4`
- **抓包**：
    - `tcpdump -i wlan0 -w capture.pcap`
    - `sudo tshark -i wlan0 -f "port 80 or port 443" -w out.pcap`
- **无线信息**：
    - `sudo iw dev wlan0 scan`
    - `sudo iwlist wlan0 scanning`
- **驱动/内核日志**：
    - `dmesg | grep -i wlan`
    - `journalctl -u NetworkManager -e`

## 性能测试流程（建议顺序）
1. **有线基线测试**：在同一客户端上进行有线连接的 iperf3 测试，记录基线数据。
2. **单客户端无线测试**：在不同位置和角度进行无线测试。
3. **并发客户端测试**：多客户端同时进行 iperf3 测试。
4. **大文件/应用层测试**：进行 HTTP/HTTPS 下载和视频流测试。
5. **移动/漫游测试**：在不同房间间移动，记录切换时间和丢包情况。

## 丢包与重传诊断
- 抓包查看 802.11 重传序列（Wireshark 过滤：wlan.fc.retry == 1）。
- 查看 TCP 重传（tcp.analysis.retransmission）。
- SIGNS:
    - 大量 802.11 重传 → 物理/干扰/距离问题。
    - TCP 重传但 802.11 重传少 → 中间网络问题或 ACK 丢失。

## 认证与关联问题
- wpa_supplicant 日志（Linux）：`sudo journalctl -u wpa_supplicant -e` 或查看 `/var/log/syslog`。
- Windows: Event Viewer -> Applications and Services Logs -> Microsoft -> Windows -> WLAN-AutoConfig。
- 常见错误：EAP 认证失败、PSK 错误、VLAN/AAA 配置错误。检查 RADIUS 日志。

## 安全扫描与配置检查
- 检查加密类型（WPA2/WPA3）、ESSID 隐藏、管理帧保护（802.11w）。
- 使用 Kali/aircrack 等工具仅限授权测试环境。

## 常见问题与解决方案
- **无法获取 IP**：检查 DHCP 服务和客户端防火墙设置。
- **信号强但速度慢**：检查频道和邻频干扰。
- **频繁掉线**：更新驱动，检查电源管理设置。
- **无线速度高但应用性能差**：检查 DNS 配置和网络瓶颈。

## 测试报告模板（简短）
- **测试时间/地点**：
- **设备清单**：
- **测试用例与步骤**：
- **结果摘要**：
- **复现步骤与抓包文件位置**：
- **结论与建议**：

## 常用工具速查
- **Linux**: iw, iwconfig, ip, iperf3, tcpdump, nmcli
- **Windows**: netsh wlan, ipconfig, ping
- **macOS**: airport, ifconfig, tcpdump

结束语：遵循“从物理到应用、先复现再定位”的原则，能有效缩短问题定位时间并提供可行的解决方案。
