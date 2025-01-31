const express = require("express");
const Battle = require("../models/Battle");

const router = express.Router();

// 배틀 데이터 가져오기 (날짜 내림차순 정렬)
router.get("/", async (req, res) => {
  try {
    const battles = await Battle.find().lean();

    // 날짜 정렬: YYYY-MM-DD > YYYY 순서, 내림차순
    battles.sort((a, b) => {
      const dateA = a.date.includes("-") ? new Date(a.date) : new Date(a.date + "-12-31");
      const dateB = b.date.includes("-") ? new Date(b.date) : new Date(b.date + "-12-31");
      return dateB - dateA; // 내림차순 정렬
    });

    res.json(battles);
  } catch (error) {
    res.status(500).json({ error: "데이터를 가져오는 중 오류 발생" });
  }
});

// 배틀 데이터 추가하기
router.post("/", async (req, res) => {
  try {
    const newBattle = new Battle(req.body);
    await newBattle.save();
    res.status(201).json(newBattle);
  } catch (error) {
    res.status(500).json({ error: "데이터 저장 중 오류 발생" });
  }
});

module.exports = router;
