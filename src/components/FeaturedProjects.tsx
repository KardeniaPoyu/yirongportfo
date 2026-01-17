import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';

const featuredProjects = [
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
];

export const FeaturedProjects = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle background accent */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, hsla(38, 80%, 55%, 0.05) 0%, transparent 50%)',
        }}
      />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
              Selected Work
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground">
              Featured Projects
            </h2>
          </div>
          <Link 
            to="/projects"
            className="hidden md:block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300 link-hover"
          >
            View All →
          </Link>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              {...project}
              index={index}
            />
          ))}
        </div>

        {/* Mobile view all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:hidden mt-12 text-center"
        >
          <Link 
            to="/projects"
            className="inline-block font-display text-sm tracking-wide text-primary hover:text-foreground transition-colors duration-300"
          >
            View All Projects →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
