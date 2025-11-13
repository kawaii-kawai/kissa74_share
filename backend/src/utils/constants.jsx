export const ITEMS = [
  {
    id: "686a7cb3cbfdbb7438d746bc",
    name: "クロックムッシュ",
    name_en: "Croque Monsieur",
    price: 300,
  },
  {
    id: "686a7ce0cbfdbb7438d74e73",
    name: "チョコクロワッサン",
    name_en: "Chocolate Croissant",
    price: 250,
  },
  {
    id: "686a7cfecbfdbb7438d74e75",
    name: "ベリーパフェ",
    name_en: "Berry Parfait",
    price: 400,
  },
  {
    id: "686a7d03cbfdbb7438d74e77",
    name: "抹茶パフェ",
    name_en: "Matcha Parfait",
    price: 400,
  },
  {
    id: "686a7d10cbfdbb7438d74e79",
    name: "コンソメスープ",
    name_en: "Consommé Soup",
    price: 300,
  },
  {
    id: "686a7d1ccbfdbb7438d74e7b",
    name: "小倉トースト",
    name_en: "Ogura Toast",
    price: 300,
  },
  {
    id: "686a7d24cbfdbb7438d74e7d",
    name: "クラフトコーラ",
    name_en: "Craft Cola",
    price: 250,
  },
  {
    id: "686a7d88cbfdbb7438d74e7f",
    name: "コーヒー（ホット）",
    name_en: "Coffee (Hot)",
    price: 250,
  },
  {
    id: "686a7d90cbfdbb7438d74e81",
    name: "リンゴジュース",
    name_en: "Apple Juice",
    price: 200,
  },
  {
    id: "686a7d98cbfdbb7438d74e83",
    name: "紅茶（ホット）",
    name_en: "Tea (Hot)",
    price: 250,
  },
  {
    id: "68d7563169cb686cf32bff58",
    name: "アイスコーヒー",
    name_en: "Coffee（Ice）",
    price: 250,
  },
];

export const HYGIENE = [
  {
    item: "クロックムッシュ",
    types: ["調理開始", "9090"],
    id: "68e15f1d33f2f4a0c0b04358",
  },
  {
    item: "チョコクロワッサン",
    types: ["調理開始", "9090"],
    id: "68e371b14734f1ee8c083bf3",
  },
  {
    item: "小倉トースト",
    types: ["調理開始", "9090"],
    id: "68e371934734f1ee8c083bf1",
  },
  {
    item: "コンソメスープ",
    types: ["調理開始", "9090", "食缶移し替え"],
    id: "68e371d04734f1ee8c083bf5",
  },
  {
    item: "ベリーパフェ",
    types: ["調理開始"],
    id: "68e371df4734f1ee8c083bf7",
  },
  {
    item: "抹茶パフェ",
    types: ["調理開始"],
    id: "68e372074734f1ee8c083bf9",
  },
  {
    item: "クラフトコーラ",
    types: ["調理開始", "9090", "冷却開始", "冷却終了", "保冷開始", "保冷終了"],
    id: "68e372164734f1ee8c083bfb",
  },
  {
    item: "リンゴジュース",
    types: [],
    id: "68e372404734f1ee8c083bfd",
  },
  {
    item: "ドリップコーヒー",
    types: [],
    id: "68e3725a4734f1ee8c083dae",
  },
  {
    item: "紅茶（ホット）",
    types: [],
    id: "68e372ab4734f1ee8c083db0",
  },
  {
    item: "アイスコーヒー",
    types: [],
    id: "68e372b24734f1ee8c083db2",
  },
];

export const ITEMS_STATUS = [
  {
    id: "68e15f1d33f2f4a0c0b04358",
    name: "クロックムッシュ",
    type: "Food",
    color: "#ff6b6b",
  },
  {
    id: "68e371b14734f1ee8c083bf3",
    name: "チョコクロワッサン",
    type: "Sweets",
    color: "#4dabf7",
  },
  {
    id: "68e3725a4734f1ee8c083dae",
    name: "ドリップコーヒー",
    type: "Drink",
    color: "#ffd43b",
  },
  {
    id: "68e372b24734f1ee8c083db2",
    name: "アイスコーヒー",
    type: "Drink",
    color: "#ffd43b",
  },
  {
    id: "68e371934734f1ee8c083bf1",
    name: "小倉トースト",
    type: "Food",
    color: "#ff6b6b",
  },
  {
    id: "68e371df4734f1ee8c083bf7",
    name: "ベリーパフェ",
    type: "Sweets",
    color: "#4dabf7",
  },
  {
    id: "68e372ab4734f1ee8c083db0",
    name: "紅茶（ホット）",
    type: "Drink",
    color: "#ffd43b",
  },
  {
    id: "68e372164734f1ee8c083bfb",
    name: "クラフトコーラ",
    type: "Drink",
    color: "#ffd43b",
  },
  {
    id: "68e371d04734f1ee8c083bf5",
    name: "コンソメスープ",
    type: "Food",
    color: "#ff6b6b",
  },
  {
    id: "68e372074734f1ee8c083bf9",
    name: "抹茶パフェ",
    type: "Sweets",
    color: "#4dabf7",
  },
  {
    id: "68e372404734f1ee8c083bfd",
    name: "リンゴジュース",
    type: "Drink",
    color: "#ffd43b",
  },
];

export const DAILY_STOCK_LIMITS = {
  "686a7cb3cbfdbb7438d746bc": 200, // クロックムッシュ 8 * 25 ローテ
  "686a7ce0cbfdbb7438d74e73": 128, // チョコクロワッサン 8 * 14 ローテ

  "686a7cfecbfdbb7438d74e75": 60, // ベリーパフェ 6 * 10 ローテ
  "686a7d03cbfdbb7438d74e77": 60, // 抹茶パフェ　6 * 10 ローテ

  "686a7d10cbfdbb7438d74e79": 100, // コンソメスープ 20 * 5 ローテ
  "686a7d1ccbfdbb7438d74e7b": 120, // 小倉トースト 8 * 15 ローテ
  "686a7d24cbfdbb7438d74e7d": 162, // クラフトコーラ 18 * 9 ローテ

  "686a7d88cbfdbb7438d74e7f": 270, // ホットコーヒー 残り大体 400 くらい？と聞いたので 土曜は最大 240 とか ?
  "686a7d90cbfdbb7438d74e81": 232, // リンゴジュース この辺のあまり具合を教えてほしい
  "686a7d98cbfdbb7438d74e83": 87, // 紅茶ホット　この辺のあまり具合を教えてほしい
  "68d7563169cb686cf32bff58": 90, // アイスコーヒー　この辺のあまり具合を教えてほしい
};
