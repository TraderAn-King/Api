# استفاده از Node.js به عنوان پایه برای ساخت تصویر Docker
FROM node:16

# تنظیم دایرکتوری کاری
WORKDIR /usr/src/app

# کپی کردن فایل‌های package.json و package-lock.json برای نصب وابستگی‌ها
COPY package*.json ./

# نصب وابستگی‌ها
RUN npm install

# کپی کردن بقیه فایل‌های پروژه به دایرکتوری کاری
COPY . .

# اعلام پورت مورد استفاده توسط سرور
EXPOSE 3000

# دستور برای اجرای سرور Node.js
CMD ["node", "server.js"]