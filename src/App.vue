<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
    <!-- Header -->
    <header class="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
            <span class="font-bold text-xl tracking-tight">Endoctrine</span>
          </div>

          <div class="flex items-center space-x-6">
            <a href="#home" class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Home</a>
            <a href="#about" class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">About</a>
            <a href="#projects" class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Projects</a>
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              aria-label="Toggle theme">
              <span v-if="isDark">🌙</span>
              <span v-else>☀️</span>
            </button>
          </div>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Hero Section -->
      <section id="home" class="text-center py-12 sm:py-16">
        <div class="relative inline-block mb-6">
          <div class="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full p-1 animate-pulse">
            <div class="w-full h-full bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-3xl">
              👋
            </div>
          </div>
        </div>

        <h1 class="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Hello, I'm Endoctrine
        </h1>

        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Welcome to my personal GitHub Pages site. Built with 💜 using Vue, Rsbuild, and Tailwind CSS.
        </p>

        <div class="flex gap-4 justify-center">
          <a href="https://github.com/endoctrine"
             target="_blank"
             class="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:opacity-90 transition-opacity">
            GitHub
          </a>
          <a href="#projects"
             class="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:border-primary dark:hover:border-primary transition-colors">
            View Projects
          </a>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="py-12">
        <h2 class="text-3xl font-bold mb-6">About Me</h2>
        <div class="prose dark:prose-invert max-w-none">
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              I'm a developer who loves building things. This site is my playground for experimenting with modern web technologies.
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
                <div class="font-semibold text-primary">Vue.js</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Framework</div>
              </div>
              <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
                <div class="font-semibold text-secondary">Rsbuild</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Build Tool</div>
              </div>
              <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
                <div class="font-semibold text-accent">Tailwind</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">CSS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section id="projects" class="py-12">
        <h2 class="text-3xl font-bold mb-6">Projects</h2>
        <div class="grid sm:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-2xl">🚀</span>
              <h3 class="text-xl font-semibold">Project Alpha</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              A revolutionary web application currently in development.
            </p>
            <a href="#" class="text-primary font-medium hover:underline inline-flex items-center gap-1">
              Learn more →
            </a>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-2xl">💻</span>
              <h3 class="text-xl font-semibold">Project Beta</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Open-source toolkit for modern web development.
            </p>
            <a href="#" class="text-primary font-medium hover:underline inline-flex items-center gap-1">
              View on GitHub →
            </a>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="py-12 text-center">
        <div class="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
          <h2 class="text-2xl font-bold mb-2">Get In Touch</h2>
          <p class="mb-6 opacity-90">Feel free to reach out for collaborations or just a friendly hello</p>
          <a href="mailto:your-email@example.com"
             class="inline-block bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Email Me
          </a>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 dark:border-gray-800 py-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray-600 dark:text-gray-400">
          {{ new Date().getFullYear() }} Endoctrine • Built with Vue & Tailwind •
          <a href="https://github.com/endoctrine/endoctrine.github.io"
             target="_blank"
             class="text-primary hover:underline">
            Source Code
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  // Check for saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

#app {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
</style>
