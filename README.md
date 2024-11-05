# RGB Asia 项目

## 项目下载和运行指南

### 1. 下载项目
```bash
git clone https://github.com/your-username/rgb-asia.git
cd rgb-asia
```

### 2. 安装依赖
```bash
npm install
```

### 3. 开发模式运行
```bash
npm run dev
```

### 4. 生产环境构建
```bash
npm run build
```

### 5. 预览生产构建
```bash
npm run preview
```

### 6. 生产环境运行
```bash
npm start
```

## 系统要求

- Node.js 18.x 或更高版本
- npm 8.x 或更高版本

## 项目结构

```
rgb-asia/
├── src/
│   ├── components/     # React 组件
│   ├── hooks/         # 自定义 Hooks
│   ├── App.tsx        # 主应用组件
│   ├── main.tsx       # 应用入口
│   └── index.css      # 全局样式
├── public/            # 静态资源
├── index.html         # HTML 模板
├── package.json       # 项目配置
├── server.js          # Express 服务器
├── tailwind.config.js # Tailwind 配置
├── tsconfig.json      # TypeScript 配置
└── vite.config.ts     # Vite 配置
```

## 环境变量配置

创建 `.env` 文件在项目根目录：

```env
PORT=3000
NODE_ENV=development
```

## 注意事项

1. 确保端口 3000 未被占用
2. 开发模式下支持热重载
3. 生产环境使用 Express 服务器
4. 已配置响应式设计支持所有设备

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Express