import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Portfolio.css';

// Generar array de 16 imágenes (asumiendo que están nombradas work1.jpeg a work16.jpeg)
const projects = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  image: `/assets/carousel/work${i + 1}.jpeg`,
  title: `Proyecto ${i + 1}`,
}));

const Portfolio = () => {
  return (
    <section className="portfolio" id="portafolio">
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Nuestro <span className="text-gradient">Trabajo</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-subtitle"
          >
            Explora una selección de nuestros proyectos recientes. Cada espacio cuenta una historia de transformación y calidad. Desliza para ver más.
          </motion.p>
        </div>
      </div>

      {/* Contenedor completo para el Carrusel 3D para que pueda salirse un poco de los márgenes */}
      <motion.div 
        className="carousel-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
      >
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 20, // Rotación 3D
            stretch: 0, // Espacio entre slides
            depth: 250, // Profundidad 3D (Z-axis)
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="mySwiper"
          initialSlide={2} // Empezar en el centro
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id} className="swiper-slide-3d">
              <div className="slide-content">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="slide-overlay">
                  <h3>{project.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default Portfolio;
