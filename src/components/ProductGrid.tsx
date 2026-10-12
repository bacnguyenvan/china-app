import { ExternalLink, Package, Star } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '../types/product'
import { cnyToVnd, formatCny, formatVnd } from '../utils/currency'
import { EmptyState } from './EmptyState'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  keyword: string
  viewMode: 'grid' | 'list'
  onReset: () => void
}

const MARKETPLACE_STYLES: Record<string, { bg: string; text: string }> = {
  '1688': { bg: 'bg-orange-100', text: 'text-orange-700' },
  Taobao: { bg: 'bg-red-100', text: 'text-red-700' },
  Tmall: { bg: 'bg-rose-100', text: 'text-rose-700' },
}

function ProductListItem({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false)
  const badge = MARKETPLACE_STYLES[product.marketplace]
  const vndPrice = cnyToVnd(product.priceCny)

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all p-4 flex gap-4">
      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-slate-50 shrink-0">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <Package className="w-8 h-8" />
          </div>
        ) : (
          <img
            src={product.imageUrl}
            alt={product.titleVi}
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-start gap-2 flex-wrap">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${badge.bg} ${badge.text}`}>
            {product.marketplace}
          </span>
          <h3 className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug">
            {product.titleVi}
          </h3>
        </div>
        <p className="text-xs text-slate-400 line-clamp-1">{product.title}</p>
        <div className="flex items-center gap-4 flex-wrap mt-auto">
          <div>
            <span className="text-base font-bold text-blue-600">{formatCny(product.priceCny)}</span>
            <span className="text-xs text-slate-400 ml-1.5">≈ {formatVnd(vndPrice)}</span>
          </div>
          {product.minOrderQty && (
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Package className="w-3 h-3" />
              MOQ {product.minOrderQty.toLocaleString()}
            </span>
          )}
          {product.shop?.rating && (
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {product.shop.rating}
            </span>
          )}
        </div>
        <a
          href={product.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Xem sản phẩm gốc
        </a>
      </div>
    </div>
  )
}

export function ProductGrid({ products, keyword, viewMode, onReset }: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyState keyword={keyword} onReset={onReset} />
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <ProductListItem key={p.id} product={p} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
