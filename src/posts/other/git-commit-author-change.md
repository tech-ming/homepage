---
date: 2025-06-27
category:
  - git
tag:
  - git-commit
  - author-change
---

# Git 修改Git提交历史中的作者和提交者信息

## 脚本用法

### 使用步骤
1. 修改脚本变量为你的实际值
2. 复制修改后的脚本到cmd中执行脚本

```bash
git filter-branch -f --env-filter '
# 定义变量 - 请替换为实际值
OLD_EMAIL="旧邮箱"
OLD_NAME="旧名字"
CORRECT_NAME="新名称"
CORRECT_EMAIL="新邮箱"

# 检查提交者信息（同时匹配邮箱或名字）
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ] || [ "$GIT_COMMITTER_NAME" = "$OLD_NAME" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi

# 检查作者信息（同时匹配邮箱或名字）
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ] || [ "$GIT_AUTHOR_NAME" = "$OLD_NAME" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

## 推送更改到远程仓库

```bash
git push --force origin main
```

## 重要注意事项

- 此操作会重写整个Git历史，而不是添加新的提交
- 所有提交的哈希值都会改变
- 对于协作项目，此操作会导致仓库历史被完全替换
- 其他开发者需要重新克隆仓库或执行复杂的本地修复
- 在执行前请确保已备份重要数据
- 在共享仓库上执行此操作前，请通知所有协作者

## 替代方案

如果只需修改最近一次提交的作者信息，可以使用以下命令：

```bash
git commit --amend --author="新名称 <新邮箱>" --no-edit
git push --force origin main
```
## 📚 参考资源
- [揭秘Git中如何优雅地替换提交者信息，避免历史混乱](https://www.oryoy.com/news/jie-mi-git-zhong-ru-he-you-ya-di-ti-huan-ti-jiao-zhe-xin-xi-bi-mian-li-shi-hun-luan-a14793192.html)
