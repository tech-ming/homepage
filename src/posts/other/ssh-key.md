---
date: 2025-06-25
category:
  - ssh
  - git
tag:
  - ssh-key
  - authentication
  - security
---

# SSH Key 管理指南

## 📋 版本信息

- **Windows**: 11

## 安全原则

- 为每个平台/用途生成独立的 SSH key
- 使用统一的邮箱标识便于管理
- 定期轮换更新 SSH key
- 隐藏真实个人信息

### SSH Key 生成命令

#### GitHub SSH Key

```cmd
ssh-keygen -t ed25519 -C "<你的邮箱地址>" -f "<你的.ssh文件夹路径>\id_ed25519_github"
```

#### Gitee SSH Key

```cmd
ssh-keygen -t ed25519 -C "<你的邮箱地址>" -f "<你的.ssh文件夹路径>\id_ed25519_gitee"
```

**参数说明**：

- `-t`: 指定密钥类型，默认是 `rsa`，可以省略
- `-b`: 指定密钥的位数长度
- `-C`: 设置注释文字，比如邮箱地址
- `-f`: 指定密钥文件存储文件名

**重要说明**：

- `ssh-keygen` 使用**随机算法**生成密钥对，与邮箱地址无关
- `-C` 参数（邮箱地址）仅作为**注释标签**，便于识别和管理密钥
- 生成的公钥文件末尾会包含这个邮箱注释，如：`ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... dev.team@company.com`
- **密钥类型选择建议**：
  - **Ed25519**：推荐首选，提供更高的安全性和性能
  - **RSA**：当需要兼容旧系统时选择，建议密钥长度至少 4096 位
- **SSH 密钥对说明**：
  - 生成时会创建两个文件：私钥（无扩展名）和公钥（.pub 扩展名）
  - 私钥用于身份验证，必须保密
  - 公钥用于身份识别，可添加到各平台 SSH 设置中

### SSH 配置文件

**没有 SSH 配置文件时的问题**：

- SSH 客户端会尝试所有可用的密钥文件
- 可能导致认证失败或连接超时
- 增加连接时间，影响开发效率
- 无法精确控制不同平台使用不同的密钥

创建或编辑 `.ssh\config` 文件：

```
# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_ed25519_github

# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_ed25519_gitee
```

配置项说明：

- `Host`：主机别名，用于简化命令和区分不同平台（如 github.com、gitee.com）
- `HostName`：实际服务器域名，需与目标平台一致
- `User`：登录用户名，通常可省略（如 git@github.com 中的 git）
- `PreferredAuthentications`：认证方式，建议设为 `publickey` 以提升安全性和效率
- `IdentityFile`：私钥文件路径，需对应实际生成的密钥文件（如 `~/.ssh/id_ed25519_github`）

### 测试连接

```cmd
REM 测试GitHub连接
ssh -T git@github.com

REM 测试Gitee连接
ssh -T git@gitee.com
```

## 📚 参考资源
- [如何在同一电脑上生成配置多个ssh key 公钥 私钥](https://blog.csdn.net/qq_55558061/article/details/124117445)
