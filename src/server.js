require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Kết nối MongoDB
// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => console.log("MongoDB connection error: ", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});