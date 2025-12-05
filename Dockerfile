# 1. Chọn môi trường Node.js (phiên bản ổn định)
FROM node:18-alpine

# 2. Tạo thư mục làm việc bên trong Container
WORKDIR /usr/src/app

# 3. Copy file package.json và package-lock.json vào trước
COPY package*.json ./

# 4. Cài đặt các thư viện (npm install) bên trong Container
RUN npm install

# 5. Copy toàn bộ code nguồn của bạn vào Container
COPY . .

# 6. Mở cổng 3000 (Cổng mà server.js của bạn đang dùng)
EXPOSE 3000

# 7. Lệnh chạy ứng dụng khi Container khởi động
CMD ["node", "server.js"]