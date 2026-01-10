<template>
  <div class="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
    <!-- 标题 -->
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-light mb-12 text-center tracking-tight transition-all duration-500 animate-fade-in pt-20">
      吟游者的个人博客
    </h1>

    <!-- 跳转按钮 -->
    <div class="flex justify-center">
      <router-link
        to="/about"
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
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Home 页面逻辑
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