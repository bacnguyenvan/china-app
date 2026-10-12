export type Marketplace = '1688' | 'Taobao' | 'Tmall'

export interface Shop {
  name: string
  rating?: number
  location?: string
}

export interface Product {
  id: string
  title: string
  titleVi: string
  imageUrl: string
  priceCny: number
  currency: 'CNY'
  marketplace: Marketplace
  originalUrl: string
  minOrderQty?: number
  shop?: Shop
  category: string
  keywords: string[]
}

export type SortOption = 'relevant' | 'price_asc' | 'price_desc'

export interface FilterState {
  search: string
  marketplaces: Marketplace[]
  priceMin: string
  priceMax: string
}
