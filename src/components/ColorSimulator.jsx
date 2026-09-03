import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paintbrush, ArrowLeft, Wand2 } from 'lucide-react';
import './ColorSimulator.css';

// Estructura de familias de colores al estilo Comex
const colorFamilies = [
  {
    id: 'off-whites', name: 'Off Whites', color: '#F8F8F2',
    shades: [
      { id: 'w1', name: 'Blanco Puro', hex: '#FFFFFF' },
      { id: 'w2', name: 'Blanco Ostra', hex: '#F4F4EB' },
      { id: 'w3', name: 'Blanco Humo', hex: '#F0F0F0' },
      { id: 'w4', name: 'Algodón', hex: '#FBFBF9' },
      { id: 'w5', name: 'Lino', hex: '#FAF0E6' },
      { id: 'w6', name: 'Marfil', hex: '#FFFFF0' },
    ]
  },
  {
    id: 'amarillos', name: 'Amarillos', color: '#FDE047',
    shades: [
      { id: 'y1', name: 'Luz de Sol', hex: '#FEF08A' },
      { id: 'y2', name: 'Trigo', hex: '#FDE047' },
      { id: 'y3', name: 'Mostaza', hex: '#EAB308' },
      { id: 'y4', name: 'Oro Viejo', hex: '#CA8A04' },
      { id: 'y5', name: 'Girasol', hex: '#EAB308' },
      { id: 'y6', name: 'Ocre', hex: '#B45309' },
    ]
  },
  {
    id: 'naranjas', name: 'Naranjas', color: '#F97316',
    shades: [
      { id: 'o1', name: 'Melocotón', hex: '#FFEDD5' },
      { id: 'o2', name: 'Mandarina', hex: '#FB923C' },
      { id: 'o3', name: 'Calabaza', hex: '#F97316' },
      { id: 'o4', name: 'Ladrillo', hex: '#C2410C' },
      { id: 'o5', name: 'Coral', hex: '#F87171' },
      { id: 'o6', name: 'Óxido', hex: '#9A3412' },
    ]
  },
  {
    id: 'rojos', name: 'Rojos', color: '#EF4444',
    shades: [
      { id: 'r1', name: 'Rosa Pálido', hex: '#FECDD3' },
      { id: 'r2', name: 'Cereza', hex: '#F43F5E' },
      { id: 'r3', name: 'Carmín', hex: '#E11D48' },
      { id: 'r4', name: 'Vino Tinto', hex: '#9F1239' },
      { id: 'r5', name: 'Granate', hex: '#881337' },
      { id: 'r6', name: 'Rubí', hex: '#BE123C' },
    ]
  },
  {
    id: 'azules', name: 'Azules', color: '#3B82F6',
    shades: [
      { id: 'b1', name: 'Cielo', hex: '#BAE6FD' },
      { id: 'b2', name: 'Océano', hex: '#38BDF8' },
      { id: 'b3', name: 'Zafiro', hex: '#2563EB' },
      { id: 'b4', name: 'Nocturno', hex: '#1E3A8A' },
      { id: 'b5', name: 'Índigo', hex: '#3730A3' },
      { id: 'b6', name: 'Cobalto', hex: '#1D4ED8' },
    ]
  },
  {
    id: 'verdes', name: 'Verdes', color: '#10B981',
    shades: [
      { id: 'g1', name: 'Menta', hex: '#A7F3D0' },
      { id: 'g2', name: 'Manzana', hex: '#34D399' },
      { id: 'g3', name: 'Esmeralda', hex: '#10B981' },
      { id: 'g4', name: 'Bosque', hex: '#065F46' },
      { id: 'g5', name: 'Oliva', hex: '#65A30D' },
      { id: 'g6', name: 'Pino', hex: '#166534' },
    ]
  },
  {
    id: 'neutros', name: 'Neutros', color: '#A8A29E',
    shades: [
      { id: 'n1', name: 'Arena', hex: '#E7E5E4' },
      { id: 'n2', name: 'Piedra', hex: '#D6D3D1' },
      { id: 'n3', name: 'Topo', hex: '#A8A29E' },
      { id: 'n4', name: 'Marrón Oscuro', hex: '#57534E' },
      { id: 'n5', name: 'Chocolate', hex: '#451A03' },
      { id: 'n6', name: 'Moca', hex: '#78350F' },
    ]
  },
  {
    id: 'grises', name: 'Grises', color: '#6B7280',
    shades: [
      { id: 'gr1', name: 'Gris Perla', hex: '#F3F4F6' },
      { id: 'gr2', name: 'Gris Acero', hex: '#9CA3AF' },
      { id: 'gr3', name: 'Gris Plomo', hex: '#4B5563' },
      { id: 'gr4', name: 'Carbón', hex: '#1F2937' },
      { id: 'gr5', name: 'Ceniza', hex: '#374151' },
      { id: 'gr6', name: 'Asfalto', hex: '#111827' },
    ]
  },
];

const base = import.meta.env.BASE_URL;
const scenes = [
  { id: '2', name: 'Paleta 2', image: `${base}assets/simulator/p2-orig.jpeg`, mask: `${base}assets/simulator/p2-mask.jpeg` },
  { id: '3', name: 'Paleta 3', image: `${base}assets/simulator/p3-orig.png`, mask: `${base}assets/simulator/p3-mask.png` }
];

const ColorSimulator = () => {
  const [activeScene, setActiveScene] = useState(scenes[0]);
  const [activeFamily, setActiveFamily] = useState(null);
  const [activeColor, setActiveColor] = useState(colorFamilies[0].shades[0]); // Default white
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef(null);

  const filteredFamilies = activeScene.id === '2' 
    ? colorFamilies.filter(f => !['amarillos', 'rojos', 'naranjas'].includes(f.id)) 
    : colorFamilies;

  // Reset forbidden colors when switching to a restricted scene
  useEffect(() => {
    if (activeScene.id === '2') {
      const forbidden = ['amarillos', 'rojos', 'naranjas'];
      if (activeFamily && forbidden.includes(activeFamily.id)) {
        setActiveFamily(null);
      }
      
      const isColorForbidden = colorFamilies.find(f => f.shades.some(s => s.id === activeColor.id))?.id;
      if (forbidden.includes(isColorForbidden)) {
        setActiveColor(colorFamilies[0].shades[0]); // Reset to white
      }
    }
  }, [activeScene, activeFamily, activeColor]);

  // Algoritmo Profesional de Enmascarado y Protección de Detalles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    setProcessing(true);

    const baseImg = new Image();
    baseImg.crossOrigin = "Anonymous";
    baseImg.src = activeScene.image;

    baseImg.onload = () => {
      const maskImg = new Image();
      maskImg.crossOrigin = "Anonymous";
      maskImg.src = activeScene.mask;

      maskImg.onload = () => {
        // 1. Ajustar el canvas principal a la imagen original
        canvas.width = baseImg.width;
        canvas.height = baseImg.height;
        ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);
        const baseData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // 2. Crear un canvas temporal para la máscara. 
        // Esto auto-escala la máscara al tamaño exacto de la foto original, corrigiendo desajustes.
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = canvas.width;
        maskCanvas.height = canvas.height;
        const maskCtx = maskCanvas.getContext('2d');
        maskCtx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
        const maskData = maskCtx.getImageData(0, 0, canvas.width, canvas.height);
        
        // 3. Forzar máscara invertida ya que todas las máscaras proporcionadas por el usuario 
        // tienen el fondo blanco/opaco y la pared negra/transparente.
        const invertMask = true;

        const data = baseData.data;
        const mData = maskData.data;
        
        // Convertir el color seleccionado a RGB
        const hex = activeColor.hex.replace('#', '');
        const activeR = parseInt(hex.substring(0, 2), 16);
        const activeG = parseInt(hex.substring(2, 4), 16);
        const activeB = parseInt(hex.substring(4, 6), 16);

        // Procesamiento Píxel por Píxel
        for (let i = 0; i < data.length; i += 4) {
          const pixelIndex = i / 4;
          const x = pixelIndex % canvas.width;
          const y = Math.floor(pixelIndex / canvas.width);

          const mAlpha = mData[i + 3];
          const mBrightness = (mData[i] + mData[i + 1] + mData[i + 2]) / 3;
          
          let maskWeight = 0;
          if (invertMask) {
            maskWeight = (mAlpha < 128) ? 1.0 : (255 - mBrightness) / 255;
          } else {
            maskWeight = (mAlpha < 128) ? 0.0 : mBrightness / 255;
          }

          // PROTEGER EL PISO EN LA IMAGEN 3 (Filtro Y estricto)
          if (activeScene.id === '3' && maskWeight > 0) {
            // La pared termina aproximadamente en el 72% de la imagen hacia abajo.
            // Todo lo que esté por debajo del 73% de la altura lo forzamos a 0 para no pintar el piso.
            const floorThreshold = canvas.height * 0.73;
            if (y > floorThreshold) {
              maskWeight = 0;
            } else if (y > canvas.height * 0.70) {
              // Suavizado en la transición del zoclo (baseboard)
              const fade = 1 - ((y - (canvas.height * 0.70)) / (canvas.height * 0.03));
              maskWeight *= fade;
            }
          }

          if (maskWeight > 0) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // ALGORITMO PROFESIONAL "BLEND-IF" (Protección de sombras)
            const luma = 0.299 * r + 0.587 * g + 0.114 * b;
            
            // Protección de sombras y marcos (suavizado más conservador)
            if (luma < 30) {
              maskWeight *= (luma / 30); 
            }

            // Aplicar técnica MULTIPLY matemática (respeta las texturas de la pared)
            const r_paint = (r * activeR) / 255;
            const g_paint = (g * activeG) / 255;
            const b_paint = (b * activeB) / 255;

            // Mezcla final según el peso de la máscara y la protección
            data[i] = r * (1 - maskWeight) + r_paint * maskWeight;
            data[i + 1] = g * (1 - maskWeight) + g_paint * maskWeight;
            data[i + 2] = b * (1 - maskWeight) + b_paint * maskWeight;
          }
        }

        ctx.putImageData(baseData, 0, 0);
        setProcessing(false);
      };
    };
  }, [activeScene, activeColor]);

  return (
    <section className="simulator" id="simulador">
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Decorador <span className="text-gradient">Virtual</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-subtitle"
          >
            Experimenta cómo se verían nuestros colores premium en tu próximo proyecto. Selecciona una escena y pinta la pared.
          </motion.p>
        </div>

        <div className="simulator-container bento-card">
          
          {/* Controls / Palette */}
          <div className="simulator-controls">
            
            <div className="color-palette-advanced">
              
              <AnimatePresence mode="wait">
                {!activeFamily ? (
                  /* VISTA 1: FAMILIAS DE COLOR */
                  <motion.div
                    key="families"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="palette-title">Paletas de Color</h3>
                    <div className="family-grid">
                      {filteredFamilies.map((family) => (
                        <button
                          key={family.id}
                          className="family-swatch"
                          style={{ backgroundColor: family.color }}
                          onClick={() => setActiveFamily(family)}
                        >
                          <span className="family-name" style={{ color: isDarkColor(family.color) ? '#fff' : '#000' }}>
                            {family.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  /* VISTA 2: TONOS DE LA FAMILIA SELECCIONADA */
                  <motion.div
                    key="shades"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="shades-view"
                  >
                    <div className="shades-header">
                      <button className="back-btn" onClick={() => setActiveFamily(null)}>
                        <ArrowLeft size={20} />
                      </button>
                      <h3 className="palette-title">{activeFamily.name}</h3>
                    </div>
                    
                    <div className="color-grid advanced-grid">
                      {activeFamily.shades.map((shade) => (
                        <button
                          key={shade.id}
                          className={`color-swatch ${activeColor.id === shade.id ? 'active' : ''}`}
                          style={{ backgroundColor: shade.hex }}
                          onClick={() => setActiveColor(shade)}
                          title={shade.name}
                        >
                          {activeColor.id === shade.id && (
                            <Paintbrush size={16} color={isDarkColor(shade.hex) ? '#fff' : '#000'} />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="active-color-info">
                      <strong>Seleccionado:</strong> {activeColor.name}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
            
            <div className="cta-wrapper">
              <div className="pro-indicator">
                <Wand2 size={12}/> Corrección IA activada
              </div>
              <a href="#contacto" className="btn-primary w-full" style={{ marginTop: '0.5rem' }}>
                Cotizar este color
              </a>
            </div>
          </div>

          {/* Interactive Canvas */}
          <div className="simulator-canvas">
            {/* Gallery Selector */}
            <div className="scene-selector">
              {scenes.map((scene) => (
                <button 
                  key={scene.id}
                  className={`scene-thumbnail ${activeScene.id === scene.id ? 'active' : ''}`}
                  onClick={() => setActiveScene(scene)}
                  style={{ backgroundImage: `url(${scene.image})` }}
                  title={scene.name}
                >
                </button>
              ))}
            </div>

            <div className="canvas-main-area">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="canvas-wrapper"
              >
                {/* El Canvas ahora dibuja la foto original y aplica la corrección matemática encima */}
                <canvas 
                  ref={canvasRef}
                  className={`color-overlay canvas-mask ${processing ? 'processing' : ''}`}
                />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Helper function to determine contrast for text/icons on color swatches
function isDarkColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma < 128;
}

export default ColorSimulator;
