const mongoose = require("mongoose");
const Member = require("./Member"); // Member 모델 가져오기

const BattleSchema = new mongoose.Schema({
  battleName: { type: String, required: true },
  date: { type: String, required: false },
  winner: { type: [String], required: true }, // 배열 (우승자 여러 명 가능)
  mvp: { type: [String], required: false, default: ["-"] }, // 배열 (MVP 여러 명 가능)
  youtube: { type: String, required: false },
  judges: {type: [String], default: []}
});

// 🔥 배틀이 생성된 후, 우승자와 MVP 데이터 업데이트
BattleSchema.post("save", async function (doc) {
  try {
    // 우승자 목록을 업데이트
    await Member.updateMany(
      { name: { $in: doc.winner } }, // 우승자 목록에 있는 멤버 찾기
      { $addToSet: { winBattles: doc.battleName } } // winBattles 배열에 배틀명 추가 (중복 방지)
    );

    // MVP 목록을 업데이트
    await Member.updateMany(
      { name: { $in: doc.mvp } }, // MVP 목록에 있는 멤버 찾기
      { $addToSet: { mvpBattles: doc.battleName } } // mvpBattles 배열에 배틀명 추가 (중복 방지)
    );

    await Member.updateMany(
      { name: { $in: doc.judges } }, // MVP 목록에 있는 멤버 찾기
      { $addToSet: { judges: doc.battleName } } // mvpBattles 배열에 배틀명 추가 (중복 방지)
    );

    console.log(`✅ 우승자 및 MVP 목록 업데이트 완료: ${doc.battleName}`);
  } catch (error) {
    console.error(`❌ 우승자 업데이트 중 오류 발생: ${error.message}`);
  }
});

module.exports = mongoose.model("Battle", BattleSchema);
