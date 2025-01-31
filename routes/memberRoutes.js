const express = require("express");
const Member = require("../models/Member"); // Member 모델 가져오기
const router = express.Router();

// 모든 멤버 데이터 가져오기 (GET)
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: "멤버 데이터를 가져오는 중 오류 발생" });
  }
});

// 새로운 멤버 추가하기 (POST)
router.post("/", async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: "멤버 데이터 저장 중 오류 발생" });
  }
});

module.exports = router;
