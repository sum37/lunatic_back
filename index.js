const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: ["https://lunatic-front-rebase.vercel.app"], // Vercel 프론트 도메인 명확히 지정
  credentials: true, // ✅ 쿠키 포함 요청 허용
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // 허용 메소드 추가
  allowedHeaders: ["Content-Type", "Authorization"], // 허용 헤더 추가
  exposedHeaders: ["Authorization"], // 응답 헤더 노출
}));

app.options("*", cors()); // ✅ Preflight 요청 허용

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

