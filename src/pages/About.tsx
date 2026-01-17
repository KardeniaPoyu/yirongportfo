import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const skills = [
  { category: 'Design', items: ['UI/UX Design', 'Visual Design', 'Motion Design', 'Prototyping'] },
  { category: 'Development', items: ['React/TypeScript', 'WebGL/Three.js', 'Creative Coding', 'Animation'] },
  { category: 'Expertise', items: ['Interactive Experiences', 'Data Visualization', 'Generative Art', 'System Design'] },
];

const About = () => {
  return (
    <div className="relative min-h-screen bg-background noise-overlay">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero section */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
                  About
                </span>
                <h1 className="font-display text-5xl md:text-6xl font-medium text-foreground mb-8">
                  Designer & Developer
                </h1>
                <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
                  <p>
                    I'm a creative technologist focused on building immersive digital experiences 
                    that bridge the gap between art and engineering.
                  </p>
                  <p>
                    With a background in both design and development, I approach each project 
                    as an opportunity to explore new possibilities and push creative boundaries.
                  </p>
                  <p>
                    My work spans interactive installations, data visualization, generative art, 
                    and experimental interfaces—always with an emphasis on craft and attention to detail.
                  </p>
                </div>
              </motion.div>

              {/* Visual element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-square"
              >
                <div className="absolute inset-0 bg-card border border-border rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 300 300" className="w-full h-full p-12">
                      {/* Concentric circles */}
                      {[1, 2, 3, 4, 5].map((i) => (
                        <circle
                          key={i}
                          cx="150"
                          cy="150"
                          r={30 + i * 25}
                          fill="none"
                          stroke="hsl(var(--border))"
                          strokeWidth="0.5"
                        />
                      ))}
                      
                      {/* Radial lines */}
                      {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i / 12) * Math.PI * 2;
                        const x2 = 150 + Math.cos(angle) * 140;
                        const y2 = 150 + Math.sin(angle) * 140;
                        return (
                          <line
                            key={i}
                            x1="150"
                            y1="150"
                            x2={x2}
                            y2={y2}
                            stroke="hsl(var(--border))"
                            strokeWidth="0.5"
                          />
                        );
                      })}
                      
                      {/* Center */}
                      <circle
                        cx="150"
                        cy="150"
                        r="20"
                        fill="hsl(var(--primary))"
                        className="animate-pulse-subtle"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills section */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <span className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
                Capabilities
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground">
                Skills & Expertise
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {skills.map((group, groupIndex) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                >
                  <h3 className="font-display text-lg font-medium text-foreground mb-4 pb-4 border-b border-border">
                    {group.category}
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li 
                        key={item}
                        className="font-body text-sm text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
                  Philosophy
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-8">
                  "Good design is as little design as possible."
                </h2>
                <p className="font-body text-lg text-muted-foreground">
                  Inspired by Dieter Rams, I believe in the power of restraint—
                  creating work that is honest, intentional, and enduring.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;