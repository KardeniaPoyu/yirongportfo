import Link from 'next/link';
import { Code2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <Code2 className="w-8 h-8 text-primary-600 group-hover:text-primary-700 transition-colors" />
            <span className="text-2xl font-bold gradient-text">Portfolio</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-dark-700 hover:text-primary-600 transition-colors font-medium"
            >
              作品集
            </Link>
            <Link 
              href="/admin" 
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
            >
              管理
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

