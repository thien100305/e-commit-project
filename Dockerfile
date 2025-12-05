# Sử dụng Node 18 Alpine
FROM node:18-alpine

# Tạo workspace
WORKDIR /usr/src/app

# Copy file package trước để cache npm install
COPY package*.json ./

# Cài dependency
RUN npm install

# Copy toàn bộ source code
COPY . .

# Mở port app chạy (giả sử đang chạy port 3000)
EXPOSE 3000

# Lệnh start app
CMD ["npm", "start"]
