<template>
  <main class="fixed inset-0 overflow-hidden bg-black text-white">
    <canvas id="maple-canvas" class="block h-full w-full outline-none"></canvas>

    <div
      v-if="!started"
      class="absolute inset-0 z-10 flex items-center justify-center bg-black/95 px-6"
    >
      <div class="w-full max-w-lg text-center">
        <button
          type="button"
          class="absolute left-6 top-6 h-10 w-10 rounded-full border border-white/60 transition hover:bg-white hover:text-black"
          aria-label="返回首页"
          @click="router.push('/')"
        >
          ←
        </button>

        <h1 class="mb-4 text-3xl font-light tracking-wide">Maple Demo</h1>
        <p class="mb-3 text-white/75">
          使用提琴与圆号音色引导视角对准三维目标。
        </p>
        <p class="mb-8 text-sm leading-7 text-white/55">
          建议佩戴耳机或在安静环境中体验。启动后鼠标将被锁定，按 Esc
          释放，按 T 切换仅声音的实战模式。
        </p>

        <button
          type="button"
          class="rounded-full border border-white px-8 py-3 transition hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-50"
          :disabled="loading"
          @click="startDemo"
        >
          {{ loading ? '正在加载…' : '启动 Demo' }}
        </button>

        <p v-if="error" class="mt-6 text-sm text-red-300">
          {{ error }}
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const started = ref(false);
const loading = ref(false);
const error = ref('');

const startDemo = async () => {
  if (loading.value || started.value) return;

  loading.value = true;
  error.value = '';

  try {
    const { default: init } = await import(
      /* webpackIgnore: true */ '/maple/maple.js'
    );
    await init();
    started.value = true;
  } catch (cause) {
    console.error('Failed to start Maple Demo', cause);
    error.value = 'Demo 加载失败，请确认浏览器支持 WebAssembly、WebGPU 与 Web Audio。';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
#maple-canvas {
  touch-action: none;
}
</style>
