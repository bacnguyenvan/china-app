import { ExternalLink, Package, ShoppingCart, Star } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '../types/product'
import { cnyToVnd, formatCny, formatVnd } from '../utils/currency'

interface ProductCardProps {
  product: Product
}

const MARKETPLACE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  '1688': { bg: 'bg-orange-100', text: 'text-orange-700', label: '1688' },
  Taobao: { bg: 'bg-red-100', text: 'text-red-700', label: 'Taobao' },
  Tmall: { bg: 'bg-rose-100', text: 'text-rose-700', label: 'Tmall' },
}

export function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false)
  const badge = MARKETPLACE_STYLES[product.marketplace] ?? MARKETPLACE_STYLES['1688']
  const vndPrice = cnyToVnd(product.priceCny)

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
            <ShoppingCart className="w-10 h-10" />
            <span className="text-xs text-slate-400">Không có ảnh</span>
          </div>
        ) : (
          <img
            src={product.imageUrl}
            alt={product.titleVi}
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {/* Marketplace badge */}
        <span
          className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full ${badge.bg} ${badge.text}`}
        >
          {badge.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <h3 className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug flex-1">
          {product.titleVi}
        </h3>

        {/* Original ZH title (subtle) */}
        <p className="text-xs text-slate-400 line-clamp-1">{product.title}</p>

        {/* Price block */}
        <div className="space-y-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-blue-600">{formatCny(product.priceCny)}</span>
            <span className="text-xs text-slate-400 uppercase tracking-wide">CNY</span>
          </div>
          <div className="text-xs text-slate-500">
            ≈ {formatVnd(vndPrice)}{' '}
            <span className="text-slate-400">(tỷ giá tham khảo)</span>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          {product.minOrderQty && (
            <span className="flex items-center gap-1">
              <Package className="w-3 h-3" />
              MOQ: {product.minOrderQty.toLocaleString()}
            </span>
          )}
          {product.shop?.rating && (
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {product.shop.rating}
            </span>
          )}
        </div>

        {/* Shop name */}
        {product.shop && (
          <p className="text-xs text-slate-400 truncate">{product.shop.name}</p>
        )}

        {/* CTA */}
        <a
          href={product.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 font-medium text-sm py-2 px-4 rounded-xl transition-all duration-150"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Xem sản phẩm gốc
        </a>
      </div>
    </div>
  )
}
