const mongoose = require("mongoose");
const Member = require("./Member"); // Member 모델 가져오기

const PerformanceSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamMembers: { type: [String], required: true },
  genre: { type: [String], required: true },
  season: {
    type: String,
    required: false,
    validate: {
      validator: function (value) {
        return /^20\d{2} (봄|가을)$/.test(value); // "YYYY 봄" 또는 "YYYY 가을" 형식 검증
      },
      message: "시즌은 'YYYY 봄' 또는 'YYYY 가을' 형식이어야 합니다."
    }
  },
  youtube: { type: String, required: false }
});

// 🔥 Performance가 저장된 후, 팀원들의 performances 목록 업데이트
PerformanceSchema.post("save", async function (doc) {
  try {
    await Member.updateMany(
      { name: { $in: doc.teamMembers } }, // teamMembers에 포함된 멤버 찾기
      { $addToSet: { performances: doc.teamName } } // performances 배열에 공연명 추가 (중복 방지)
    );

    console.log(`✅ 팀원들의 공연 목록 업데이트 완료: ${doc.teamName}`);
  } catch (error) {
    console.error(`❌ 공연 업데이트 중 오류 발생: ${error.message}`);
  }
});

module.exports = mongoose.model("Performance", PerformanceSchema);
