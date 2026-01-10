<template>
  <div class="team-indicator">
    <!-- 队伍标识 -->
    <div 
      class="team-badge"
      :class="teamClasses"
    >
      <div class="team-icon">
        {{ teamIcon }}
      </div>
      <span class="team-name">{{ teamName }}</span>
    </div>

    <!-- 得分显示 -->
    <div class="score-display">
      <div class="score-label">得分</div>
      <div class="score-value" :class="scoreClasses">
        {{ score }}
      </div>
    </div>

    <!-- 当前队伍指示 -->
    <div 
      v-if="isCurrent"
      class="current-indicator"
    >
      <span class="pulse-dot"></span>
      <span class="current-text">{{ isEncrypting ? '加密方' : '截码方' }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  // 队伍标识：'team_a' 或 'team_b'
  team: {
    type: String,
    required: true,
    validator: (value) => ['team_a', 'team_b'].includes(value)
  },
  
  // 当前得分
  score: {
    type: Number,
    default: 0
  },
  
  // 是否是当前行动队伍
  isCurrent: {
    type: Boolean,
    default: false
  },
  
  // 是否是加密方
  isEncrypting: {
    type: Boolean,
    default: false
  }
});

// 计算属性
const teamName = computed(() => {
  return props.team === 'team_a' ? 'A队' : 'B队';
});

const teamIcon = computed(() => {
  return props.team === 'team_a' ? '🔵' : '🔴';
});

const teamClasses = computed(() => {
  return props.team === 'team_a' 
    ? 'team-a' 
    : 'team-b';
});

const scoreClasses = computed(() => {
  return props.team === 'team_a'
    ? 'score-blue'
    : 'score-red';
});
</script>

<style scoped>
.team-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.team-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.team-a {
  background: rgba(59, 130, 246, 0.1);
  border: 2px solid rgba(59, 130, 246, 0.3);
}

.team-b {
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid rgba(239, 68, 68, 0.3);
}

.team-icon {
  font-size: 1.25rem;
}

.team-name {
  font-weight: 500;
  font-size: 0.875rem;
}

.score-display {
  text-align: center;
}

.score-label {
  font-size: 0.75rem;
  opacity: 0.6;
  margin-bottom: 0.25rem;
}

.score-value {
  font-size: 2rem;
  font-weight: 300;
  line-height: 1;
}

.score-blue {
  color: rgb(59, 130, 246);
}

.score-red {
  color: rgb(239, 68, 68);
}

.current-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  opacity: 0.8;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .team-a {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.5);
  }
  
  .team-b {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.5);
  }
}

/* 响应式调整 */
@media (max-width: 640px) {
  .team-badge {
    padding: 0.375rem 0.75rem;
  }
  
  .score-value {
    font-size: 1.5rem;
  }
}
</style>