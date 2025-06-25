---
icon:
date: 2025-06-23
category:
  - flutter
tag:
---

# Flutter 在 Windows 中打包 iOS 安装包并安装

## 前言

站主电脑是 Windows，想打包 iOS 包无从下手，最终选用免费的虚拟机方案。

## 参考链接

1. [Flutter iOS 打包教程](https://juejin.cn/post/7304607652016996378#heading-0)
2. [macOS 在 AMD Ryzen/Intel VMware 安装指南](https://forum.amd-osx.com/threads/mac-os-install-on-amd-ryzen-intel-vmware-opencore-improved-performance-works-with-sequoia-sonoma-etc.4696/)
3. [DeepSeek AI 助手](https://chat.deepseek.com/)

## 经验总结

### 1. 系统差异
macOS 操作逻辑与 Windows 差异较大，遇到问题及时咨询 AI，节省时间。

### 2. 下载优化
下载链接优先选择 TB 链接，速度更快。

### 3. 网络配置
虚拟机网络无法连接时，在参考链接 1、2 中尝试无效的情况下，虚拟机设置中选择 **NAT 模式**。

### 4. 虚拟机选择
推荐使用 **VMware Workstation Pro**，避免使用 Oracle VirtualBox，因为后者对 macOS 支持不够完善。 