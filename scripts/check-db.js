// scripts/check-db.js
require('dotenv').config();
const mongoose = require('mongoose');

async function inspect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI chưa được thiết lập trong .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection.db;
    console.log('Kết nối tới database:', db.databaseName);

    const cols = await db.listCollections().toArray();
    if (!cols.length) {
      console.log('Không tìm thấy collection nào.');
    } else {
      console.log('Các collection và số lượng tài liệu:');
      for (const c of cols) {
        const name = c.name;
        const count = await db.collection(name).countDocuments();
        console.log(`- ${name}: ${count}`);
      }
    }
  } catch (err) {
    console.error('Lỗi khi kiểm tra DB:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

inspect();
