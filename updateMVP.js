const mongoose = require("mongoose");
require("dotenv").config();

const Battle = require("./models/Battle");
const Member = require("./models/Member");

async function updateBattleJudges(battleName, mvpList) {
  try {
    // ✅ MongoDB 연결
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/lunatic_db");

    // ✅ 배틀의 `judges` 필드 업데이트 (중복 방지)
    const updateBattle = await Battle.updateOne(
      { battleName }, // 특정 배틀 찾기
      { $addToSet: { mvp: { $each: mvpList } } } // ✅ 중복 없이 추가
    );

    console.log(`✅ ${battleName} 배틀의 mvp 업데이트 완료:`, updateBattle);

    // ✅ `judges` 명단에 있는 멤버들의 `judges` 배열에 배틀 추가 (중복 방지)
    const updateMembers = await Member.updateMany(
      { name: { $in: mvpList } }, // ✅ judges 명단에 포함된 멤버 찾기
      { $addToSet: { mvpBattles: battleName } } // ✅ 중복 없이 추가
    );

    console.log(`✅ ${mvpList.length}명의 멤버 mvp 업데이트 완료:`, updateMembers);

  } catch (error) {
    console.error("❌ 업데이트 중 오류 발생:", error);
  } finally {
    mongoose.connection.close();
  }
}

// ✅ 실행 (예제 데이터)
const battleName = "2024 KAIST-POSTECH Dance Battle"; // 업데이트할 배틀명
const mvpList = ["기민수", "신찬영", "조성준"]; // 배틀의 심사위원 명단

updateBattleJudges(battleName, mvpList);
