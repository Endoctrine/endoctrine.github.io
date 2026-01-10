endoctrine.github.io/src/pages/Codenames/index.js
```

```javascript
/**
 * 截码战页面入口
 */

// 导出主组件
export { default as CodenamesPage } from './Codenames.vue';

// 导出工具函数和状态管理
export * from './wordBank.js';
export * from './useCodenames.js';

// 导出组件（如果有子组件）
export { default as WordCard } from './components/WordCard.vue';
export { default as GameBoard } from './components/GameBoard.vue';
export { default as CluePanel } from './components/CluePanel.vue';
export { default as TeamIndicator } from './components/TeamIndicator.vue';

export default {
  CodenamesPage,
  wordBank: './wordBank.js',
  useCodenames: './useCodenames.js'
};