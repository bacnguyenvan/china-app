import { Bookmark, Globe, Menu, Search, X } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  onSearch: (query: string) => void
}

const NAV_LINKS = [
  { label: 'Tìm kiếm sản phẩm', href: '#search' },
  { label: 'Danh mục phổ biến', href: '#categories' },
  { label: 'Cách hoạt động', href: '#how-it-works' },
]

export function Header({ onSearch }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [headerSearch, setHeaderSearch] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (headerSearch.trim()) {
      onSearch(headerSearch.trim())
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900 hidden sm:block">
              ChinaSource
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop header search */}
          <form onSubmit={handleSubmit} className="hidden lg:flex flex-1 max-w-xs">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              title="Sản phẩm đã lưu"
              aria-label="Sản phẩm đã lưu"
            >
              <Bookmark className="w-5 h-5" />
            </button>
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm text-slate-700 hover:text-blue-600 font-medium py-1"
            >
              {link.label}
            </a>
          ))}
          <form onSubmit={handleSubmit} className="pt-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>
      )}
    </header>
  )
}
