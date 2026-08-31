import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, PaintBucket, PaintRoller, Wallpaper, Sparkles } from 'lucide-react';
import './Services.css';

const base = import.meta.env.BASE_URL;
const services = [
  {
    title: 'Interiores',
    icon: <Home size={32} />,
    description: 'Transformamos el interior de tu hogar con acabados perfectos y colores que reflejan tu estilo de vida.',
    className: 'bento-large',
    bgImage: `${base}assets/servicios_interiores_1788154954081.jpg`
  },
  {
    title: 'Exteriores',
    icon: <Building2 size={32} />,
    description: 'Protección y belleza duradera para la fachada de tu casa o negocio contra el clima.',
    className: 'bento-medium',
    bgImage: `${base}assets/servicios_exteriores_1788155093888.jpg`
  },
  {
    title: 'Acabados Especiales',
    icon: <Sparkles size={32} />,
    description: 'Texturas, estucos y efectos visuales únicos.',
    className: 'bento-small',
    bgImage: `${base}assets/servicios_acabados_1788155116960.jpg`
  },
  {
    title: 'Papel Tapiz',
    icon: <Wallpaper size={32} />,
    description: 'Instalación profesional de papel tapiz con precisión milimétrica.',
    className: 'bento-small',
    bgImage: `${base}assets/servicios_papel_tapiz_1788155162328.jpg`
  },
  {
    title: 'Comercial',
    icon: <PaintRoller size={32} />,
    description: 'Pintura a gran escala para oficinas y locales.',
    className: 'bento-medium',
    bgImage: `${base}assets/servicios_comercial_1788155188198.jpg`
  },
  {
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
            Ofrecemos soluciones integrales de pintura y recubrimientos para cualquier tipo de proyecto, asegurando siempre la máxima calidad.
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
              className={`bento-card service-card ${service.className}`}
              variants={itemVariants}
              style={{ backgroundImage: `url(${service.bgImage})` }}
            >
              <div className="card-overlay"></div>
              <div className="service-content">
                <div className="service-icon-wrapper">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
