import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import ParticleField from '@/components/ParticleField';

const allProjects = [
  {
    id: 'spatial-interface',
    title: 'Spatial Interface',
    category: 'Interactive Design',
    description: 'A three-dimensional navigation system exploring depth and spatial relationships in digital environments.',
  },
  {
    id: 'data-symphony',
    title: 'Data Symphony',
    category: 'Data Visualization',
    description: 'Transforming complex datasets into harmonious visual compositions that reveal hidden patterns.',
  },
  {
    id: 'neural-garden',
    title: 'Neural Garden',
    category: 'Generative Art',
    description: 'An evolving ecosystem of procedural forms driven by neural network algorithms.',
  },
  {
    id: 'kinetic-typography',
    title: 'Kinetic Typography',
    category: 'Motion Design',
    description: 'Exploring the boundaries of text as a dynamic, expressive medium in digital space.',
  },
  {
    id: 'chromatic-flow',
    title: 'Chromatic Flow',
    category: 'Interactive Art',
    description: 'An immersive color experience responding to music and user interaction.',
  },
  {
    id: 'structural-poetry',
    title: 'Structural Poetry',
    category: 'WebGL',
    description: 'Architectural forms rendered through code, celebrating the beauty of mathematical precision.',
  },
  {
    id: 'project-placeholder-1',
    title: 'Project Placeholder 1',
    category: 'Interactive Design',
    description: 'A placeholder project for observing the page layout and grid structure.',
  },
  {
    id: 'project-placeholder-2',
    title: 'Project Placeholder 2',
    category: 'Data Visualization',
    description: 'Another placeholder project to help visualize the portfolio grid layout.',
  },
  {
    id: 'project-placeholder-3',
    title: 'Project Placeholder 3',
    category: 'Generative Art',
    description: 'Additional placeholder content for testing the responsive design and card spacing.',
  },
  {
    id: 'project-placeholder-4',
    title: 'Project Placeholder 4',
    category: 'Motion Design',
    description: 'Placeholder project demonstrating the visual hierarchy and typography of project cards.',
  },
  {
    id: 'project-placeholder-5',
    title: 'Project Placeholder 5',
    category: 'WebGL',
    description: 'Sample project card to observe how different category filters affect the layout.',
  },
  {
    id: 'project-placeholder-6',
    title: 'Project Placeholder 6',
    category: 'Interactive Art',
    description: 'Final placeholder project for comprehensive layout testing and visual assessment.',
  },
];

const categories = ['All', 'Interactive Design', 'Data Visualization', 'Generative Art', 'Motion Design', 'WebGL'];

const Projects = () => {
  return (
    <div className="relative min-h-screen bg-background noise-overlay">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero section */}
        <section className="relative py-24 overflow-hidden">
          {/* Subtle particles */}
          <ParticleField 
            particleCount={15}
            direction="upward"
            intensity={0.4}
          />

          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <span className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
                Portfolio
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-foreground mb-6">
                Selected Works
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-xl">
                A curated collection of projects exploring the intersection of 
                design, technology, and artistic expression.
              </p>
            </motion.div>

            {/* Category filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3 mt-12"
            >
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`px-4 py-2 font-body text-xs tracking-wide rounded-full border transition-all duration-300 ${
                    index === 0
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'text-muted-foreground border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects grid */}
        <section className="pb-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id}
                  {...project}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;