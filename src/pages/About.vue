<template>
  <div class="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 pt-20 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- 标题 -->
      <h1 class="text-3xl font-light mb-8 text-center animate-fade-in">关于</h1>

      <!-- 内容区域 -->
      <div class="space-y-6 animate-fade-in-up">
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
        <div class="opacity-80 text-sm leading-relaxed">
          Ciallo～(∠·ω< )⌒★
        </div>

        <!-- 导航链接 -->
        <div class="pt-8 space-y-3">
          <router-link
            to="/codenames"
            class="block border-b border-black/20 dark:border-white/20 pb-3 hover:font-bold transition-all duration-300"
          >
            截码战 →
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// About 页面逻辑
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

/* 响应式调整 */
@media (max-width: 640px) {
  .animate-fade-in-up {
    animation-delay: 0s;
  }
}
</style>