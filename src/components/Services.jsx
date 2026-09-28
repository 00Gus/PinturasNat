import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, PaintBucket, PaintRoller, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Services.css';

const base = import.meta.env.BASE_URL;
const services = [
  {
    id: 'interiores',
    title: 'Interiores',
    icon: <Home size={32} />,
    description: 'Transformamos el interior de tu hogar con acabados perfectos y colores que reflejan tu estilo de vida.',
    className: 'bento-large',
    bgImage: `${base}assets/servicios_interiores_1788154954081.jpg`
  },
  {
    id: 'exteriores',
    title: 'Exteriores',
    icon: <Building2 size={32} />,
    description: 'Protección y belleza duradera para la fachada de tu casa o negocio contra el clima.',
    className: 'bento-medium',
    bgImage: `${base}assets/servicios_exteriores_1788155093888.jpg`
  },
  {
    id: 'comercial',
    title: 'Comercial',
    icon: <PaintRoller size={32} />,
    description: 'Pintura a gran escala para oficinas y locales.',
    className: 'bento-small',
    bgImage: `${base}assets/servicios_comercial_1788155188198.jpg`
  },
  {
    id: 'restauracion',
    title: 'Restauración',
    icon: <PaintBucket size={32} />,
    description: 'Restauración y pintado de muebles de madera y metal.',
    className: 'bento-small',
    bgImage: `${base}assets/servicios_restauracion_1788155198506.jpg`
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Services = () => {
  const [activeSlider, setActiveSlider] = useState(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [storyIndex, setStoryIndex] = useState(0);

  const handleCardClick = (id) => {
    if (id === 'restauracion' || id === 'exteriores' || id === 'interiores' || id === 'comercial') {
      setActiveSlider(id);
      setSliderPosition(50); // Reset position for sliders
      setStoryIndex(0); // Reset position for stories
    }
  };

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  const getSliderInfo = () => {
    if (activeSlider === 'restauracion') {
      return {
        type: 'slider',
        title: 'Magia en Restauración',
        desc: 'Desliza para ver el asombroso cambio.',
        before: `${base}assets/restauracion_antes.jpeg`,
        after: `${base}assets/restauracion_despues.jpeg`,
        cta: 'Quiero restaurar mis muebles'
      };
    } else if (activeSlider === 'exteriores') {
      return {
        type: 'slider',
        title: 'Transformación de Exteriores',
        desc: 'Protección y belleza duradera para tu fachada.',
        before: `${base}assets/exterior_antes.jpeg`,
        after: `${base}assets/exterior_despues.jpeg`,
        cta: 'Renovar mi fachada'
      };
    } else if (activeSlider === 'interiores') {
      return {
        type: 'slider',
        title: 'Renovación de Interiores',
        desc: 'Ambientes que inspiran y reflejan tu estilo.',
        before: `${base}assets/interior_antes.jpeg`,
        after: `${base}assets/interior_despues.jpeg`,
        cta: 'Transformar mi hogar'
      };
    } else if (activeSlider === 'comercial') {
      return {
        type: 'story',
        title: 'Trabajos Comerciales',
        images: [
          `${base}assets/comercial_1.jpeg`,
          `${base}assets/comercial_2.jpeg`,
          `${base}assets/comercial_3.jpeg`,
          `${base}assets/comercial_4.jpeg`
        ]
      };
    }
    return null;
  };

  const sliderInfo = getSliderInfo();

  const handleStoryClick = (direction) => {
    if (activeSlider !== 'comercial') return;
    const totalStories = sliderInfo?.images?.length || 0;
    if (direction === 'next') {
      if (storyIndex < totalStories - 1) {
        setStoryIndex(storyIndex + 1);
      } else {
        setActiveSlider(null); // Close on last story
      }
    } else if (direction === 'prev') {
      if (storyIndex > 0) {
        setStoryIndex(storyIndex - 1);
      }
    }
  };

  return (
    <section className="services" id="servicios">
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Nuestros <span className="text-gradient">Servicios</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-subtitle"
          >
            Ofrecemos cualquier tipo de servicio de pintura para casas, departamentos, trabajo comercial y residencial, destacando por nuestra responsabilidad y limpieza.
          </motion.p>
        </div>

        <motion.div 
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className={`bento-card service-card ${service.className} ${(service.id === 'restauracion' || service.id === 'exteriores' || service.id === 'interiores' || service.id === 'comercial') ? 'clickable' : ''}`}
              variants={itemVariants}
              style={{ backgroundImage: `url(${service.bgImage})` }}
              onClick={() => handleCardClick(service.id)}
            >
              <div className="card-overlay"></div>
              <div className="service-content">
                <div className="service-icon-wrapper">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                {(service.id === 'restauracion' || service.id === 'exteriores' || service.id === 'interiores') && (
                  <span className="view-more-badge">Toca para ver Antes y Después</span>
                )}
                {service.id === 'comercial' && (
                  <span className="view-more-badge">Toca para ver nuestra galería</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Before/After & Stories Modal */}
      <AnimatePresence>
        {activeSlider && sliderInfo && (
          <motion.div 
            className="restoration-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSlider(null)}
          >
            <motion.div 
              className="restoration-modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setActiveSlider(null)}>
                <X size={24} />
              </button>
              
              {sliderInfo.type === 'slider' ? (
                <>
                  <div className="modal-header">
                    <h3>{sliderInfo.title}</h3>
                    <p>{sliderInfo.desc}</p>
                  </div>

                  <div className="comparison-slider-wrapper">
                    <div className="comparison-slider">
                      {/* Before Image (Base) */}
                      <img src={sliderInfo.before} alt={`Antes de ${activeSlider}`} className="img-before" />
                      <span className="label-before">ANTES</span>
                      
                      {/* After Image (Clipped) */}
                      <img 
                        src={sliderInfo.after} 
                        alt={`Después de ${activeSlider}`} 
                        className="img-after" 
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                      />
                      <span className="label-after" style={{ opacity: sliderPosition > 80 ? 0 : 1 }}>DESPUÉS</span>

                      {/* Slider Control */}
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={sliderPosition} 
                        onChange={handleSliderChange}
                        className="slider-input"
                      />

                      {/* Custom Handle UI */}
                      <div className="slider-handle" style={{ left: `${sliderPosition}%` }}>
                        <div className="slider-handle-line"></div>
                        <div className="slider-handle-button">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <a href="#contacto" className="btn-primary" onClick={() => setActiveSlider(null)}>
                      {sliderInfo.cta}
                    </a>
                  </div>
                </>
              ) : (
                <div className="story-container">
                  {/* Story Progress Bars */}
                  <div className="story-progress-container">
                    {sliderInfo.images.map((_, idx) => (
                      <div key={idx} className="story-progress-bar">
                        <div 
                          className="story-progress-fill" 
                          style={{ width: idx <= storyIndex ? '100%' : '0%' }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Story Image */}
                  <div className="story-image-wrapper">
                    <img 
                      src={sliderInfo.images[storyIndex]} 
                      alt={`Trabajo comercial ${storyIndex + 1}`} 
                      className="story-image"
                    />
                  </div>

                  {/* Story Controls */}
                  <div className="story-controls">
                    <div className="story-prev" onClick={() => handleStoryClick('prev')}>
                      {storyIndex > 0 && (
                        <div className="story-arrow">
                          <ChevronLeft size={32} />
                        </div>
                      )}
                    </div>
                    <div className="story-next" onClick={() => handleStoryClick('next')}>
                      <div className="story-arrow">
                        <ChevronRight size={32} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Tap Hint */}
                  <div className="story-hint">
                    Toca los lados para navegar
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
