import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects';
import Header from '@/components/Header';
import ProjectDetail from '@/components/ProjectDetail';

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <ProjectDetail project={project} />
    </div>
  );
}

