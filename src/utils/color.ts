/**
 * Darkens a color by the specified rate.
 *
 * @param {string} color - The color to be darkened in hexadecimal format.
 * @param {number} rate - The rate at which the color should be darkened.
 * @return {string} The darkened color in hexadecimal format.
 */
export function darken(color: string, rate: number): string {
  // 将颜色值转换为 RGB 格式
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // 根据比率调整 RGB 值
  const adjustedR = Math.round(r * (1 - rate));
  const adjustedG = Math.round(g * (1 - rate));
  const adjustedB = Math.round(b * (1 - rate));

  // 将调整后的 RGB 值转换回十六进制颜色值
  const adjustedColor = `#${adjustedR.toString(16).padStart(2, '0')}${adjustedG
    .toString(16)
    .padStart(2, '0')}${adjustedB.toString(16).padStart(2, '0')}`;

  return adjustedColor;
}
