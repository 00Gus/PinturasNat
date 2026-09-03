import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact" id="contacto">
      <div className="container">
        <div className="contact-wrapper bento-card">
          <div className="contact-info">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              ¿Listo para <br/>
              <span className="text-gradient">transformar tu espacio?</span>
            </motion.h2>
            <p className="contact-desc">
              Ponte en contacto con nosotros para un presupuesto gratuito y sin compromiso. Nos pondremos en contacto contigo lo antes posible.
            </p>
            
            <div className="info-list">
              <div className="info-item">
                <div className="info-icon"><MapPin size={20} /></div>
                <div>
                  <strong>Área de Servicio</strong>
                  <p>Morelia, Michoacán</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Phone size={20} /></div>
                <div>
                  <strong>Teléfono</strong>
                  <p>+52 (123) 456-7890</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Mail size={20} /></div>
                <div>
                  <strong>Correo Electrónico</strong>
                  <p>contacto@pinturassolis.com</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Clock size={20} /></div>
                <div>
                  <strong>Horario de Atención</strong>
                  <p>Lunes - Sábado: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><MapPin size={20} style={{opacity: 0}}/></div>
                <div>
                  <strong>Redes Sociales</strong>
                  <p>Síguenos en Instagram, Facebook y TikTok</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <h3>Solicitar Presupuesto</h3>
              <div className="form-group">
                <label htmlFor="name">Nombre Completo</label>
                <input type="text" id="name" placeholder="Ej. Juan Pérez" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input type="tel" id="phone" placeholder="Ej. 123 456 7890" required />
              </div>
              <div className="form-group">
                <label htmlFor="service">Servicio de Interés</label>
                <select id="service">
                  <option>Cualquier tipo de servicio</option>
                  <option>Pintura para Casas</option>
                  <option>Pintura para Departamentos</option>
                  <option>Trabajo Comercial</option>
                  <option>Trabajo Residencial</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje / Detalles (Opcional)</label>
                <textarea id="message" rows="4" placeholder="Cuéntanos un poco sobre tu proyecto..."></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">
                Enviar Solicitud
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
