/**
 * Approximate exchange rate — not a live rate.
 * Update this constant to change the conversion across the entire app.
 */
export const CNY_TO_VND_RATE = 3_450

export function cnyToVnd(cny: number): number {
  return Math.round(cny * CNY_TO_VND_RATE)
}

export function formatCny(amount: number): string {
  return `¥${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 })}`
}

export function formatVnd(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}đ`
}
