/**
 * 截码战词库
 * 包含常用且易懂的中文词汇，用于游戏抽词
 * 已优化：删除色彩词汇和生僻词汇
 */

export const wordBank = {
  // 动物类（减少，只保留最常见的）
  animals: [
    "蜜蜂",
    "大象",
    "猴子",
    "兔子",
    "猫咪",
    "狗狗",
    "小鸟",
    "鱼",
    "蝴蝶",
  ],

  // 自然类
  nature: [
    "太阳",
    "月亮",
    "星星",
    "云",
    "雨",
    "雪",
    "风",
    "雷",
    "山",
    "河",
    "海",
    "湖",
    "森林",
    "草原",
    "沙漠",
    "石头",
    "泥土",
    "树木",
    "花朵",
    "水流",
    "露珠",
    "雾气",
    "彩虹",
    "火山",
    "岩石",
    "沙滩",
    "池塘",
    "峡谷",
    "瀑布",
    "冰川",
    "草原",
  ],

  // 食物类
  food: [
    "苹果",
    "香蕉",
    "橙子",
    "葡萄",
    "西瓜",
    "草莓",
    "桃子",
    "面包",
    "牛奶",
    "鸡蛋",
    "米饭",
    "面条",
    "蛋糕",
    "饼干",
    "巧克力",
    "冰淇淋",
    "咖啡",
    "茶",
    "果汁",
    "蔬菜",
    "豆腐",
    "披萨",
    "汉堡",
    "薯条",
  ],

  // 日常物品类
  objects: [
    "手机",
    "电脑",
    "电视",
    "书",
    "桌子",
    "椅子",
    "床",
    "沙发",
    "灯",
    "时钟",
    "杯子",
    "碗",
    "筷子",
    "勺子",
    "钥匙",
    "钱包",
    "背包",
    "雨伞",
    "镜子",
    "梳子",
    "牙刷",
    "毛巾",
    "衣服",
    "鞋子",
    "帽子",
    "手套",
    "手表",
    "眼镜",
    "耳机",
    "相机",
    "箱子",
    "梯子",
    "盆栽",
    "日历",
    "地图",
    "邮票",
    "电池",
    "灯泡",
    "插座",
    "开关",
  ],

  // 动作类
  actions: [
    "跑步",
    "跳跃",
    "行走",
    "坐下",
    "站立",
    "躺下",
    "大笑",
    "哭泣",
    "说话",
    "倾听",
    "观看",
    "思考",
    "吃饭",
    "喝水",
    "睡觉",
    "醒来",
    "书写",
    "阅读",
    "绘画",
    "唱歌",
    "跳舞",
    "游泳",
    "飞行",
    "开车",
    "骑车",
    "走路",
    "握手",
    "拥抱",
    "挥手",
    "点头",
    "摇头",
    "鞠躬",
    "敲门",
    "打扫",
    "烹饪",
    "钓鱼",
  ],

  // 地点类
  places: [
    "家",
    "学校",
    "医院",
    "商店",
    "餐厅",
    "公园",
    "图书馆",
    "电影院",
    "车站",
    "机场",
    "酒店",
    "银行",
    "邮局",
    "体育馆",
    "游泳池",
    "商场",
    "咖啡馆",
    "花园",
    "海滩",
    "城市",
    "乡村",
    "工厂",
  ],

  // 科技类
  tech: [
    "电脑",
    "网络",
    "软件",
    "数据",
    "代码",
    "人工智能",
    "无人机",
    "芯片",
    "传感器",
    "数据库",
    "摄像头",
    "屏幕",
  ],

  // 好玩的抽象概念类（新增）
  fun: [
    "秘密",
    "冒险",
    "魔法",
    "宝藏",
    "幽灵",
    "噩梦",
    "童话",
    "迷宫",
    "预言",
    "诅咒",
    "祝福",
    "奇迹",
    "梦想",
    "幻觉",
    "时间胶囊",
    "任意门",
    "隐身",
    "飞行",
    "变形",
    "瞬间移动",
  ],
};

/**
 * 获取所有词汇（展平词库）
 * @returns {Array} 所有词汇数组
 */
export function getAllWords() {
  const allWords = [];
  for (const category in wordBank) {
    allWords.push(...wordBank[category]);
  }
  return allWords;
}

/**
 * 随机打乱数组（Fisher-Yates算法）
 * @param {Array} array 原始数组
 * @returns {Array} 随机后的数组
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 从词库中随机抽取指定数量的词汇
 * @param {number} count 抽取数量
 * @returns {Array} 随机抽取的词汇数组
 */
export function drawRandomWords(count = 4) {
  const allWords = getAllWords();
  const shuffled = shuffleArray(allWords);
  return shuffled.slice(0, count);
}

/**
 * 从1-4中随机抽取指定数量的数字作为密码
 * @param {number} count 抽取数量，默认为3
 * @returns {Array} 随机密码数组
 */
export function generatePassword(count = 3) {
  const numbers = [1, 2, 3, 4];
  const shuffled = shuffleArray(numbers);
  return shuffled.slice(0, count);
}

export default {
  wordBank,
  getAllWords,
  shuffleArray,
  drawRandomWords,
  generatePassword,
};
