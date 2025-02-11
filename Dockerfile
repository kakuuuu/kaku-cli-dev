# 构建阶段
FROM node:18-alpine AS builder
# Create app directory
WORKDIR /usr/src/app
# Install pnpm
RUN npm install -g pnpm@8

COPY package*.json ./
# 项目安装依赖
RUN pnpm install

# 复制项目的文件
COPY . .

# 生产运行阶段

EXPOSE 3001
CMD ["npm", "run", "server"]
