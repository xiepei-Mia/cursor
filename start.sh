#!/bin/bash

echo "🚀 启动采购系统供应商门户..."

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未找到Node.js，请先安装Node.js"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误：未找到npm，请先安装npm"
    exit 1
fi

# 检查package.json是否存在
if [ ! -f "package.json" ]; then
    echo "❌ 错误：未找到package.json文件"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 启动开发服务器
echo "🌐 启动开发服务器..."
npm run dev 