# 组件库项目

### 特性

⚡️ Vue 3, Vite, TypeScript - 高效、现代化的前端开发环境  
🗂 File based routing - 基于文件的路由系统（使用`vue-router`）  
📦 Components auto importing - 组件自动导入（使用`unplugin-vue-components`）  
🍍 State Management via Pinia - 使用Pinia进行状态管理  
📑 Layout system - 灵活的布局系统（使用`vite-plugin-vue-layouts`）  
📲 PWA - 渐进式Web应用（使用`vite-plugin-pwa`和`workbox-window`）  
🎨 UnoCSS - 即时按需生成的原子CSS引擎（使用`@unocss/reset`和`unocss`）  
😃 Use icons from any icon sets with classes - 使用任何图标集（使用`@iconify/json`和`@iconify/vue`）  
🌍 I18n ready - 支持国际化（未在`package.json`中明确）  
🗒 Markdown Support - 支持Markdown格式
🔥 Use the new `<script setup>` syntax - 支持新的`<script setup>`语法  
📥 APIs auto importing - 自动导入Composition API等（使用`unplugin-auto-import`）  
⚙️ Unit Testing with Vitest, E2E Testing with Cypress - 单元测试和端到端测试（使用`vitest`和`cypress`）  


### 预配置

#### UI框架

- Element Plus - 基于 Vue 3 的UI组件库

#### Icons

- Iconify - 使用任何图标集

#### 插件

- Vue Router - 路由管理
- vite-plugin-pages - 基于文件系统的路由
- vite-plugin-vue-layouts - 页面布局
- Pinia - 状态管理
- unplugin-vue-components - 组件自动导入
- unplugin-auto-import - API自动导入
- vite-plugin-pwa - PWA支持

#### 编码风格

- ESLint with Prettier - 代码检查和格式化

#### 开发工具

- TypeScript - 类型检查
- Vitest - 单元测试
- Cypress - 端到端测试
- npm-run-all - 并行运行多个npm脚本



## 安装与使用

```
bashCopy code
# 克隆项目
git clone https://github.com/power-mooc/admin-template-vue3.git

# 进入项目目录
cd pk-front-vue3

# 安装依赖
npm install

# 本地开发
npm run dev
```



## 功能模块

### 1. 首页

- **概览**: 提供系统整体状态的快照。
- **看板**: 可自定义的数据展示面板。

### 2. 系统管理

- **用户管理**: 管理系统用户的信息、权限等。
- **角色管理**: 定义不同角色和它们的权限。
- **菜单管理**: 管理系统菜单结构。
- **部门管理**: 组织内部门的管理。
- **字典管理**: 管理系统中的各种字典数据。
- **系统日志**: 记录和查看系统操作日志。

### 3. 风格定制

- **主题配色**: 允许用户自定义界面颜色。
- **布局**: 提供多种布局选项。
- **暗黑模式**: 支持深色主题。
- **全屏**: 全屏显示选项。
- **切换动画**: 页面切换动画效果。

### 4. 模板页面

- **表单页**: 包含各种表单元素和校验。
- **详情页**: 展示详细信息。
- **列表页**: 数据列表展示。
- **结果页**: 操作结果反馈页面。
- **个人中心**: 用户个人信息和设置。
- **异常页**: 错误和异常处理页面。

### 5. 基础组件

- **图标**: 使用Iconify集成多种图标。
- **表单**: 包括各种表单元素和校验功能。
- **表格**: 数据表格展示和操作。
- **选择器**: 下拉选择器、时间选择器等。
- **菜单**: 导航和侧边栏菜单。
- **动态展示**: 轮播图、折叠面板等。
- **通知分享**: 消息通知和分享功能。
- **Excel处理**: Excel文件的导入和导出。
- **编辑器**: 文本和代码编辑器。
- **展示**: 卡片、标签页等展示元素。

### 6. 扩展功能

- **日历卡片**: 显示日历信息。
- **天气**: 天气信息展示。
- **倒计时**: 倒计时功能。
- **过渡动画**: 页面和元素的过渡动画。
- **图片裁剪**: 图片裁剪功能。
- **文件下载**: 文件下载功能。
- **打印**: 页面打印功能。
- **国际化**: 多语言支持。
- **水印**: 页面水印功能。
- **验证组件**: 各种自定义验证。
- **复制图片**: 图片复制功能。
- **音频播放**: 音频播放组件。
- **视频播放**: 视频播放组件。

### 7. 图表

- **Echarts集成**: 集成Echarts图表库。
- **地图应用**: 地图数据展示。
- **AntV G2**: 集成AntV G2图表库。
- **D3.js**: 集成D3.js数据可

### 8. 打包构建

- **Vite**: 使用Vite进行快速开发和构建。
- **简化配置**: 提供简单的配置选项。
- **git版本控制**: 使用git进行版本控制。
- **组件单元测试**: 使用Vitest进行组件单元测试。
- **性能优化**: 各种前端性能优化技巧。
- **桌面跨端方案**: 支持Electron进行桌面应用开发。
- **构建脚本**: 自动化构建脚本。
- **工作流**: 集成持续集成和持续部署。
- **集成测试**: 使用Cypress进行端到端测试。

### 9. 部署与发布

- 提供多种部署和发布选项，包括但不限于Netlify、Docker等。



## 贡献指南

1. Fork 本仓库
2. 创建新的分支 (`git checkout -b new-feature`)
3. 提交更改 (`git commit -am 'Add some feature'`)
4. 推送到分支 (`git push origin new-feature`)
5. 创建 Pull Request



## 开源协议

本项目遵循 MIT 协议。

------

感谢您对本项目的关注，欢迎提交问题和贡献代码。希望这个组件库能帮助您更高效地开发管理后台应用。