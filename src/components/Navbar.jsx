import React from 'react';
import { Menu, PaintRoller } from 'lucide-react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container nav-container">
        {/* Logo Tipográfico Premium */}
        <div className="nav-logo">
          <div className="logo-icon">
            <PaintRoller size={24} />
          </div>
          <span className="logo-text">Pinturas Solís</span>
        </div>

        {/* Desktop Links */}
        <ul className="nav-links">
          {['Servicios', 'Simulador', 'Portafolio', 'Testimonios'].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="nav-actions">
          <a href="#contacto" className="btn-primary desktop-btn">
            Solicitar Presupuesto
          </a>
          <button className="mobile-menu-btn">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
