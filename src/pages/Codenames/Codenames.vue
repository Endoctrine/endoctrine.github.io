<template>
  <div class="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
    <!-- 头部导航 -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10">
      <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <router-link
          to="/"
          class="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          返回
        </router-link>

        <h1 class="text-lg font-light tracking-wide">截码战</h1>

        <button
          @click="showRules = true"
          class="text-sm opacity-60 hover:opacity-100 transition-opacity"
        >
          规则
        </button>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="pt-20 pb-8 px-4">
      <div class="max-w-2xl mx-auto">

        <!-- 当前状态提示 -->
        <div class="text-center mb-6">
          <span class="inline-block px-4 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-900">
            {{ getPhaseText() }}
          </span>
        </div>

        <!-- 阶段1: 设置阶段 - 选择队伍和抽词 -->
        <div v-if="phase === 'setup'" class="animate-fade-in">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-light mb-2">准备开始</h2>
            <p class="opacity-60 text-sm">每个队员用手机打开此页面</p>
          </div>

          <!-- 队伍选择 -->
          <div class="flex justify-center gap-4 mb-8">
            <button
              @click="selectTeam('A')"
              :disabled="isSelecting"
              class="px-8 py-4 rounded-lg border-2 transition-all duration-300 disabled:opacity-50"
              :class="selectedTeam === 'A'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white'"
            >
              <div class="text-2xl mb-1">🔵</div>
              <div class="font-medium">加入 A 队</div>
            </button>
            <button
              @click="selectTeam('B')"
              :disabled="isSelecting"
              class="px-8 py-4 rounded-lg border-2 transition-all duration-300 disabled:opacity-50"
              :class="selectedTeam === 'B'
                ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                : 'border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white'"
            >
              <div class="text-2xl mb-1">🔴</div>
              <div class="font-medium">加入 B 队</div>
            </button>
          </div>

          <!-- 抽词按钮（仅显示给队长/加密人） -->
          <div v-if="selectedTeam" class="text-center">
            <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
              <p class="text-sm text-amber-700 dark:text-amber-300">
                💡 请队长点击下方按钮抽取词汇，并妥善保管不要让对手看到
              </p>
            </div>

            <button
              @click="drawWords"
              :disabled="isDrawing || words.length > 0"
              class="group relative px-8 py-4 rounded-lg border-2 border-black dark:border-white overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              <span class="relative z-10 text-lg font-light">
                {{ isDrawing ? '抽取中...' : (words.length > 0 ? '✓ 已抽取' : '🎲 抽取词汇') }}
              </span>
              <div class="absolute inset-0 bg-black dark:bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          <!-- 已抽取的词汇 -->
          <div v-if="words.length > 0" class="mt-6">
            <h3 class="text-sm opacity-60 mb-3 text-center">
              {{ selectedTeam }}队词汇（仅 {{ selectedTeam }}队可见）
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="(word, index) in words"
                :key="index"
                class="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-center font-medium border border-black/10 dark:border-white/10"
              >
                <div class="text-xs opacity-60 mb-1">#{{ index + 1 }}</div>
                {{ word }}
              </div>
            </div>

            <div class="flex justify-center gap-4 mt-6">
              <button
                @click="confirmWords"
                class="px-6 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-80 transition-all duration-300"
              >
                ✓ 我已记录完成
              </button>
              <button
                @click="redrawWords"
                class="px-6 py-2 rounded-lg border border-black/30 dark:border-white/30 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
              >
                重新抽取
              </button>
            </div>
          </div>
        </div>

        <!-- 阶段2: 加密阶段 - 生成密码 -->
        <div v-else-if="phase === 'encryption'" class="animate-fade-in">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-light mb-2">生成密码</h2>
            <p class="opacity-60 text-sm">{{ selectedTeam }}队的加密人请操作</p>
          </div>

          <!-- 防作弊提示 -->
          <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <div class="text-sm text-red-700 dark:text-red-300">
                加密人请注意：密码生成后请立即记录到纸上，<strong>绝对不要告诉任何人！</strong>
              </div>
            </div>
          </div>

          <div class="flex justify-center mb-8">
            <button
              @click="generatePasswordAction"
              :disabled="isGenerating || password.length > 0"
              class="group relative px-8 py-4 rounded-lg border-2 border-black dark:border-white overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              <span class="relative z-10 text-lg font-light">
                {{ isGenerating ? '生成中...' : (password.length > 0 ? '✓ 已生成' : '🔐 生成密码') }}
              </span>
              <div class="absolute inset-0 bg-black dark:bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          <!-- 密码已生成提示 -->
          <div v-if="password.length > 0" class="text-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>密码已生成并隐藏，请加密人记录保密</span>
            </div>

            <button
              @click="proceedToDescription"
              class="px-8 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-80 transition-all duration-300"
            >
              ✓ 密码已记录保密，开始描述
            </button>
          </div>
        </div>

        <!-- 阶段3: 描述阶段 -->
        <div v-else-if="phase === 'description'" class="animate-fade-in">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-light mb-2">描述词汇</h2>
            <p class="opacity-60 text-sm">加密人按密码顺序 {{ password.join(' → ') }} 描述词汇</p>
          </div>

          <!-- 当前要描述的词汇 -->
          <div class="text-center mb-8">
            <div class="text-sm opacity-60 mb-2">请描述词汇 #{{ currentDescriptionIndex + 1 }}</div>
            <div class="inline-block px-8 py-4 rounded-lg border-2 border-black dark:border-white text-xl font-medium">
              {{ words[password[currentDescriptionIndex] - 1] }}
            </div>
          </div>

          <!-- 描述进度 -->
          <div class="flex justify-center gap-2 mb-8">
            <div
              v-for="(num, index) in password"
              :key="index"
              class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300"
              :class="index <= currentDescriptionIndex
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-black/20 dark:bg-white/20'"
            >
              {{ num }}
            </div>
          </div>

          <div class="flex justify-center gap-4">
            <button
              v-if="currentDescriptionIndex < password.length - 1"
              @click="nextDescription"
              class="px-6 py-2 rounded-lg border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
            >
              下一个
            </button>
            <button
              v-else
              @click="proceedToGuessing"
              class="px-6 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-80 transition-all duration-300"
            >
              描述完成，开始猜测
            </button>
          </div>
        </div>

        <!-- 阶段4: 猜测阶段 -->
        <div v-else-if="phase === 'guessing'" class="animate-fade-in">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-light mb-2">猜测密码</h2>
            <p class="opacity-60 text-sm">
              {{ selectedTeam === 'A' ? 'B' : 'A' }}队正在猜测...<br>
              请{{ selectedTeam }}队说出你们推断的密码
            </p>
          </div>

          <!-- 猜测输入 -->
          <div class="max-w-xs mx-auto mb-8">
            <label class="block text-sm opacity-60 mb-2 text-center">
              输入你们猜测的3个数字（用空格分隔）
            </label>
            <input
              v-model="guessInput"
              type="text"
              placeholder="例如: 1 2 3"
              class="w-full px-4 py-3 rounded-lg border-2 border-black/20 dark:border-white/20 focus:border-black dark:focus:border-white focus:outline-none text-center text-lg"
              @keyup.enter="submitGuess"
            />
          </div>

          <div class="flex justify-center">
            <button
              @click="submitGuess"
              :disabled="!isValidGuess"
              class="px-8 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium disabled:opacity-50 transition-all duration-300"
            >
              提交猜测
            </button>
          </div>

          <!-- 提示 -->
          <div class="text-center mt-6">
            <p class="text-sm opacity-60">
              等待 {{ selectedTeam === 'A' ? 'B' : 'A' }}队也提交猜测后，加密人会公布真实密码
            </p>
          </div>
        </div>

        <!-- 阶段5: 公布结果 -->
        <div v-else-if="phase === 'reveal'" class="animate-fade-in">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-light mb-2">公布结果</h2>
            <p class="opacity-60 text-sm">加密人公布真实密码</p>
          </div>

          <!-- 真实密码（加密人视角） -->
          <div v-if="isEncryptor" class="text-center mb-8">
            <div class="text-sm opacity-60 mb-3">真实密码</div>
            <div class="inline-flex items-center gap-3 px-6 py-4 rounded-lg bg-black dark:bg-white text-white dark:text-black">
              <span
                v-for="(num, index) in password"
                :key="index"
                class="text-2xl font-bold"
              >
                {{ num }}
                <span v-if="index < password.length - 1" class="mx-2 opacity-50">→</span>
              </span>
            </div>
          </div>

          <!-- 猜测对比 -->
          <div class="grid gap-4 mb-8">
            <div class="p-4 rounded-lg border-2 text-center">
              <div class="text-sm opacity-60 mb-1">{{ selectedTeam }}队猜测</div>
              <div class="text-xl font-medium">{{ ownGuess?.join(' → ') || '未提交' }}</div>
            </div>
            <div class="p-4 rounded-lg border-2 text-center opacity-60">
              <div class="text-sm opacity-60 mb-1">{{ selectedTeam === 'A' ? 'B' : 'A' }}队猜测</div>
              <div class="text-xl font-medium">{{ opponentGuess ? opponentGuess.join(' → ') : '等待中...' }}</div>
            </div>
          </div>

          <div class="flex justify-center">
            <button
              @click="calculateResult"
              class="px-8 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-80 transition-all duration-300"
            >
              {{ isEncryptor ? '公布真实密码并计算得分' : '查看得分' }}
            </button>
          </div>
        </div>

        <!-- 阶段6: 结果阶段 -->
        <div v-else-if="phase === 'result'" class="animate-fade-in">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-light mb-2">本轮结果</h2>
            <p class="opacity-60 text-sm">
              真实密码：{{ password.join(' → ') }}
            </p>
          </div>

          <!-- 得分详情 -->
          <div class="space-y-4 mb-8">
            <div
              class="flex items-center justify-between p-4 rounded-lg"
              :class="selectedTeam === 'A' ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-red-50 dark:bg-red-900/20'"
            >
              <span class="opacity-60">{{ selectedTeam }}队得分</span>
              <span class="text-xl font-bold">+{{ roundScore }}</span>
            </div>
            <div
              class="flex items-center justify-between p-4 rounded-lg"
              :class="selectedTeam === 'A' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-blue-50 dark:bg-blue-900/20'"
            >
              <span class="opacity-60">{{ selectedTeam === 'A' ? 'B' : 'A' }}队得分</span>
              <span class="text-xl font-bold">+{{ opponentRoundScore }}</span>
            </div>
          </div>

          <!-- 得分说明 -->
          <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-6 text-sm">
            <h3 class="font-medium mb-2">得分规则</h3>
            <ul class="space-y-1 opacity-80">
              <li>• 加密队猜错 → 对手 +1分</li>
              <li>• 截码队猜对 → 加密队再给对手 +1分</li>
            </ul>
          </div>

          <div class="flex justify-center gap-4">
            <button
              @click="startNewRound"
              class="px-6 py-2 rounded-lg border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
            >
              下一轮
            </button>
            <button
              @click="resetGame"
              class="px-6 py-2 rounded-lg border border-black/30 dark:border-white/30 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
            >
              重新开始
            </button>
          </div>
        </div>

        <!-- 规则说明 -->
        <div class="mt-8 pt-8 border-t border-black/10 dark:border-white/10">
          <button
            @click="showRules = !showRules"
            class="w-full text-sm opacity-60 hover:opacity-100 transition-opacity text-left flex items-center justify-between"
          >
            <span>游戏规则</span>
            <span>{{ showRules ? '收起' : '展开' }}</span>
          </button>

          <div v-if="showRules" class="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-sm space-y-3">
            <div>
              <h4 class="font-medium mb-1">游戏进程一</h4>
              <p class="opacity-80">每队抽取4个词汇，记录到纸上，仅供己方查看。</p>
            </div>
            <div>
              <h4 class="font-medium mb-1">游戏进程二</h4>
              <ul class="opacity-80 space-y-1 ml-4">
                <li>1. 加密人随机抽取3个数字作为密码</li>
                <li>2. 按密码顺序描述对应词汇</li>
                <li>3. 两队分别猜测密码</li>
                <li>4. 公布真实密码并计分</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium mb-1">得分规则</h4>
              <p class="opacity-80">加密队猜错 → 对手+1分；截码队猜对 → 加密队再给对手+1分。</p>
            </div>
            <div>
              <h4 class="font-medium mb-1">胜利条件</h4>
              <p class="opacity-80">率先获得2分的队伍获胜。</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { drawRandomWords, generatePassword as generateRandomPassword } from './wordBank.js';

// 路由
const router = useRouter();

// 返回上一页
const goBack = () => {
  router.back();
};

// 游戏状态
const phase = ref('setup'); // setup, encryption, description, guessing, reveal, result
const selectedTeam = ref(''); // 'A' or 'B'
const words = ref([]);
const password = ref([]);
const currentDescriptionIndex = ref(0);
const showRules = ref(false);

// 猜测相关
const guessInput = ref('');
const ownGuess = ref(null);
const opponentGuess = ref(null);

// 得分相关
const scores = ref({ A: 0, B: 0 });
const roundScore = ref(0);
const opponentRoundScore = ref(0);

// 动画状态
const isSelecting = ref(false);
const isDrawing = ref(false);
const isGenerating = ref(false);

// 是否是加密人（每队各自独立）
const isEncryptor = computed(() => {
  return true; // 简化逻辑：每个队伍都执行完整的加密-猜测流程
});

// 验证猜测格式
const isValidGuess = computed(() => {
  const parts = guessInput.value.trim().split(/\s+/);
  if (parts.length !== 3) return false;
  return parts.every(p => {
    const n = parseInt(p);
    return !isNaN(n) && n >= 1 && n <= 4;
  });
});

// 获取阶段文本
const getPhaseText = () => {
  const texts = {
    setup: selectedTeam.value ? `${selectedTeam}队 - 准备阶段` : '选择队伍',
    encryption: `${selectedTeam.value}队 - 加密阶段`,
    description: `${selectedTeam.value}队 - 描述阶段`,
    guessing: selectedTeam.value ? `${selectedTeam}队 - 猜测阶段` : '猜测阶段',
    reveal: `${selectedTeam.value}队 - 公布结果`,
    result: `${selectedTeam.value}队 - 本轮结果`
  };
  return texts[phase.value] || '';
};

// 选择队伍
const selectTeam = async (team) => {
  isSelecting.value = true;
  selectedTeam.value = team;

  // 重置状态
  words.value = [];
  password.value = [];
  currentDescriptionIndex.value = 0;
  ownGuess.value = null;
  opponentGuess.value = null;
  guessInput.value = '';
  roundScore.value = 0;
  opponentRoundScore.value = 0;

  await new Promise(resolve => setTimeout(resolve, 300));
  isSelecting.value = false;
};

// 抽取词汇
const drawWords = async () => {
  isDrawing.value = true;
  await new Promise(resolve => setTimeout(resolve, 500));
  words.value = drawRandomWords(4);
  isDrawing.value = false;
};

// 重新抽取
const redrawWords = () => {
  words.value = [];
  password.value = [];
};

// 确认词汇，进入加密阶段
const confirmWords = () => {
  phase.value = 'encryption';
};

// 生成密码
const generatePasswordAction = async () => {
  isGenerating.value = true;
  await new Promise(resolve => setTimeout(resolve, 500));
  password.value = generateRandomPassword(3);
  isGenerating.value = false;
};

// 进入描述阶段
const proceedToDescription = () => {
  currentDescriptionIndex.value = 0;
  phase.value = 'description';
};

// 下一个描述
const nextDescription = () => {
  if (currentDescriptionIndex.value < password.value.length - 1) {
    currentDescriptionIndex.value++;
  } else {
    phase.value = 'guessing';
  }
};

// 提交猜测
const submitGuess = () => {
  if (!isValidGuess.value) {
    alert('请输入3个1-4之间的数字，用空格分隔');
    return;
  }

  const parts = guessInput.value.trim().split(/\s+/).map(p => parseInt(p));
  ownGuess.value = parts;

  // 进入公布阶段
  phase.value = 'reveal';
};

// 计算得分
const calculateResult = () => {
  const isOwnGuessCorrect = JSON.stringify(ownGuess.value) === JSON.stringify(password.value);
  const isOpponentCorrect = opponentGuess.value &&
    JSON.stringify(opponentGuess.value) === JSON.stringify(password.value);

  // 本队得分（作为截码队）
  if (isOwnGuessCorrect) {
    roundScore.value += 1;
  }

  // 对手得分（作为加密队）
  if (isOpponentCorrect) {
    opponentRoundScore.value += 1;
  }

  // 加密队猜错给截码队加分
  // 这里简化：假设对方也猜错了
  if (!isOpponentCorrect) {
    roundScore.value += 1;
  }

  // 截码队猜错给加密队加分
  if (!isOwnGuessCorrect) {
    opponentRoundScore.value += 1;
  }

  // 更新总分
  scores.value[selectedTeam.value] += roundScore.value;
  const opponent = selectedTeam.value === 'A' ? 'B' : 'A';
  scores.value[opponent] += opponentRoundScore.value;

  phase.value = 'result';
};

// 开始新的一轮
const startNewRound = () => {
  // 重置当前轮状态，保留词汇
  password.value = [];
  currentDescriptionIndex.value = 0;
  ownGuess.value = null;
  opponentGuess.value = null;
  guessInput.value = '';
  roundScore.value = 0;
  opponentRoundScore.value = 0;

  phase.value = 'encryption';
};

// 重置游戏
const resetGame = () => {
  phase.value = 'setup';
  selectedTeam.value = '';
  words.value = [];
  password.value = [];
  currentDescriptionIndex.value = 0;
  ownGuess.value = null;
  opponentGuess.value = null;
  guessInput.value = '';
  roundScore.value = 0;
  opponentRoundScore.value = 0;
  scores.value = { A: 0, B: 0 };
};
</script>

<style scoped>
/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

/* 按钮悬停效果 */
button:active {
  transform: scale(0.98);
}

/* 响应式调整 */
@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .text-3xl {
    font-size: 2rem;
  }

  .text-2xl {
    font-size: 1.5rem;
  }
}
</style>
