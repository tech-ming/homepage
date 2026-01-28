---
date: 2026-01-28
category:
  - flutter
  - android
tag:
  - huawei
  - agconnect
  - gradle
---

# Flutter 接入华为 AppGallery Connect (AGConnect)

## 前置条件

- 在 [华为开发者联盟](https://developer.huawei.com/consumer/cn/) 创建应用
- 下载 `agconnect-services.json` 配置文件

## 文件结构

```
android/
├── gradle/
│   └── libs.versions.toml      # 版本统一管理
├── settings.gradle.kts
├── build.gradle.kts
└── app/
    ├── build.gradle.kts
    └── agconnect-services.json  # 华为配置文件（放这里！）
```

## 配置步骤

### 1. libs.versions.toml

```toml
[versions]
agp = "8.7.0"
kotlin = "2.1.0"
agcp = "1.9.3.302"

[libraries]
agcp = { module = "com.huawei.agconnect:agcp", version.ref = "agcp" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
agconnect = { id = "com.huawei.agconnect", version.ref = "agcp" }
```

### 2. settings.gradle.kts

```kotlin
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
        // 华为 Maven 仓库
        maven { url = uri("https://developer.huawei.com/repo/") }
    }

    // AGConnect 插件不遵循 Gradle 标准命名，需手动映射
    resolutionStrategy {
        eachPlugin {
            if (requested.id.id == "com.huawei.agconnect") {
                useModule("com.huawei.agconnect:agcp:${requested.version}")
            }
        }
    }
}

plugins {
    // ... 其他插件
    // 注意：settings.gradle.kts 无法使用 libs，必须硬编码版本
    id("com.huawei.agconnect") version "1.9.3.302" apply false
}
```

### 3. build.gradle.kts（项目级）

```kotlin
allprojects {
    repositories {
        google()
        mavenCentral()
        // 华为 Maven 仓库
        maven { url = uri("https://developer.huawei.com/repo/") }
    }
}
```

### 4. app/build.gradle.kts

```kotlin
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    id("dev.flutter.flutter-gradle-plugin")
    // AGConnect 插件
    alias(libs.plugins.agconnect)
}
```

### 5. 放置配置文件

将 `agconnect-services.json` 放到 `android/app/` 目录下（不是 `android/` 根目录）。

## 常见问题

### Catalog named libs doesn't exist

AGConnect 插件内部依赖 `libs` catalog。确保 `android/gradle/libs.versions.toml` 文件存在。

### No value present

1. 检查 `agconnect-services.json` 是否在 `android/app/` 目录
2. 检查 `resolutionStrategy` 是否配置正确
3. 检查华为 Maven 仓库是否添加到 `pluginManagement.repositories`

### Plugin was not found

`settings.gradle.kts` 的 `pluginManagement.repositories` 中需要添加华为仓库：

```kotlin
maven { url = uri("https://developer.huawei.com/repo/") }
```

## 为什么 settings.gradle.kts 要硬编码版本？

Gradle 的引导顺序：

```
settings.gradle.kts 执行 → libs.versions.toml 加载 → build.gradle.kts 执行
```

`settings.gradle.kts` 执行时 catalog 还未加载，所以无法使用 `libs`。这是 Gradle 设计限制。
