import { Search, Sparkles, TrendingUp, Zap } from 'lucide-react'
import { useState } from 'react'
import type { Marketplace } from '../types/product'

interface HeroSearchProps {
  onSearch: (query: string, marketplace?: Marketplace) => void
}

const EXAMPLE_KEYWORDS = [
  'bình giữ nhiệt',
  'túi xách nữ',
  'đèn LED',
  '保温杯',
  '女包',
]

const MARKETPLACE_FILTERS: { id: Marketplace; label: string; color: string }[] = [
  { id: '1688', label: '1688', color: 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200' },
  { id: 'Taobao', label: 'Taobao', color: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200' },
  { id: 'Tmall', label: 'Tmall', color: 'bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200' },
]

const STATS = [
  { icon: TrendingUp, label: '14+ triệu sản phẩm', sub: 'từ các sàn TQ' },
  { icon: Zap, label: 'Tìm kiếm tức thì', sub: 'không cần VPN' },
  { icon: Sparkles, label: 'So sánh giá', sub: 'đa sàn thương mại' },
]

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const [query, setQuery] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function handleExample(keyword: string) {
    setQuery(keyword)
    onSearch(keyword)
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleMarketplace(marketplace: Marketplace) {
    onSearch(query.trim(), marketplace)
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Dữ liệu minh họa — Demo sản phẩm
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Tìm nguồn hàng Trung Quốc
          <span className="block text-blue-200">dễ dàng hơn</span>
        </h1>

        <p className="text-blue-100 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Tìm kiếm và so sánh sản phẩm từ các sàn thương mại Trung Quốc tại một nơi.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-2xl max-w-2xl mx-auto">
            <div className="flex-1 flex items-center gap-2 pl-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nhập tên sản phẩm hoặc từ khóa tiếng Trung..."
                className="flex-1 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none text-sm sm:text-base bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm sm:text-base shrink-0"
            >
              Tìm kiếm
            </button>
          </div>
        </form>

        {/* Example keywords */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-blue-200 text-sm">Ví dụ:</span>
          {EXAMPLE_KEYWORDS.map((kw) => (
            <button
              key={kw}
              onClick={() => handleExample(kw)}
              className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1 rounded-full border border-white/20 transition-colors backdrop-blur-sm"
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Marketplace quick filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <span className="text-blue-200 text-sm font-medium">Lọc theo sàn:</span>
          {MARKETPLACE_FILTERS.map((m) => (
            <button
              key={m.id}
              onClick={() => handleMarketplace(m.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${m.color}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {STATS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-1">
                <Icon className="w-5 h-5 text-blue-200" />
              </div>
              <div className="text-white text-xs sm:text-sm font-semibold leading-tight">{label}</div>
              <div className="text-blue-300 text-xs">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
