<template>
  <div class="flex flex-col items-center justify-center p-8">
    <!-- Outer ring -->
    <div class="relative">
      <div class="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
      
      <!-- Inner animated ring -->
      <div class="absolute top-0 left-0 w-16 h-16 border-4 border-t-primary border-r-secondary border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      
      <!-- Center dot -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-primary to-secondary rounded-full animate-pulse"></div>
    </div>
    
    <!-- Loading text -->
    <p class="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
      <slot>Loading...</slot>
    </p>
  </div>
</template>

<script setup>
// No additional logic needed for this visual component
</script>

<style scoped>
/* Custom loading animations */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.95) translate(-50%, -50%);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>