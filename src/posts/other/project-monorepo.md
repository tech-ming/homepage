---
date: 2025-06-29
category: 
 - 工程化
tag:
 - monorepo
 - pnpm
 - 项目管理
---

# Monorepo项目管理实践

## 什么是Monorepo

Monorepo是一种项目管理策略，使用单一代码仓库来管理多个packages，便于复用组件、工具函数、类型声明和样式，同时保持各模块的独立性。

## 主要优势

- **代码共享**：更容易共享和复用代码
- **依赖管理**：统一管理所有项目的依赖，避免版本冲突
- **原子提交**：可以在一次提交中更新多个相关项目
- **统一构建**：使用相同的构建流程和工具链
- **简化协作**：团队成员可以更容易地了解和贡献到多个相关项目

## 常用工具

- **PNPM**：高效的包管理器，支持workspace功能
- **Lerna**：Monorepo管理工具，用于版本控制和发布

## 项目结构示例

```
monorepo-root/
├── packages/
│   ├── components/         # 共享组件库
│   ├── utils/              # 工具函数库
│   ├── hooks/              # 自定义Hooks库
│   ├── types/              # 类型定义库
│   └── styles/             # 样式库
├── apps/
│   ├── web/                # Web应用
│   ├── admin/              # 管理后台
│   └── mobile/             # 移动端应用
├── tools/                  # 构建工具和脚本
├── docs/                   # 项目文档
├── pnpm-workspace.yaml     # PNPM工作区配置
└── package.json            # 根项目配置
```

## 实践示例

示例仓库: [https://github.com/burc-li/pnpm-monorepo](https://github.com/burc-li/pnpm-monorepo)

## PNPM工作区配置

在根目录创建`pnpm-workspace.yaml`文件：

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

根目录`package.json`配置示例：

```json
{
  "name": "root",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "clean": "lerna clean",
    "build": "lerna run build",
    "dev": "lerna run dev --parallel",
    "test": "lerna run test",
    "lint": "lerna run lint",
    "release": "lerna publish"
  },
  "dependencies": {},
  "devDependencies": {
    "lerna": "^8.2.2"
  },
  "engines": {
    "node": ">=16",
    "pnpm": ">=7"
  }
}

```

## 经验总结

### VSCode源代码管理配置

在VSCode中源代码管理面板可能无法显示apps下面的git仓库，添加`.vscode/settings.json`解决：

```json
{
    "git.autoRepositoryDetection": true,
    "git.detectSubmodules": true,
    "git.repositoryScanMaxDepth": 3,
    "git-graph.maxDepthOfRepoSearch": 3
}
```

### 各项目权限管理方案

为了更精细地控制各子项目的访问权限，可采用以下策略：

1. **独立仓库模式**：每个`apps`下的项目维护一个独立的git仓库，monorepo-root作为总的git进行整体控制
2. **Git子模块方式**：使用Git Submodules将独立仓库集成到主仓库中
3. **权限分层控制**：
   - 使用`.gitaccess`文件定义不同团队对不同packages的访问权限
   - 利用CI/CD系统进行权限验证和构建隔离

### 依赖管理最佳实践

1. **提升依赖**：使用PNPM的依赖提升功能减少重复安装，添加`.npmrc`文件:
   ```
   shamefully-hoist=true
   ```

## 📚 参考资源

- [精通 Monorepo 架构设计](https://juejin.cn/post/7215886869199896637)
- [vue3 + pnpm 打造一个 monorepo 项目](https://www.cnblogs.com/burc/p/18568326)
- [Monorepo：让你的项目脱胎换骨，既能代码复用，又能独立部署！](https://segmentfault.com/a/1190000045216948#item-1-1)
- [PNPM 官方文档 - Workspaces](https://pnpm.io/workspaces)
- [Turborepo 文档](https://turbo.build/repo)
