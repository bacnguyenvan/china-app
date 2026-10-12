/**
 * Product search and filter utility.
 * Designed so this logic can be swapped for an API call later.
 */
import type { FilterState, Marketplace, Product, SortOption } from '../types/product'

export function searchProducts(
  products: Product[],
  filters: FilterState,
  sort: SortOption,
): Product[] {
  let results = [...products]

  // Search by title (VI or ZH) or keywords
  const query = filters.search.trim().toLowerCase()
  if (query) {
    results = results.filter((p) => {
      const haystack = [
        p.title.toLowerCase(),
        p.titleVi.toLowerCase(),
        ...p.keywords.map((k) => k.toLowerCase()),
        p.category.toLowerCase(),
      ].join(' ')
      return haystack.includes(query)
    })
  }

  // Marketplace filter
  if (filters.marketplaces.length > 0) {
    results = results.filter((p) => filters.marketplaces.includes(p.marketplace))
  }

  // Price range
  const priceMin = parseFloat(filters.priceMin)
  const priceMax = parseFloat(filters.priceMax)
  if (!isNaN(priceMin)) {
    results = results.filter((p) => p.priceCny >= priceMin)
  }
  if (!isNaN(priceMax)) {
    results = results.filter((p) => p.priceCny <= priceMax)
  }

  // Sort
  switch (sort) {
    case 'price_asc':
      results.sort((a, b) => a.priceCny - b.priceCny)
      break
    case 'price_desc':
      results.sort((a, b) => b.priceCny - a.priceCny)
      break
    default:
      // 'relevant' — keep original order (mock data order ≈ relevance)
      break
  }

  return results
}

export const ALL_MARKETPLACES: Marketplace[] = ['1688', 'Taobao', 'Tmall']
