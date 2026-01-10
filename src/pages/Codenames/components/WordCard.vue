<template>
  <div 
    class="word-card relative overflow-hidden rounded-lg border-2 transition-all duration-300 cursor-pointer"
    :class="cardClasses"
    @click="$emit('click')"
  >
    <!-- 卡片内容 -->
    <div class="p-4 text-center">
      <!-- 编号标签 -->
      <div 
        v-if="showNumber && number !== null"
        class="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
        :class="numberClasses"
      >
        {{ number }}
      </div>

      <!-- 词汇文本 -->
      <span 
        class="text-lg font-medium"
        :class="textClasses"
      >
        {{ word }}
      </span>

      <!-- 状态图标 -->
      <div 
        v-if="status && status !== 'default'"
        class="absolute top-2 right-2"
      >
        <span 
          class="text-sm"
          :class="statusIconClasses"
        >
          {{ statusIcon }}
        </span>
      </div>
    </div>

    <!-- 翻转效果（可选） -->
    <div 
      v-if="flippable && isFlipped"
      class="absolute inset-0 bg-black dark:bg-white flex items-center justify-center"
    >
      <span class="text-white dark:text-black text-sm">???</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Props 定义
const props = defineProps({
  // 词汇内容
  word: {
    type: String,
    required: true
  },
  
  // 编号（1-4）
  number: {
    type: Number,
    default: null,
    validator: (value) => value === null || (value >= 1 && value <= 4)
  },
  
  // 是否显示编号
  showNumber: {
    type: Boolean,
    default: true
  },
  
  // 卡片状态
  status: {
    type: String,
    default: 'default', // default, correct, wrong, hidden
    validator: (value) => ['default', 'correct', 'wrong', 'hidden'].includes(value)
  },
  
  // 是否可翻转
  flippable: {
    type: Boolean,
    default: false
  },
  
  // 是否已翻转
  isFlipped: {
    type: Boolean,
    default: false
  },
  
  // 是否是当前队伍的词汇
  isOwnTeam: {
    type: Boolean,
    default: false
  }
});

// 计算属性
const cardClasses = computed(() => {
  const baseClasses = 'border-black/20 dark:border-white/20';
  
  if (props.status === 'correct') {
    return 'border-green-500 bg-green-50 dark:bg-green-900/20';
  }
  
  if (props.status === 'wrong') {
    return 'border-red-500 bg-red-50 dark:bg-red-900/20';
  }
  
  if (props.status === 'hidden') {
    return 'border-dashed border-black/30 dark:border-white/30 bg-gray-50 dark:bg-gray-900';
  }
  
  // 默认状态
  if (props.isOwnTeam) {
    return 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700';
  }
  
  return baseClasses;
});

const numberClasses = computed(() => {
  if (props.status === 'correct') {
    return 'bg-green-500 text-white';
  }
  if (props.status === 'wrong') {
    return 'bg-red-500 text-white';
  }
  return 'bg-black/10 dark:bg-white/10';
});

const textClasses = computed(() => {
  if (props.status === 'correct') {
    return 'text-green-700 dark:text-green-400';
  }
  if (props.status === 'wrong') {
    return 'text-red-700 dark:text-red-400';
  }
  return '';
});

const statusIcon = computed(() => {
  const icons = {
    correct: '✓',
    wrong: '✗',
    hidden: '👁'
  };
  return icons[props.status] || '';
});

const statusIconClasses = computed(() => {
  if (props.status === 'correct') {
    return 'text-green-500';
  }
  if (props.status === 'wrong') {
    return 'text-red-500';
  }
  return 'opacity-50';
});

// 事件
defineEmits(['click']);
</script>

<style scoped>
.word-card {
  user-select: none;
}

.word-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.word-card:active {
  transform: translateY(0);
  transform: scale(0.98);
}

/* 深色模式下的悬停效果 */
@media (prefers-color-scheme: dark) {
  .word-card:hover {
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
  }
}

/* 响应式调整 */
@media (max-width: 640px) {
  .word-card {
    padding: 0.75rem;
  }
  
  .word-card .text-lg {
    font-size: 1rem;
  }
}
</style>