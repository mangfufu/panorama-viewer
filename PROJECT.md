# 全景图片查看工具 - 项目规划

## 项目概述

一个基于 Web 的全景图片查看工具，支持用户上传 360°/720° 全景照片，提供拖拽查看、截图导出、热点标注、虚拟导览等功能。

## 技术栈

|     |     |     |
| --- | --- | --- |
| 组件  | 技术选择 | 说明  |
| 前端框架 | React 18 + TypeScript | 组件化开发，类型安全 |
| 构建工具 | Vite | 快速开发，热更新 |
| 全景引擎 | Pannellum | 轻量级(21kB)，WebGL 渲染 |
| 样式  | Tailwind CSS | 原子化 CSS，快速开发 |
| 状态管理 | Zustand | 轻量级状态管理 |

## 支持的全景图格式

### 1\. Equirectangular（等距矩形投影）

-   **说明**: 最常用的全景图格式，单张 2:1 比例图片
    
-   **性能**: 最佳
    
-   **适用场景**: 日常使用，手机拍摄的全景照片
    
-   **限制**: 建议宽度 ≤ 4096px，最大支持 8192px
    

### 2\. Cubemap（立方体贴图）

-   **说明**: 6 张立方体面图片（前、右、后、左、上、下）
    
-   **性能**: 良好
    
-   **适用场景**: 高分辨率专业全景
    
-   **优势**: 支持更高分辨率，兼容性更好
    

### 3\. Multiresolution（多分辨率瓦片）

-   **说明**: 基于立方体贴图的多分辨率金字塔格式
    
-   **性能**: 最佳（按需加载）
    
-   **适用场景**: 超大图片（8K+）
    
-   **劣势**: 需要预处理，文件数量多
    

## 功能模块

### 阶段一：基础功能 (MVP)

-   项目初始化
    
-   拖拽/点击上传全景图
    
-   360° 拖拽查看
    
-   鼠标滚轮缩放
    
-   无损截图导出（保持原始分辨率）
    
-   全屏模式
    
-   响应式布局
    

### 阶段二：进阶功能

-   多张全景图管理（列表、切换、删除）
    
-   热点标注（信息提示、外部链接）
    
-   自定义视角限制
    
-   加载进度条
    
-   图片信息显示
    

### 阶段三：完整功能

-   虚拟导览（场景间跳转，带过渡动画）
    
-   自动旋转（可配置速度）
    
-   设备陀螺仪支持（移动端）
    
-   预览图/缩略图生成
    
-   键盘快捷键控制
    
-   主题切换（明/暗）
    

## 截图导出技术方案

```typescript
// 获取 Pannellum 内部 WebGL canvas
const canvas = viewer.getCanvas();

// 方案1: toDataURL (返回 base64)
const dataUrl = canvas.toDataURL('image/png');

// 方案2: toBlob (推荐，无损且支持大图)
canvas.toBlob((blob) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'panorama-screenshot.png';
  a.click();
  URL.revokeObjectURL(url);
}, 'image/png');
```

## 项目结构

```
panorama-viewer/
├── public/
│   └── samples/              # 示例全景图
├── src/
│   ├── components/
│   │   ├── PanoramaViewer/   # 全景查看器核心组件
│   │   ├── UploadZone/       # 拖拽上传区域
│   │   ├── Gallery/          # 图片管理面板
│   │   ├── HotspotEditor/    # 热点编辑器
│   │   ├── TourBuilder/      # 虚拟导览构建器
│   │   ├── Toolbar/          # 工具栏
│   │   └── common/           # 通用组件
│   ├── hooks/
│   │   ├── usePannellum.ts   # Pannellum 封装 hook
│   │   ├── useScreenshot.ts  # 截图功能 hook
│   │   └── useFileUpload.ts  # 文件上传 hook
│   ├── store/
│   │   └── panoramaStore.ts  # Zustand 状态管理
│   ├── types/
│   │   └── panorama.ts       # TypeScript 类型定义
│   ├── utils/
│   │   ├── image.ts          # 图片处理工具
│   │   └── file.ts           # 文件操作工具
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── PROJECT.md
```

## 开发规范

### 代码风格

-   使用 TypeScript 严格模式
    
-   组件使用函数式组件 + Hooks
    
-   状态管理使用 Zustand
    
-   样式使用 Tailwind CSS
    

### 命名规范

-   组件: PascalCase (如 `PanoramaViewer`)
    
-   Hook: camelCase, `use` 前缀 (如 `usePannellum`)
    
-   工具函数: camelCase (如 `getImageDimensions`)
    
-   类型/接口: PascalCase (如 `PanoramaConfig`)
    

### Git 提交规范

-   `feat`: 新功能
    
-   `fix`: 修复 bug
    
-   `docs`: 文档更新
    
-   `style`: 代码格式调整
    
-   `refactor`: 重构
    
-   `perf`: 性能优化
    
-   `test`: 测试相关
    

## 性能优化策略

1.  **图片压缩**: 上传时提示用户压缩大图
    
2.  **懒加载**: 多图场景下按需加载
    
3.  **WebGL 渲染**: 使用硬件加速
    
4.  **多分辨率**: 超大图片使用 multires 格式
    
5.  **内存管理**: 及时释放不用的图片资源
    

## 浏览器兼容性

|     |     |
| --- | --- |
| 浏览器 | 最低版本 |
| Chrome | 41+ |
| Firefox | 40+ |
| Safari | 9+  |
| Edge | 12+ |

## 参考资源

-   [Pannellum 官方文档](https://pannellum.org/documentation/)
    
-   [Pannellum GitHub](https://github.com/mpetroff/pannellum)
    
-   [Three.js 全景示例](https://threejs.org/examples/#webgl_panorama_equirectangular)