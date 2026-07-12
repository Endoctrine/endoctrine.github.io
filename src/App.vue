<template>
  <div id="app" class="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  const stored = sessionStorage.getItem('redirect');
  if (stored) {
    sessionStorage.removeItem('redirect');
    router.replace(stored);
  }
});
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 链接样式 */
a {
  color: inherit;
  text-decoration: none;
}

/* 图片最大宽度 */
img {
  max-width: 100%;
  height: auto;
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 128, 128, 0.5);
}

/* 选择样式 */
::selection {
  background: black;
  color: white;
}

@media (prefers-color-scheme: dark) {
  ::selection {
    background: white;
    color: black;
  }
}
</style>