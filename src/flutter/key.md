---
icon:
date: 2025-06-25
category:
  - flutter
tag: java
---

# Flutter 配置 Android JKS 签名文件

## 参考链接

1. [Flutter中生成Android的jks签名文件并使用_mob64ca12e2ba6f的技术博客_51CTO博客](https://blog.51cto.com/u_16213374/12314149)
2. [Flutter配置签名打包全流程填坑笔记 - tesus - 博客园](https://www.cnblogs.com/DBCooper/p/11145451.html)

## 常见问题与解决方案

### 1. CMD 中运行 `java -version` 无反应

**原因**：某些 Oracle 产品会修改 Path 环境变量（如 `C:\Program Files\Common Files\Oracle\Java\javapath`），导致 Java 命令不可用。

**解决方案**：
- 移除该变量，或
- 将 `%JAVA_HOME%/bin` 路径移动到该变量之前。

建议优先检查环境变量顺序，确保 `JAVA_HOME` 配置正确。 