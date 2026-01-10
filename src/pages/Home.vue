<template>
  <div class="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
    <!-- 主页面 -->
    <div v-if="!showList" class="min-h-screen flex flex-col items-center justify-center px-4">
      <!-- 标题 -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-light mb-12 text-center tracking-tight transition-all duration-500 animate-fade-in">
        吟游者的个人博客
      </h1>

      <!-- 跳转按钮 -->
      <button
        @click="goToList"
        class="w-16 h-16 rounded-full border-2 border-black dark:border-white flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 group animate-fade-in-up cursor-pointer"
        aria-label="进入列表"
      >
        <svg
          class="w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- 列表页面 -->
    <div v-if="showList" class="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <!-- 返回按钮 -->
      <button
        @click="goHome"
        class="absolute top-8 left-8 w-10 h-10 rounded-full border-2 border-black dark:border-white flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 cursor-pointer"
        aria-label="返回主页"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <!-- 列表容器 -->
      <div class="w-full max-w-2xl space-y-4 animate-fade-in-up">
        <h2 class="text-2xl font-light mb-8 text-center">下一步</h2>

        <!-- 列表项 - 关于 -->
        <div
          class="group border-b border-black/20 dark:border-white/20 pb-4 cursor-pointer transition-all duration-300"
          @click="goToAbout"
        >
          <div class="flex items-center justify-between group-hover:font-bold transition-all duration-300">
            <span class="text-xl font-light">关于</span>
            <svg class="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>

        <!-- 列表项 - 截码战 -->
        <div
          class="group border-b border-black/20 dark:border-white/20 pb-4 cursor-pointer transition-all duration-300"
          @click="goToCodenames"
        >
          <div class="flex items-center justify-between group-hover:font-bold transition-all duration-300">
            <span class="text-xl font-light">截码战</span>
            <svg class="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showList = ref(false);

// 跳转到列表
const goToList = () => {
  showList.value = true;
};

// 返回主页
const goHome = () => {
  showList.value = false;
};

// 跳转到关于页
const goToAbout = () => {
  router.push('/about');
};

// 跳转到截码战
const goToCodenames = () => {
  router.push('/codenames');
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
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeIn 0.6s ease-out 0.1s forwards;
  opacity: 0;
}

/* 悬停效果增强 */
button:active {
  transform: scale(0.95);
}

/* 响应式调整 */
@media (max-width: 640px) {
  .animate-fade-in-up {
    animation-delay: 0s;
  }
}
</style>
