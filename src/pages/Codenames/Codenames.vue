<template>
  <div class="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
    <!-- 头部导航 -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10">
      <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          @click="goBack"
          class="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          返回
        </button>
        
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
      <div class="max-w-4xl mx-auto">
        
        <!-- 得分板 -->
        <div class="flex justify-center gap-8 mb-8">
          <div class="text-center">
            <div class="text-sm opacity-60 mb-1">A队</div>
            <div class="text-3xl font-light">{{ scores.team_a }}</div>
          </div>
          <div class="text-sm opacity-40 self-center">:</div>
          <div class="text-center">
            <div class="text-sm opacity-60 mb-1">B队</div>
            <div class="text-3xl font-light">{{ scores.team_b }}</div>
          </div>
        </div>

        <!-- 当前队伍指示 -->
        <div class="text-center mb-6">
          <span 
            class="inline-block px-4 py-1 rounded-full text-sm"
            :class="currentTeam === 'team_a' 
              ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' 
              : 'bg-red-500/20 text-red-600 dark:text-red-400'"
          >
            {{ currentTeam === 'team_a' ? 'A队' : 'B队' }} {{ getPhaseText() }}
          </span>
        </div>

        <!-- 阶段1: 准备阶段 - 抽取词汇 -->
        <div v-if="phase === 'setup'" class="animate-fade-in">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-light mb-2">抽取词汇</h2>
            <p class="opacity-60 text-sm">为 {{ currentTeam === 'team_a' ? 'A队' : 'B队' }} 抽取4个随机词汇</p>
          </div>

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

          <!-- 已抽取的词汇预览 -->
          <div v-if="currentTeamWords.length > 0" class="mb-6">
            <h3 class="text-sm opacity-60 mb-3 text-center">已抽取的词汇（仅供 {{ currentTeam === 'team_a' ? 'A队' : 'B队' }} 查看）</h3>
            <div class="grid grid-cols-4 gap-3 max-w-md mx-auto">
              <div
                v-for="(word, index) in currentTeamWords"
                :key="index"
                class="p-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-center text-sm font-medium border border-black/10 dark:border-white/10"
              >
                {{ word }}
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div v-if="currentTeamWords.length > 0" class="flex justify-center gap-4">
            <button
              @click="confirmWords"
              class="px-6 py-2 rounded-lg border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
            >
              ✓ 确认并继续
            </button>
            <button
              @click="redrawWords"
              class="px-6 py-2 rounded-lg border border-black/30 dark:border-white/30 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
            >
              重新抽取
            </button>
          </div>
        </div>

        <!-- 阶段2: 词汇确认提示 -->
        <div v-else-if="phase === 'word_confirmation'" class="animate-fade-in">
          <div class="text-center mb-8">
            <div class="text-6xl mb-4">📝</div>
            <h2 class="text-2xl font-light mb-2">记录词汇</h2>
            <p class="opacity-60 text-sm">请 {{ currentTeam === 'team_a' ? 'A队' : 'B队' }} 完成以下步骤</p>
          </div>

          <!-- 防作弊提示 -->
          <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <div>
                <h3 class="font-medium text-amber-800 dark:text-amber-200 mb-2">⚠️ 防作弊提示</h3>
                <ul class="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>1. 请将下方词汇记录到纸上</li>
                  <li>2. 妥善保管，不要让对手看到</li>
                  <li>3. 确认记录完成后，点击"已记录"</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 词汇列表 -->
          <div class="grid grid-cols-4 gap-3 max-w-md mx-auto mb-8">
            <div
              v-for="(word, index) in currentTeamWords"
              :key="index"
              class="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-center font-medium border border-black/10 dark:border-white/10"
            >
              <div class="text-xs opacity-60 mb-1">{{ index + 1 }}</div>
              {{ word }}
            </div>
          </div>

          <div class="flex justify-center">
            <button
              @click="proceedToEncryption"
              class="px-8 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-80 transition-all duration-300"
            >
              ✓ 我已记录完成
            </button>
          </div>
        </div>

        <!-- 阶段3: 加密阶段 - 生成密码 -->
        <div v-else-if="phase === 'encryption'" class="animate-fade-in">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-light mb-2">生成密码</h2>
            <p class="opacity-60 text-sm">加密人随机抽取3个数字作为密码</p>
          </div>

          <div class="flex justify-center mb-8">
            <button
              @click="generatePassword"
              :disabled="isGenerating"
              class="group relative px-8 py-4 rounded-lg border-2 border-black dark:border-white overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              <span class="relative z-10 text-lg font-light">
                {{ isGenerating ? '生成中...' : '🔐 生成密码' }}
              </span>
              <div class="absolute inset-0 bg-black dark:bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          <!-- 生成结果预览（立即隐藏） -->
          <div v-if="generatedPassword.length > 0" class="text-center mb-6">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>密码已生成并隐藏</span>
            </div>
          </div>
        </div>

        <!-- 阶段4: 密码隐藏提示 -->
        <div v-else-if="phase === 'encryption_hidden'" class="animate-fade-in">
          <div class="text-center mb-8">
            <div class="text-6xl mb-4">🤫</div>
            <h2 class="text-2xl font-light mb-2">隐藏密码</h2>
            <p class="opacity-60 text-sm">加密人请完成以下步骤</p>
          </div>

          <!-- 防作弊提示 -->
          <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <div>
                <h3 class="font-medium text-red-800 dark:text-red-200 mb-2">🔒 绝密提示</h3>
                <ul class="text-sm text-red-700 dark:text-red-300 space-y-1">
                  <li>1. 密码已随机生成：{{ generatedPassword.join(' → ') }}</li>
                  <li>2. 请立即将密码记录到纸上</li>
                  <li>3. <strong>绝对不要告诉任何人！</strong></li>
                  <li>4. 记录完成后，点击"已记录"</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="flex justify-center">
            <button
              @click="proceedToDescription"
              class="px-8 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-80 transition-all duration-300"
            >
              ✓ 密码已记录保密
            </button>
          </div>
        </div>

        <!-- 阶段5: 描述阶段 -->
        <div v-else-if="phase === 'description'" class="animate-fade-in">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-light mb-2">描述词汇</h2>
            <p class="opacity-60 text-sm">加密人按密码顺序描述词汇</p>
          </div>

          <!-- 加密顺序提示 -->
          <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 mb-6">
            <h3 class="text-sm opacity-60 mb-3 text-center">加密顺序（按密码 {{ generatedPassword.join(' → ') }}）</h3>
            <div class="flex justify-center gap-4">
              <div
                v-for="(num, index) in generatedPassword"
                :key="index"
                class="w-16 h-16 rounded-lg bg-black dark:bg-white text-white dark:text-black flex flex-col items-center justify-center"
              >
                <span class="text-xs opacity-60">第{{ index + 1 }}个</span>
                <span class="text-xl font-bold">{{ num }}</span>
              </div>
            </div>
          </div>

          <!-- 当前要描述的词汇 -->
          <div class="text-center mb-8">
            <div class="text-sm opacity-60 mb-2">请描述词汇 #{{ currentDescriptionIndex + 1 }}</div>
            <div class="inline-block px-8 py-4 rounded-lg border-2 border-black dark:border-white text-xl font-medium">
              {{ currentTeamWords[generatedPassword[currentDescriptionIndex] - 1] }}
            </div>
          </div>

          <!-- 描述进度 -->
          <div class="flex justify-center gap-2 mb-8">
            <div
              v-for="(num, index) in generatedPassword"
              :key="index"
              class="w-3 h-3 rounded-full transition-all duration-300"
              :class="index <= currentDescriptionIndex 
                ? 'bg-black dark:bg-white' 
                : 'bg-black/20 dark:bg-white/20'"
            ></div>
          </div>

          <div class="flex justify-center gap-4">
            <button
              v-if="currentDescriptionIndex < generatedPassword.length - 1"
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

        <!-- 阶段6: 猜测阶段 -->
        <div v-else-if="phase === 'guessing'" class="animate-fade-in">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-light mb-2">猜测密码</h2>
            <p class="opacity-60 text-sm">两队依次说出自己推断的密码</p>
          </div>

          <!-- 猜测状态 -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div 
              class="p-4 rounded-lg border-2 transition-all duration-300"
              :class="guesses.team_a ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-black/20 dark:border-white/20'"
            >
              <div class="text-sm opacity-60 mb-2">A队猜测</div>
              <div v-if="guesses.team_a" class="text-lg font-medium">
                {{ guesses.team_a.join(' → ') }}
              </div>
              <button
                v-else
                @click="submitGuess('team_a')"
                class="w-full py-2 rounded bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors"
              >
                提交猜测
              </button>
            </div>
            <div 
              class="p-4 rounded-lg border-2 transition-all duration-300"
              :class="guesses.team_b ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-black/20 dark:border-white/20'"
            >
              <div class="text-sm opacity-60 mb-2">B队猜测</div>
              <div v-if="guesses.team_b" class="text-lg font-medium">
                {{ guesses.team_b.join(' → ') }}
              </div>
              <button
                v-else
                @click="submitGuess('team_b')"
                class="w-full py-2 rounded bg-red-500 text-white text-sm hover:bg-red-600 transition-colors"
              >
                提交猜测
              </button>
            </div>
          </div>

          <!-- 两队都提交后显示公布按钮 -->
          <div v-if="guesses.team_a && guesses.team_b" class="text-center">
            <button
              @click="proceedToReveal"
              class="px-8 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-80 transition-all duration-300"
            >
              公布真实密码
            </button>
          </div>
        </div>

        <!-- 阶段7: 公布结果 -->
        <div v-else-if="phase === 'reveal'" class="animate-fade-in">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-light mb-2">公布结果</h2>
            <p class="opacity-60 text-sm">加密人公布真实密码</p>
          </div>

          <!-- 真实密码 -->
          <div class="text-center mb-8">
            <div class="text-sm opacity-60 mb-3">真实密码</div>
            <div class="inline-flex items-center gap-3 px-6 py-4 rounded-lg bg-black dark:bg-white text-white dark:text-black">
              <span 
                v-for="(num, index) in generatedPassword" 
                :key="index"
                class="text-2xl font-bold"
              >
                {{ num }}
                <span v-if="index < generatedPassword.length - 1" class="mx-2 opacity-50">→</span>
              </span>
            </div>
          </div>

          <!-- 猜测对比 -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div 
              class="p-4 rounded-lg border-2"
              :class="guesses.team_a === generatedPassword 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                : 'border-red-500 bg-red-50 dark:bg-red-900/20'"
            >
              <div class="text-sm opacity-60 mb-1">A队猜测</div>
              <div class="text-lg font-medium">{{ guesses.team_a?.join(' → ') || '-' }}</div>
              <div v-if="guesses.team_a === generatedPassword" class="text-green-600 dark:text-green-400 text-sm mt-1">
                ✓ 正确
              </div>
              <div v-else class="text-red-600 dark:text-red-400 text-sm mt-1">
                ✗ 错误
              </div>
            </div>
            <div 
              class="p-4 rounded-lg border-2"
              :class="guesses.team_b === generatedPassword 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                : 'border-red-500 bg-red-50 dark:bg-red-900/20'"
            >
              <div class="text-sm opacity-60 mb-1">B队猜测</div>
              <div class="text-lg font-medium">{{ guesses.team_b?.join(' → ') || '-' }}</div>
              <div v-if="guesses.team_b === generatedPassword" class="text-green-600 dark:text-green-400 text-sm mt-1">
                ✓ 正确
              </div>
              <div v-else class="text-red-600 dark:text-red-400 text-sm mt-1">
                ✗ 错误
              </div>
            </div>
          </div>

          <div class="flex justify-center">
            <button
              @click="calculateResult"
              class="px-8 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-80 transition-all duration-300"
            >
              计算得分
            </button>
          </div>
        </div>

        <!-- 阶段8: 结果统计 -->
        <div v-else-if="phase === 'result'" class="animate-fade-in">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-light mb-2">本轮得分</h2>
            <p class="opacity-60 text-sm">根据规则计算本轮得分</p>
          </div>

          <!-- 得分说明 -->
          <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 mb-6">
            <h3 class="font-medium mb-4 text-center">得分规则</h3>
            <ul class="text-sm space-y-2 opacity-80">
              <li>• 加密队猜错：对手 +1分</li>
              <li>• 截码队猜对：加密队再给对手 +1分</li>
            </ul>
          </div>

          <!-- 得分详情 -->
          <div class="space-y-4 mb-8">
            <div class="flex items-center justify-between p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <span class="opacity-60">A队本轮得分</span>
              <span class="text-xl font-bold text-blue-600 dark:text-blue-400">+{{ roundScores.team_a }}</span>
            </div>
            <div class="flex items-center justify-between p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
              <span class="opacity-60">B队本轮得分</span>
              <span class="text-xl font-bold text-red-600 dark:text-red-400">+{{ roundScores.team_b }}</span>
            </div>
          </div>

          <div class="flex justify-center">
            <button
              @click="nextRound"
              class="px-8 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-80 transition-all duration-300"
            >
              {{ isGameOver ? '重新开始游戏' : '继续下一轮' }}
            </button>
          </div>
        </div>

        <!-- 密码历史记录 -->
        <div class="mt-8 pt-8 border-t border-black/10 dark:border-white/10">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm opacity-60">密码历史</h3>
            <button
              v-if="passwordHistory.length > 0"
              @click="showHistory = !showHistory"
              class="text-sm opacity-60 hover:opacity-100 transition-opacity"
            >
              {{ showHistory ? '隐藏' : '显示' }}
            </button>
          </div>

          <div v-if="showHistory && passwordHistory.length > 0" class="space-y-2">
            <div
              v-for="(entry, index) in passwordHistory"
              :key="index"
              class="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm"
            >
              <span class="opacity-60">{{ entry.team === 'team_a' ? 'A队' : 'B队' }}</span>
              <span class="font-medium">{{ entry.password.join(' → ') }}</span>
              <span class="opacity-40 text-xs">{{ formatTime(entry.timestamp) }}</span>
            </div>
          </div>
          <div v-else-if="passwordHistory.length === 0" class="text-center opacity-40 text-sm py-4">
            暂无记录
          </div>
        </div>

      </div>
    </main>

    <!-- 规则弹窗 -->
    <div
      v-if="showRules"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      @click.self="showRules = false"
    >
      <div class="max-w-lg w-full bg-white dark:bg-black rounded-lg border-2 border-black dark:border-white p-6 animate-scale-in max-h-[80vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-light">游戏规则</h3>
          <button
            @click="showRules = false"
            class="w-8 h-8 rounded-full border border-black/30 dark:border-white/30 flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
          >
            ✕
          </button>
        </div>

        <div class="space-y-4 text-sm leading-relaxed opacity-80">
          <div>
            <h4 class="font-medium mb-2">游戏进程一</h4>
            <p>每队从词库中随机抽取四个词汇，编号1~4，仅供己方查看（建议记录到纸上）。</p>
          </div>

          <div>
            <h4 class="font-medium mb-2">游戏进程二</h4>
            <ul class="space-y-2 ml-4">
              <li>1. 加密人从[1,2,3,4]中随机抽取3个数字作为密码</li>
              <li>2. 加密人按密码顺序依次描述对应词汇</li>
              <li>3. 两队分别猜测密码（只能各猜一次）</li>
              <li>4. 加密人公布真实密码</li>
            </ul>
          </div>

          <div>
            <h4 class="font-medium mb-2">得分规则</h4>
            <ul class="space-y-2 ml-4">
              <li>• 加密队猜错 → 对手 +1分</li>
              <li>• 截码队猜对 → 加密队再给对手 +1分</li>
            </ul>
          </div>

          <div>
            <h4 class="font-medium mb-2">胜利条件</h4>
            <p>率先获得2分的队伍获胜。</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { 
  wordBank, 
  getAllWords, 
  shuffleArray, 
  drawRandomWords, 
  generatePassword 
} from './wordBank.js';

// 定义自定义事件
const emit = defineEmits(['back']);

// 返回上一页
const goBack = () => {
  emit('back');
};

// 游戏状态
const phase = ref('setup'); // setup, word_confirmation, encryption, encryption_hidden, description, guessing, reveal, result
const currentTeam = ref('team_a'); // team_a, team_b
const scores = ref({ team_a: 0, team_b: 0 });
const currentTeamWords = ref([]);
const generatedPassword = ref([]);
const currentDescriptionIndex = ref(0);
const passwordHistory = ref([]);
const showHistory = ref(false);
const showRules = ref(false);

// 猜测状态
const guesses = ref({ team_a: null, team_b: null });
const roundScores = ref({ team_a: 0, team_b: 0 });
const isGameOver = ref(false);

// 动画状态
const isDrawing = ref(false);
const isGenerating = ref(false);

// 获取阶段文本
const getPhaseText = () => {
  const phaseTexts = {
    setup: '抽取词汇',
    word_confirmation: '记录中',
    encryption: '生成密码',
    encryption_hidden: '保密中',
    description: '描述中',
    guessing: '猜测中',
    reveal: '公布中',
    result: '结果'
  };
  return phaseTexts[phase.value] || '';
};

// 抽取词汇
const drawWords = async () => {
  isDrawing.value = true;
  
  // 添加加载动画效果
  await new Promise(resolve => setTimeout(resolve, 500));
  
  currentTeamWords.value = drawRandomWords(4);
  isDrawing.value = false;
};

// 重新抽取
const redrawWords = () => {
  currentTeamWords.value = [];
  generatedPassword.value = [];
};

// 确认词汇，进入记录阶段
const confirmWords = () => {
  phase.value = 'word_confirmation';
};

// 进入加密阶段
const proceedToEncryption = () => {
  phase.value = 'encryption';
};

// 生成密码
const generatePasswordAction = async () => {
  isGenerating.value = true;
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  generatedPassword.value = generatePassword(3);
  
  // 添加到历史记录
  passwordHistory.value.push({
    team: currentTeam.value,
    password: [...generatedPassword.value],
    timestamp: new Date().toISOString()
  });
  
  isGenerating.value = false;
  phase.value = 'encryption_hidden';
};

// 确认密码已隐藏
const proceedToDescription = () => {
  currentDescriptionIndex.value = 0;
  phase.value = 'description';
};

// 下一个描述
const nextDescription = () => {
  if (currentDescriptionIndex.value < generatedPassword.value.length - 1) {
    currentDescriptionIndex.value++;
  }
};

// 进入猜测阶段
const proceedToGuessing = () => {
  guesses.value = { team_a: null, team_b: null };
  phase.value = 'guessing';
};

// 提交猜测
const submitGuess = (team) => {
  // 弹出简单输入框获取猜测
  const input = prompt(`${team === 'team_a' ? 'A队' : 'B队'}，请输入你们猜测的密码（用空格分隔，如：1 2 3）`);
  
  if (input) {
    const guess = input.trim().split(/\s+/).map(num => parseInt(num)).filter(n => !isNaN(n));
    if (guess.length === 3) {
      guesses.value[team] = guess;
    } else {
      alert('请输入3个数字，用空格分隔');
    }
  }
};

// 进入公布阶段
const proceedToReveal = () => {
  phase.value = 'reveal';
};

// 计算得分
const calculateResult = () => {
  const password = generatedPassword.value;
  const encryptingTeam = currentTeam.value;
  const opposingTeam = encryptingTeam === 'team_a' ? 'team_b' : 'team_a';
  
  let teamAScore = 0;
  let teamBScore = 0;
  
  // 加密队猜错
  if (guesses.value[encryptingTeam] !== null && 
      JSON.stringify(guesses.value[encryptingTeam]) !== JSON.stringify(password)) {
    if (encryptingTeam === 'team_a') {
      teamBScore++;
    } else {
      teamAScore++;
    }
  }
  
  // 截码队猜对
  if (guesses.value[opposingTeam] !== null && 
      JSON.stringify(guesses.value[opposingTeam]) === JSON.stringify(password)) {
    if (opposingTeam === 'team_a') {
      teamAScore++;
    } else {
      teamBScore++;
    }
  }
  
  roundScores.value = { team_a: teamAScore, team_b: teamBScore };
  scores.value.team_a += teamAScore;
  scores.value.team_b += teamBScore;
  
  // 检查胜利条件
  if (scores.value.team_a >= 2 || scores.value.team_b >= 2) {
    isGameOver.value = true;
  }
  
  phase.value = 'result';
};

// 下一轮或重新开始
const nextRound = () => {
  if (isGameOver.value) {
    // 重新开始游戏
    resetGame();
  } else {
    // 切换队伍
    currentTeam.value = currentTeam.value === 'team_a' ? 'team_b' : 'team_a';
    
    // 重置状态
    generatedPassword.value = [];
    currentDescriptionIndex.value = 0;
    guesses.value = { team_a: null, team_b: null };
    roundScores.value = { team_a: 0, team_b: 0 };
    isGameOver.value = false;
    
    // 根据队伍决定阶段
    if (currentTeamWords.value.length === 0) {
      phase.value = 'setup';
    } else {
      phase.value = 'encryption';
    }
  }
};

// 重置游戏
const resetGame = () => {
  phase.value = 'setup';
  currentTeam.value = 'team_a';
  scores.value = { team_a: 0, team_b: 0 };
  currentTeamWords.value = [];
  generatedPassword.value = [];
  currentDescriptionIndex.value = 0;
  passwordHistory.value = [];
  guesses.value = { team_a: null, team_b: null };
  roundScores.value = { team_a: 0, team_b: 0 };
  isGameOver.value = false;
};

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
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

/* 缩放动画 */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn 0.3s ease-out forwards;
}

/* 按钮悬停效果 */
button:active {
  transform: scale(0.98);
}

/* 卡片悬停效果 */
.group:hover {
  transform: translateY(-2px);
}

/* 数字输入框样式 */
input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 128, 128, 0.5);
}

/* 响应式调整 */
@media (max-width: 640px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .flex-cols-4 {
    flex-direction: column;
  }
  
  .text-3xl {
    font-size: 2rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
  
  .text-xl {
    font-size: 1.125rem;
  }
}

/* 深色模式下的特殊样式 */
@media (prefers-color-scheme: dark) {
  .dark\:bg-gray-900 {
    background-color: rgb(23, 23, 23);
  }
  
  .dark\:bg-gray-800 {
    background-color: rgb(31, 31, 31);
  }
}

/* 胜利动画 */
@keyframes celebrate {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.celebrate {
  animation: celebrate 0.5s ease-in-out 3;
}

/* 密码数字样式 */
.password-digit {
  @apply w-12 h-12 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xl font-bold;
}

/* 词汇卡片样式 */
.word-card {
  @apply p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-center font-medium border border-black/10 dark:border-white/10 transition-all duration-300;
}

.word-card:hover {
  @apply shadow-lg transform -translate-y-1;
}

/* 猜测输入框样式 */
.guess-input {
  @apply w-full px-4 py-2 rounded border-2 border-black/20 dark:border-white/20 focus:border-black dark:focus:border-white focus:outline-none transition-all duration-300 bg-transparent;
}
</style>
