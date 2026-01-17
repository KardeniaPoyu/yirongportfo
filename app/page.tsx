import Link from 'next/link';
import { getAllProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import Header from '@/components/Header';

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
            作品集
          </h1>
          <p className="text-xl md:text-2xl text-dark-600 mb-8 max-w-3xl mx-auto">
            探索计算机图形学、流体仿真、自动驾驶、游戏开发与AI的创新项目
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-dark-500">
            <span className="px-4 py-2 rounded-full bg-primary-100 text-primary-700">计算机图形学</span>
            <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700">流体仿真</span>
            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700">自动驾驶</span>
            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700">游戏开发</span>
            <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700">人工智能</span>
          </div>
        </section>

        {/* Projects Grid */}
        <section>
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-dark-400 mb-4">暂无作品展示</p>
              <Link 
                href="/admin"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                添加第一个作品
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-dark-900">项目作品</h2>
                <Link 
                  href="/admin"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                >
                  管理作品
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-dark-200">
        <div className="container mx-auto px-4 text-center text-dark-500">
          <p>© {new Date().getFullYear()} 作品集网站 - 用代码创造无限可能</p>
        </div>
      </footer>
    </div>
  );
}

