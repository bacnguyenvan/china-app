import { ArrowDownUp, LayoutGrid, List } from 'lucide-react'
import type { SortOption } from '../types/product'

interface SortControlProps {
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  resultCount: number
  keyword: string
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevant', label: 'Liên quan nhất' },
  { value: 'price_asc', label: 'Giá tăng dần' },
  { value: 'price_desc', label: 'Giá giảm dần' },
]

export function SortControl({
  sort,
  onSortChange,
  resultCount,
  keyword,
  viewMode,
  onViewModeChange,
}: SortControlProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
      {/* Result summary */}
      <div className="text-sm text-slate-600">
        <span className="font-semibold text-slate-900">{resultCount}</span> kết quả
        {keyword && (
          <>
            {' '}cho{' '}
            <span className="font-semibold text-blue-600">"{keyword}"</span>
          </>
        )}
      </div>

      {/* Sort + view toggle */}
      <div className="flex items-center gap-2">
        {/* Sort dropdown */}
        <div className="flex items-center gap-1.5 text-sm text-slate-600">
          <ArrowDownUp className="w-4 h-4 text-slate-400" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* View mode */}
        <div className="flex border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 transition-colors ${
              viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-50'
            }`}
            aria-label="Dạng lưới"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-1.5 transition-colors ${
              viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-50'
            }`}
            aria-label="Dạng danh sách"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
