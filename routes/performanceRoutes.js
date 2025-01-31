const express = require("express");
const Performance = require("../models/Performance"); // Performance 모델 가져오기
const router = express.Router();

// 모든 공연 데이터 가져오기 (GET)
router.get("/", async (req, res) => {
  try {
    const performances = await Performance.find();
    res.json(performances);
  } catch (error) {
    res.status(500).json({ error: "공연 데이터를 가져오는 중 오류 발생" });
  }
});

// 새로운 공연 추가하기 (POST)
router.post("/", async (req, res) => {
  try {
    const newPerformance = new Performance(req.body);
    await newPerformance.save();
    res.status(201).json(newPerformance);
  } catch (error) {
    res.status(500).json({ error: "공연 데이터 저장 중 오류 발생" });
  }
});

module.exports = router;
