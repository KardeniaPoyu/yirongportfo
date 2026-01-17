import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  index: number;
}

export const ProjectCard = ({ id, title, category, description, imageUrl, index }: ProjectCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      <Link 
        to={`/projects/${id}`}
        className="group block"
      >
        <div className="relative overflow-hidden bg-card border border-border rounded-lg">
          {/* Image container */}
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Geometric placeholder */}
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-20 h-20 text-muted-foreground/20"
                >
                  <polygon
                    points="50,10 90,75 10,75"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.3" />
                </svg>
              </div>
            )}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="font-display text-sm tracking-wide text-primary">
                View Project →
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-2 block">
              {category}
            </span>
            <h3 className="font-display text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="font-body text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProjectCard;
