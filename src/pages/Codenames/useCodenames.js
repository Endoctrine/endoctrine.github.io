/**
 * 截码战游戏状态管理
 * 使用 Vue 3 Composition API 管理游戏状态
 */

import { ref, computed } from 'vue';

// 游戏状态枚举
export const GamePhase = {
  SETUP: 'setup',           // 准备阶段 - 抽取词汇
  WORD_CONFIRMATION: 'word_confirmation',  // 词汇确认阶段 - 引导玩家记录
  ENCRYPTION: 'encryption', // 加密阶段 - 生成密码
  ENCRYPTION_HIDDEN: 'encryption_hidden',  // 密码隐藏阶段 - 引导加密人记录
  DESCRIPTION: 'description', // 描述阶段 - 加密人描述词汇
  GUESSING: 'guessing',     // 猜测阶段 - 两队猜测密码
  REVEAL: 'reveal',         // 公布阶段 - 公布真实密码
  RESULT: 'result',         // 结果阶段 - 统计得分
  GAME_OVER: 'game_over'    // 游戏结束
};

// 游戏队伍枚举
export const Team = {
  NONE: 'none',
  A: 'team_a',
  B: 'team_b'
};

// 当前队伍状态
const currentTeam = ref(Team.A);

// 词汇状态
const teamWords = ref({
  [Team.A]: [],  // A队词汇
  [Team.B]: []   // B队词汇
});

// 密码历史记录
const passwordHistory = ref([]);

// 当前轮的密码（加密阶段生成，但需隐藏）
const currentPassword = ref([]);

// 得分记录
const scores = ref({
  [Team.A]: 0,
  [Team.B]: 0
});

// 游戏阶段
const gamePhase = ref(GamePhase.SETUP);

// 胜利条件
const WINNING_SCORE = 2;

// 是否是加密方
const isEncryptingTeam = computed(() => {
  return currentTeam.value === Team.A;
});

// 获取当前队伍的词汇
const getCurrentTeamWords = computed(() => {
  return teamWords.value[currentTeam.value];
});

// 获取当前队伍的得分
const getCurrentTeamScore = computed(() => {
  return scores.value[currentTeam.value];
});

// 获取当前对手队伍
const getOpponentTeam = computed(() => {
  return currentTeam.value === Team.A ? Team.B : Team.A;
});

/**
 * 抽取当前队伍的四个词汇
 */
function drawWordsForCurrentTeam() {
  teamWords.value[currentTeam.value] = drawRandomWords(4);
  return teamWords.value[currentTeam.value];
}

/**
 * 为指定队伍设置词汇（用于测试或重新开始）
 */
function setTeamWords(team, words) {
  if (Array.isArray(words) && words.length === 4) {
    teamWords.value[team] = words;
  }
}

/**
 * 生成密码并保存到历史记录
 */
function generateAndStorePassword() {
  const password = generatePassword(3);
  currentPassword.value = password;
  
  // 添加到历史记录
  passwordHistory.value.push({
    team: currentTeam.value,
    password: [...password],  // 复制数组
    timestamp: new Date().toISOString()
  });
  
  return password;
}

/**
 * 获取当前队伍的所有密码历史
 */
function getTeamPasswordHistory(team) {
  return passwordHistory.value.filter(entry => entry.team === team);
}

/**
 * 切换到下一支队伍
 */
function switchTeam() {
  currentTeam.value = currentTeam.value === Team.A ? Team.B : Team.A;
}

/**
 * 重置当前轮的游戏状态（但保留词汇）
 */
function resetCurrentRound() {
  gamePhase.value = GamePhase.ENCRYPTION;
  currentPassword.value = [];
}

/**
 * 重置整场游戏
 */
function resetGame() {
  teamWords.value = {
    [Team.A]: [],
    [Team.B]: []
  };
  passwordHistory.value = [];
  currentPassword.value = [];
  scores.value = {
    [Team.A]: 0,
    [Team.B]: 0
  };
  gamePhase.value = GamePhase.SETUP;
  currentTeam.value = Team.A;
}

/**
 * 设置游戏阶段
 */
function setGamePhase(phase) {
  gamePhase.value = phase;
}

/**
 * 为某队加分
 */
function addScore(team, points = 1) {
  scores.value[team] = (scores.value[team] || 0) + points;
}

/**
 * 检查是否有队伍获胜
 */
function checkWinner() {
  if (scores.value[Team.A] >= WINNING_SCORE) {
    return Team.A;
  }
  if (scores.value[Team.B] >= WINNING_SCORE) {
    return Team.B;
  }
  return null;
}

/**
 * 获取格式化的历史记录
 */
function getFormattedHistory() {
  return passwordHistory.value.map((entry, index) => ({
    round: index + 1,
    team: entry.team === Team.A ? 'A队' : 'B队',
    password: entry.password.join(' → '),
    timestamp: new Date(entry.timestamp).toLocaleTimeString()
  }));
}

// 导出状态和操作
export {
  // 状态
  currentTeam,
  teamWords,
  passwordHistory,
  currentPassword,
  scores,
  gamePhase,
  
  // 计算属性
  isEncryptingTeam,
  getCurrentTeamWords,
  getCurrentTeamScore,
  getOpponentTeam,
  
  // 操作
  drawWordsForCurrentTeam,
  setTeamWords,
  generateAndStorePassword,
  getTeamPasswordHistory,
  switchTeam,
  resetCurrentRound,
  resetGame,
  setGamePhase,
  addScore,
  checkWinner,
  getFormattedHistory
};

export default {
  GamePhase,
  Team,
  currentTeam,
  teamWords,
  passwordHistory,
  currentPassword,
  scores,
  gamePhase,
  isEncryptingTeam,
  getCurrentTeamWords,
  getCurrentTeamScore,
  getOpponentTeam,
  drawWordsForCurrentTeam,
  setTeamWords,
  generateAndStorePassword,
  getTeamPasswordHistory,
  switchTeam,
  resetCurrentRound,
  resetGame,
  setGamePhase,
  addScore,
  checkWinner,
  getFormattedHistory
};
```

```javascript
/**
 * 截码战游戏状态管理
 * 使用 Vue 3 Composition API 管理游戏状态
 */

import { ref, computed } from 'vue';

// 游戏状态枚举
export const GamePhase = {
  SETUP: 'setup',           // 准备阶段 - 抽取词汇
  WORD_CONFIRMATION: 'word_confirmation',  // 词汇确认阶段 - 引导玩家记录
  ENCRYPTION: 'encryption', // 加密阶段 - 生成密码
  ENCRYPTION_HIDDEN: 'encryption_hidden',  // 密码隐藏阶段 - 引导加密人记录
  DESCRIPTION: 'description', // 描述阶段 - 加密人描述词汇
  GUESSING: 'guessing',     // 猜测阶段 - 两队猜测密码
  REVEAL: 'reveal',         // 公布阶段 - 公布真实密码
  RESULT: 'result',         // 结果阶段 - 统计得分
  GAME_OVER: 'game_over'    // 游戏结束
};

// 游戏队伍枚举
export const Team = {
  NONE: 'none',
  A: 'team_a',
  B: 'team_b'
};

// 当前队伍状态
const currentTeam = ref(Team.A);

// 词汇状态
const teamWords = ref({
  [Team.A]: [],  // A队词汇
  [Team.B]: []   // B队词汇
});

// 密码历史记录
const passwordHistory = ref([]);

// 当前轮的密码（加密阶段生成，但需隐藏）
const currentPassword = ref([]);

// 得分记录
const scores = ref({
  [Team.A]: 0,
  [Team.B]: 0
});

// 游戏阶段
const gamePhase = ref(GamePhase.SETUP);

// 胜利条件
const WINNING_SCORE = 2;

// 是否是加密方
const isEncryptingTeam = computed(() => {
  return currentTeam.value === Team.A;
});

// 获取当前队伍的词汇
const getCurrentTeamWords = computed(() => {
  return teamWords.value[currentTeam.value];
});

// 获取当前队伍的得分
const getCurrentTeamScore = computed(() => {
  return scores.value[currentTeam.value];
});

// 获取当前对手队伍
const getOpponentTeam = computed(() => {
  return currentTeam.value === Team.A ? Team.B : Team.A;
});

/**
 * 抽取当前队伍的四个词汇
 */
function drawWordsForCurrentTeam() {
  const { drawRandomWords } = require('./wordBank.js');
  teamWords.value[currentTeam.value] = drawRandomWords(4);
  return teamWords.value[currentTeam.value];
}

/**
 * 为指定队伍设置词汇（用于测试或重新开始）
 */
function setTeamWords(team, words) {
  if (Array.isArray(words) && words.length === 4) {
    teamWords.value[team] = words;
  }
}

/**
 * 生成密码并保存到历史记录
 */
function generateAndStorePassword() {
  const { generatePassword } = require('./wordBank.js');
  const password = generatePassword(3);
  currentPassword.value = password;
  
  // 添加到历史记录
  passwordHistory.value.push({
    team: currentTeam.value,
    password: [...password],  // 复制数组
    timestamp: new Date().toISOString()
  });
  
  return password;
}

/**
 * 获取当前队伍的所有密码历史
 */
function getTeamPasswordHistory(team) {
  return passwordHistory.value.filter(entry => entry.team === team);
}

/**
 * 切换到下一支队伍
 */
function switchTeam() {
  currentTeam.value = currentTeam.value === Team.A ? Team.B : Team.A;
}

/**
 * 重置当前轮的游戏状态（但保留词汇）
 */
function resetCurrentRound() {
  gamePhase.value = GamePhase.ENCRYPTION;
  currentPassword.value = [];
}

/**
 * 重置整场游戏
 */
function resetGame() {
  teamWords.value = {
    [Team.A]: [],
    [Team.B]: []
  };
  passwordHistory.value = [];
  currentPassword.value = [];
  scores.value = {
    [Team.A]: 0,
    [Team.B]: 0
  };
  gamePhase.value = GamePhase.SETUP;
  currentTeam.value = Team.A;
}

/**
 * 设置游戏阶段
 */
function setGamePhase(phase) {
  gamePhase.value = phase;
}

/**
 * 为某队加分
 */
function addScore(team, points = 1) {
  scores.value[team] = (scores.value[team] || 0) + points;
}

/**
 * 检查是否有队伍获胜
 */
function checkWinner() {
  if (scores.value[Team.A] >= WINNING_SCORE) {
    return Team.A;
  }
  if (scores.value[Team.B] >= WINNING_SCORE) {
    return Team.B;
  }
  return null;
}

/**
 * 获取格式化的历史记录
 */
function getFormattedHistory() {
  return passwordHistory.value.map((entry, index) => ({
    round: index + 1,
    team: entry.team === Team.A ? 'A队' : 'B队',
    password: entry.password.join(' → '),
    timestamp: new Date(entry.timestamp).toLocaleTimeString()
  }));
}

// 导出状态和操作
export {
  // 状态
  currentTeam,
  teamWords,
  passwordHistory,
  currentPassword,
  scores,
  gamePhase,
  
  // 计算属性
  isEncryptingTeam,
  getCurrentTeamWords,
  getCurrentTeamScore,
  getOpponentTeam,
  
  // 操作
  drawWordsForCurrentTeam,
  setTeamWords,
  generateAndStorePassword,
  getTeamPasswordHistory,
  switchTeam,
  resetCurrentRound,
  resetGame,
  setGamePhase,
  addScore,
  checkWinner,
  getFormattedHistory
};

export default {
  GamePhase,
  Team,
  currentTeam,
  teamWords,
  passwordHistory,
  currentPassword,
  scores,
  gamePhase,
  isEncryptingTeam,
  getCurrentTeamWords,
  getCurrentTeamScore,
  getOpponentTeam,
  drawWordsForCurrentTeam,
  setTeamWords,
  generateAndStorePassword,
  getTeamPasswordHistory,
  switchTeam,
  resetCurrentRound,
  resetGame,
  setGamePhase,
  addScore,
  checkWinner,
  getFormattedHistory
};