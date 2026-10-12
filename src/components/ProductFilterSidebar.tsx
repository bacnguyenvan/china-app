import { Filter, RotateCcw } from 'lucide-react'
import type { FilterState, Marketplace } from '../types/product'
import { ALL_MARKETPLACES } from '../utils/productSearch'

interface ProductFilterSidebarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  totalResults: number
}

const MARKETPLACE_LABELS: Record<Marketplace, string> = {
  '1688': '1688 (Alibaba)',
  Taobao: 'Taobao',
  Tmall: 'Tmall',
}

export function ProductFilterSidebar({ filters, onChange, totalResults }: ProductFilterSidebarProps) {
  function toggleMarketplace(m: Marketplace) {
    const exists = filters.marketplaces.includes(m)
    onChange({
      ...filters,
      marketplaces: exists
        ? filters.marketplaces.filter((x) => x !== m)
        : [...filters.marketplaces, m],
    })
  }

  function clearAll() {
    onChange({ search: filters.search, marketplaces: [], priceMin: '', priceMax: '' })
  }

  const isFiltered =
    filters.marketplaces.length > 0 || filters.priceMin !== '' || filters.priceMax !== ''

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-slate-800 font-semibold">
          <Filter className="w-4 h-4" />
          <span>Bộ lọc</span>
        </div>
        {isFiltered && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Result count (mobile) */}
      <div className="text-xs text-slate-500 mb-5">
        Tìm thấy <span className="font-semibold text-slate-700">{totalResults}</span> sản phẩm
      </div>

      {/* Marketplace */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Sàn thương mại
        </h3>
        <div className="space-y-2.5">
          {ALL_MARKETPLACES.map((m) => (
            <label key={m} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.marketplaces.includes(m)}
                onChange={() => toggleMarketplace(m)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm text-slate-700 group-hover:text-slate-900">
                {MARKETPLACE_LABELS[m]}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Khoảng giá (CNY ¥)
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <input
              type="number"
              min="0"
              placeholder="Từ"
              value={filters.priceMin}
              onChange={(e) => onChange({ ...filters, priceMin: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <span className="text-slate-400 text-sm shrink-0">—</span>
          <div className="flex-1">
            <input
              type="number"
              min="0"
              placeholder="Đến"
              value={filters.priceMax}
              onChange={(e) => onChange({ ...filters, priceMax: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700 leading-relaxed">
        <strong>Lưu ý:</strong> Dữ liệu sản phẩm trên đây là dữ liệu minh họa. Giá và thông tin nhà cung cấp chưa được xác minh thực tế.
      </div>
    </aside>
  )
}
