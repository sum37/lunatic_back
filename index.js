const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({origin: "*"}));
app.use(express.json()); // JSON 요청 파싱

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 라우트 추가
const battleRoutes = require("./routes/battleRoutes");
const performanceRoutes = require("./routes/performanceRoutes"); // 추가!
const memberRoutes = require("./routes/memberRoutes"); // 추가!
const hallOfFameRoutes = require("./routes/hallOfFameRoutes");

app.use("/battles", battleRoutes);
app.use("/performances", performanceRoutes); // 추가!
app.use("/members", memberRoutes); // 추가!
app.use("/hall-of-fame", hallOfFameRoutes);

// 기본 라우트
app.get("/", (req, res) => {
  res.send("백엔드 서버가 정상적으로 실행 중입니다! 🚀");
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ 서버 실행됨: http://localhost:${PORT}`);
});

