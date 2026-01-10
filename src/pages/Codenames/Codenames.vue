<template>
  <div class="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
    <!-- 头部导航 -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10">
      <div class="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <router-link
          to="/"
          class="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          返回
        </router-link>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="pt-20 pb-8 px-4">
      <div class="max-w-md mx-auto">

        <!-- 阶段1: 抽词阶段 -->
        <div v-if="phase === 'words'" class="animate-fade-in">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-light mb-2">抽取词汇</h2>
            <p class="opacity-60 text-sm">为你的队伍抽取4个随机词汇</p>
          </div>

          <!-- 抽词按钮 -->
          <div class="flex justify-center mb-8">
            <button
              @click="drawWords"
              :disabled="isDrawing"
              class="group relative px-8 py-4 rounded-lg border-2 border-black dark:border-white overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              <span class="relative z-10 text-lg font-light">
                {{ isDrawing ? '抽取中...' : '🎲 抽取词汇' }}
              </span>
              <div class="absolute inset-0 bg-black dark:bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          <!-- 已抽取的词汇 -->
          <div v-if="words.length > 0" class="mb-6">
            <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-4">
              <p class="text-sm text-amber-700 dark:text-amber-300">
                ⚠️ 请将下方词汇记录到纸上，妥善保管不要让对手看到
              </p>
            </div>

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

        <!-- 阶段2: roll密码阶段 -->
        <div v-else-if="phase === 'password'" class="animate-fade-in">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-light mb-2">生成密码</h2>
            <p class="opacity-60 text-sm">随机抽取3个数字作为密码</p>
          </div>

          <!-- roll密码按钮 -->
          <div class="flex justify-center mb-8">
            <button
              @click="rollPassword"
              :disabled="isGenerating || password.length > 0"
              class="group relative px-8 py-4 rounded-lg border-2 border-black dark:border-white overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              <span class="relative z-10 text-lg font-light">
                {{ isGenerating ? '生成中...' : (password.length > 0 ? '✓ 已生成' : '🎲 生成密码') }}
              </span>
              <div class="absolute inset-0 bg-black dark:bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          <!-- 显示密码 -->
          <div v-if="password.length > 0" class="text-center">
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p class="text-sm text-red-700 dark:text-red-300">
                🔒 请加密人立即将密码记录到纸上，<strong>绝对不要告诉任何人！</strong>
              </p>
            </div>

            <div class="mb-6">
              <div class="text-sm opacity-60 mb-3">密码</div>
              <div class="inline-flex items-center gap-2 px-6 py-4 rounded-lg bg-black dark:bg-white text-white dark:text-black">
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

            <div class="flex justify-center gap-4">
              <button
                @click="confirmPassword"
                class="px-6 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-80 transition-all duration-300"
              >
                ✓ 记下来了
              </button>
            </div>
          </div>
        </div>

        <!-- 密码历史 -->
        <div class="mt-8 pt-8 border-t border-black/10 dark:border-white/10">
          <button
            @click="showHistory = !showHistory"
            class="w-full text-sm opacity-60 hover:opacity-100 transition-opacity flex items-center justify-between"
          >
            <span>密码历史</span>
            <span>{{ showHistory ? '收起' : '展开' }} ({{ passwordHistory.length }})</span>
          </button>

          <div v-if="showHistory && passwordHistory.length > 0" class="mt-4 space-y-2">
            <div
              v-for="(entry, index) in passwordHistory"
              :key="index"
              class="p-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-center text-sm"
            >
              {{ entry.password.join(' → ') }}
            </div>
          </div>
          <div v-else-if="passwordHistory.length === 0" class="mt-4 text-center opacity-40 text-sm">
            暂无记录
          </div>
        </div>

        <!-- 规则说明 -->
        <div class="mt-6 pt-6 border-t border-black/10 dark:border-white/10">
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
import { ref } from 'vue';
import { drawRandomWords, generatePassword as generateRandomPassword } from './wordBank.js';

// 游戏状态
const phase = ref('words'); // words, password
const words = ref([]);
const password = ref([]);
const passwordHistory = ref([]);
const showHistory = ref(false);
const showRules = ref(false);

// 动画状态
const isDrawing = ref(false);
const isGenerating = ref(false);

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
};

// 确认词汇，进入密码阶段
const confirmWords = () => {
  phase.value = 'password';
};

// 生成密码
const rollPassword = async () => {
  isGenerating.value = true;
  await new Promise(resolve => setTimeout(resolve, 500));
  password.value = generateRandomPassword(3);

  // 添加到历史记录
  passwordHistory.value.push({
    password: [...password.value],
    timestamp: new Date().toISOString()
  });

  isGenerating.value = false;
};

// 确认密码，记录后重新roll
const confirmPassword = () => {
  // 重置密码，开始新一轮
  password.value = [];
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
