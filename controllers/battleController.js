const Battle = require("../models/Battle");

// 배틀 리스트 가져오기 (날짜 내림차순 정렬)
const getBattles = async (req, res) => {
  try {
    const battles = await Battle.find().lean();

    // 날짜 내림차순 정렬 (YYYY-MM-DD > YYYY 순서)
    battles.sort((a, b) => {
      const dateA = a.date.includes("-") ? new Date(a.date) : new Date(a.date + "-12-31");
      const dateB = b.date.includes("-") ? new Date(b.date) : new Date(b.date + "-12-31");
      return dateB - dateA; // 내림차순 정렬
    });

    res.status(200).json(battles);
  } catch (error) {
    res.status(500).json({ message: "데이터를 불러오는 중 오류 발생", error: error.message });
  }
};

module.exports = { getBattles };
