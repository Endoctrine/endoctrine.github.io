<template>
  <div id="app" class="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
    <!-- 主页面 -->
    <div v-if="currentPage === 'home'" class="min-h-screen flex flex-col items-center justify-center px-4">
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
    <div v-else class="min-h-screen flex flex-col items-center justify-center px-4 py-12">
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
      <div class="w-full max-w-2xl space-y-6 animate-fade-in-up">
        <h2 class="text-2xl font-light mb-8 text-center">选择页面</h2>

        <!-- 列表项 - 关于 -->
        <div 
          class="group border-2 border-black dark:border-white p-6 rounded-lg cursor-pointer hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
          @click="openPage('about')"
        >
          <div class="flex items-center justify-between">
            <span class="text-xl font-light">关于</span>
            <svg class="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>

        <!-- 列表项 - 截码战 -->
        <div 
          class="group border-2 border-black dark:border-white p-6 rounded-lg cursor-pointer hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 relative overflow-hidden"
          @click="openPage('codewar')"
        >
          <div class="flex items-center justify-between">
            <span class="text-xl font-light">截码战</span>
            <span class="text-sm opacity-60 ml-4">即将推出</span>
          </div>
        </div>
      </div>

      <!-- 模态框 - 关于页面 -->
      <div 
        v-if="showModal && currentModal === 'about'" 
        class="fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in z-50"
        @click.self="closeModal"
      >
        <div class="max-w-2xl w-full border-2 border-black dark:border-white rounded-lg p-8 relative animate-scale-in">
          <button 
            @click="closeModal" 
            class="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-black dark:border-white flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <h3 class="text-2xl font-light mb-6">关于</h3>
          
          <div class="space-y-6">
            <!-- GitHub 头像 -->
            <div class="flex items-center gap-4">
              <img 
                src="https://github.com/endoctrine.png" 
                alt="GitHub Avatar"
                class="w-16 h-16 rounded-full border-2 border-black dark:border-white grayscale hover:grayscale-0 transition-all duration-300"
                @error="$event.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2264%22 height=%2264%22 viewBox=%220 0 64 64%22%3E%3Crect width=%2264%22 height=%2264%22 fill=%22%23000%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-size=%2220%22%3E%E2%98%85%3C/text%3E%3C/svg%3E'"
              />
              <div>
                <div class="text-lg font-light">Endoctrine</div>
                <div class="text-sm opacity-60">Developer & Creator</div>
              </div>
            </div>

            <!-- GitHub 链接 -->
            <a 
              href="https://github.com/endoctrine" 
              target="_blank"
              class="inline-flex items-center gap-2 border-2 border-black dark:border-white px-4 py-2 rounded hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              github.com/endoctrine
            </a>

            <!-- 简介 -->
            <div class="opacity-80 text-sm leading-relaxed mt-4">
              一个正在探索技术边界的开发者，热衷于创造有意思的工具和项目。
            </div>
          </div>
        </div>
      </div>

      <!-- 模态框 - 截码战页面（占位） -->
      <div 
        v-if="showModal && currentModal === 'codewar'" 
        class="fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in z-50"
        @click.self="closeModal"
      >
        <div class="max-w-2xl w-full border-2 border-black dark:border-white rounded-lg p-8 relative animate-scale-in">
          <button 
            @click="closeModal" 
            class="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-black dark:border-white flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <h3 class="text-2xl font-light mb-4">截码战</h3>
          <div class="opacity-60 text-center py-12">
            <div class="text-6xl mb-4">🎲</div>
            <p>一个桌游工具，正在构思中...</p>
            <p class="text-sm mt-2">敬请期待</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 页面状态
const currentPage = ref('home');
const showModal = ref(false);
const currentModal = ref('');

// 导航函数
const goToList = () => {
  currentPage.value = 'list';
};

const goHome = () => {
  currentPage.value = 'home';
  showModal.value = false;
  currentModal.value = '';
};

const openPage = (page) => {
  currentModal.value = page;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  setTimeout(() => {
    currentModal.value = '';
  }, 300);
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

/* 滚动条隐藏（可选） */
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>