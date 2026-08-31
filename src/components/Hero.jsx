import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-container">
        <div className="hero-content">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transformamos espacios con <br/>
            <span className="text-gradient">precisión y elegancia</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Calidad, garantía y confianza en cada casa. Expertos en pintura residencial y comercial en Michoacán con acabados impecables que perduran en el tiempo.
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a href="#contacto" className="btn-primary">
              Solicitar Presupuesto Gratuito
              <ArrowRight size={20} />
            </a>
            <a href="#portafolio" className="btn-secondary">
              Ver nuestro trabajo
            </a>
          </motion.div>
          
          <motion.div 
            className="hero-stats"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">Años de experiencia</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Proyectos completados</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Satisfacción garantizada</span>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract/Elegant Image or Element */}
        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bento-card hero-image-card">
            <div className="image-overlay"></div>
            {/* Temporarily using a placeholder, later we can use one of their best works */}
            <img 
              src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Interior pintado con elegancia" 
              className="hero-img"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
