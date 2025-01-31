const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, // 이름
  generation: { type: Number, required: true, min: 1 }, // 기수 (1 이상)
  mainGenre: { type: String, required: true, default: "-", trim: true }, // 주장르
  affiliation: { type: String, required: true, trim: true }, // 소속 (예: KAIST, 외부 팀)
  winBattles: { type: [String], default: [] }, // 우승 배틀 목록
  mvpBattles: {type: [String], default: []},
  performances: { type: [String], default: [] }, // 공연 목록
  judges: {type: [String], default: []}
});

module.exports = mongoose.model("Member", MemberSchema);
