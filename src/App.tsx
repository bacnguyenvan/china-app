import { SlidersHorizontal, X } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { HeroSearch } from './components/HeroSearch'
import { ProductFilterSidebar } from './components/ProductFilterSidebar'
import { ProductGrid } from './components/ProductGrid'
import { SortControl } from './components/SortControl'
import { MOCK_PRODUCTS } from './data/mock-products'
import type { FilterState, Marketplace, SortOption } from './types/product'
import { searchProducts } from './utils/productSearch'

const INITIAL_FILTERS: FilterState = {
  search: '',
  marketplaces: [],
  priceMin: '',
  priceMax: '',
}

export default function App() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)
  const [sort, setSort] = useState<SortOption>('relevant')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const results = useMemo(
    () => searchProducts(MOCK_PRODUCTS, filters, sort),
    [filters, sort],
  )

  const handleSearch = useCallback((query: string, marketplace?: Marketplace) => {
    setFilters((prev) => ({
      ...prev,
      search: query,
      marketplaces: marketplace ? [marketplace] : prev.marketplaces,
    }))
  }, [])

  const handleReset = useCallback(() => {
    setFilters(INITIAL_FILTERS)
    setSort('relevant')
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onSearch={handleSearch} />

      <main>
        {/* Hero */}
        <HeroSearch onSearch={handleSearch} />

        {/* Results section */}
        <div id="results" className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <ProductFilterSidebar
                  filters={filters}
                  onChange={setFilters}
                  totalResults={results.length}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Mobile filter button */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-medium text-sm px-4 py-2 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Bộ lọc
                  {(filters.marketplaces.length > 0 || filters.priceMin || filters.priceMax) && (
                    <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {filters.marketplaces.length +
                        (filters.priceMin ? 1 : 0) +
                        (filters.priceMax ? 1 : 0)}
                    </span>
                  )}
                </button>
              </div>

              {/* Sort + view controls */}
              <div className="mb-6">
                <SortControl
                  sort={sort}
                  onSortChange={setSort}
                  resultCount={results.length}
                  keyword={filters.search}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />
              </div>

              {/* Product grid */}
              <ProductGrid
                products={results}
                keyword={filters.search}
                viewMode={viewMode}
                onReset={handleReset}
              />
            </div>
          </div>
        </div>

        {/* How it works section */}
        <HowItWorks />

        {/* Footer */}
        <SiteFooter />
      </main>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative ml-auto w-80 max-w-full h-full bg-white shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-slate-800">Bộ lọc</h2>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ProductFilterSidebar
              filters={filters}
              onChange={(f) => {
                setFilters(f)
              }}
              totalResults={results.length}
            />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors"
            >
              Xem {results.length} kết quả
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Nhập từ khóa',
      desc: 'Tìm kiếm bằng tiếng Việt hoặc tiếng Trung. Hệ thống sẽ tìm kiếm trên 1688, Taobao và Tmall.',
    },
    {
      num: '02',
      title: 'So sánh sản phẩm',
      desc: 'Xem giá CNY và giá tham khảo VND, số lượng đặt tối thiểu, đánh giá nhà cung cấp.',
    },
    {
      num: '03',
      title: 'Liên hệ nhà cung cấp',
      desc: 'Nhấp vào "Xem sản phẩm gốc" để truy cập trang sản phẩm thực và liên hệ trực tiếp.',
    },
  ]

  return (
    <section id="how-it-works" className="bg-white border-t border-slate-100 py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Cách hoạt động
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            Ba bước đơn giản để tìm nguồn hàng Trung Quốc phù hợp với bạn.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white text-lg font-bold flex items-center justify-center mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-white font-bold text-lg mb-1">ChinaSource</div>
          <div className="text-sm">
            Công cụ tìm nguồn hàng Trung Quốc cho người bán hàng online Việt Nam.
          </div>
        </div>
        <div className="text-xs text-slate-500 text-center sm:text-right">
          <p>Dữ liệu sản phẩm là dữ liệu minh họa — không phải danh sách thực tế.</p>
          <p className="mt-1">© 2024 ChinaSource. Demo sản phẩm.</p>
        </div>
      </div>
    </footer>
  )
}
