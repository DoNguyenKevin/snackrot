export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function choice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function weightedChoice<T>(items: { item: T; weight: number }[]): T {
  const total = items.reduce((a, b) => a + b.weight, 0);
  let r = Math.random() * total;
  for (const it of items) {
    if ((r -= it.weight) <= 0) return it.item;
  }
  return items[items.length - 1].item;
}
