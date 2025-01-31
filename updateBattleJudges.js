const mongoose = require("mongoose");
require("dotenv").config();

const Battle = require("./models/Battle");
const Member = require("./models/Member");

async function updateBattleJudges(battleName, judgesList) {
  try {
    // ✅ MongoDB 연결
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/lunatic_db");

    // ✅ 배틀의 `judges` 필드 업데이트 (중복 방지)
    const updateBattle = await Battle.updateOne(
      { battleName }, // 특정 배틀 찾기
      { $addToSet: { judges: { $each: judgesList } } } // ✅ 중복 없이 추가
    );

    console.log(`✅ ${battleName} 배틀의 judges 업데이트 완료:`, updateBattle);

    // ✅ `judges` 명단에 있는 멤버들의 `judges` 배열에 배틀 추가 (중복 방지)
    const updateMembers = await Member.updateMany(
      { name: { $in: judgesList } }, // ✅ judges 명단에 포함된 멤버 찾기
      { $addToSet: { judges: battleName } } // ✅ 중복 없이 추가
    );

    console.log(`✅ ${judgesList.length}명의 멤버 judges 업데이트 완료:`, updateMembers);

  } catch (error) {
    console.error("❌ 업데이트 중 오류 발생:", error);
  } finally {
    mongoose.connection.close();
  }
}

// ✅ 실행 (예제 데이터)
const battleName = "매달미니배틀 vol.9"; // 업데이트할 배틀명
const judgesList = ["김태경"]; // 배틀의 심사위원 명단

updateBattleJudges(battleName, judgesList);
