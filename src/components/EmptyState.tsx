import { RotateCcw, SearchX } from 'lucide-react'

interface EmptyStateProps {
  keyword: string
  onReset: () => void
}

export function EmptyState({ keyword, onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
        <SearchX className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        Không tìm thấy sản phẩm
      </h3>
      <p className="text-slate-500 text-sm max-w-sm mb-6">
        {keyword ? (
          <>
            Không có kết quả nào cho <strong>"{keyword}"</strong>.
            Thử từ khóa khác hoặc điều chỉnh bộ lọc.
          </>
        ) : (
          'Thử điều chỉnh bộ lọc hoặc nhập từ khóa tìm kiếm.'
        )}
      </p>
      <button
        onClick={onReset}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Xóa bộ lọc
      </button>
    </div>
  )
}
