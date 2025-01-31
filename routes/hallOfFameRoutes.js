const express = require("express");
const Member = require("../models/Member");

const router = express.Router();

// ✅ 우승 부문 (winBattles 개수 기준 상위 5명)
router.get("/winners", async (req, res) => {
  try {
    const winners = await Member.aggregate([
      { $addFields: { winBattlesCount: { $size: "$winBattles" } } }, // ✅ winBattles 배열 길이 추가
      { $sort: { winBattlesCount: -1 } }, // ✅ 내림차순 정렬
      { $limit: 5 }, // ✅ 상위 5명만 가져오기
      { $project: { name: 1, generation: 1, winBattlesCount: 1 } } // ✅ 필요한 필드만 선택
    ]);

    res.status(200).json(winners);
  } catch (error) {
    res.status(500).json({ error: "우승자 데이터를 불러오는 데 실패했습니다." });
  }
});

// ✅ 저지 부문 (judges 개수 기준 상위 5명)
router.get("/judges", async (req, res) => {
  try {
    const judges = await Member.aggregate([
      { $addFields: { judgesCount: { $size: "$judges" } } }, // ✅ judges 배열 길이 추가
      { $sort: { judgesCount: -1 } }, // ✅ 내림차순 정렬
      { $limit: 5 },
      { $project: { name: 1, generation: 1, judgesCount: 1 } }
    ]);

    res.status(200).json(judges);
  } catch (error) {
    res.status(500).json({ error: "저지 데이터를 불러오는 데 실패했습니다." });
  }
});

// ✅ 공연 부문 (performances 개수 기준 상위 5명)
router.get("/performers", async (req, res) => {
  try {
    const performers = await Member.aggregate([
      { $addFields: { performancesCount: { $size: "$performances" } } }, // ✅ performances 배열 길이 추가
      { $sort: { performancesCount: -1 } }, // ✅ 내림차순 정렬
      { $limit: 5 },
      { $project: { name: 1, generation: 1, performancesCount: 1 } }
    ]);

    res.status(200).json(performers);
  } catch (error) {
    res.status(500).json({ error: "공연 데이터를 불러오는 데 실패했습니다." });
  }
});

module.exports = router;
