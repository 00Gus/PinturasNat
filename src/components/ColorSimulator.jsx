import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paintbrush, ArrowLeft, Wand2 } from 'lucide-react';
import './ColorSimulator.css';

// Estructura de familias de colores al estilo Comex / Dunn-Edwards
const colorFamilies = [
  {
    id: 'clasica', name: 'Favoritos en Morelia', color: '#B1AFAE',
    shades: [
      { id: 'c1', name: 'DET618 Industrial Age', hex: '#B1AFAE' },
      { id: 'c2', name: 'DE6328 Anchor Gray', hex: '#5A6266' },
      { id: 'c3', name: 'DET453 Majolica Earthenware', hex: '#A35E4B' },
      { id: 'c4', name: 'DET584 Postwar Boom', hex: '#4B739B' },
      { id: 'c5', name: 'DET657 Bakelite Yellow', hex: '#C7B576' },
      { id: 'c6', name: 'DET652 Sunbaked Adobe', hex: '#B49E69' },
      { id: 'c7', name: 'DET653 Historic White', hex: '#EBE8D8' },
      { id: 'c8', name: 'DET607 Life Aquatic', hex: '#98ACA3' },
      { id: 'c9', name: 'DEC728 Madera', hex: '#EAC88B' },
      { id: 'c10', name: 'DEW340 Whisper', hex: '#F4F2EC' },
      { id: 'c11', name: 'DET504 That\'s Atomic', hex: '#AAB186' },
      { id: 'c12', name: 'DET681 Moderne Class', hex: '#735A45' },
    ]
  },
  {
    id: 'mediterranea', name: 'Estilo Colonial', color: '#BC8A51',
    shades: [
      { id: 'm1', name: 'DET685 Mission Gold', hex: '#BC8A51' },
      { id: 'm2', name: 'DEW336 White Sand', hex: '#EFE8D6' },
      { id: 'm3', name: 'DEA175 Black Forest', hex: '#545A4D' },
      { id: 'm4', name: 'DET454 Arizona Clay', hex: '#B86D53' },
      { id: 'm5', name: 'DE6066 Desert Rock', hex: '#D2C8BC' },
      { id: 'm6', name: 'DET694 Carmel Mission', hex: '#947F75' },
      { id: 'm7', name: 'DET695 Grange Hall', hex: '#8B7C71' },
      { id: 'm8', name: 'DE6070 Chocolate Chunk', hex: '#5A483F' },
      { id: 'm9', name: 'DET513 California Sagebrush', hex: '#8A9884' },
      { id: 'm10', name: 'DEW340 Whisper', hex: '#F4F2EC' },
      { id: 'm11', name: 'DET602 Gray Monument', hex: '#697A79' },
      { id: 'm12', name: 'DE5362 Maple Syrup', hex: '#C59B3F' },
    ]
  },
  {
    id: 'neutros', name: 'Neutros y Modernos', color: '#928E84',
    shades: [
      { id: 'n1', name: 'DE6225 Fossil', hex: '#EFEFE8' },
      { id: 'n2', name: 'DE6228 Play on Gray', hex: '#A7ABA4' },
      { id: 'n3', name: 'DET620 Barnwood Gray', hex: '#928E84' },
      { id: 'n4', name: 'DET514 Smoke & Ash', hex: '#8C9C90' },
      { id: 'n5', name: 'DET635 Ecru Wealth', hex: '#D0CBB2' },
      { id: 'n6', name: 'DET512 Whale Watching', hex: '#9CA496' },
      { id: 'n7', name: 'DET626 Metal Fringe', hex: '#817D77' },
      { id: 'n8', name: 'DET656 Heart of Gold', hex: '#AE8C3B' },
      { id: 'n9', name: 'DEC751 Ash Gray', hex: '#C2B9AF' },
      { id: 'n10', name: 'DEC750 Bison Beige', hex: '#9C8C7C' },
      { id: 'n11', name: 'DET624 Sorrel Felt', hex: '#A89A8A' },
      { id: 'n12', name: 'DET634 Downing to Earth', hex: '#544E43' },
    ]
  }
];

const base = import.meta.env.BASE_URL;
const scenes = [
  { id: '2', name: 'Paleta 2', image: `${base}assets/simulator/p2-orig.jpeg`, mask: `${base}assets/simulator/p2-mask.jpeg` },
  { id: '3', name: 'Paleta 3', image: `${base}assets/simulator/p3-orig.png`, mask: `${base}assets/simulator/p3-mask.png` }
];

const ColorSimulator = () => {
  const [activeScene, setActiveScene] = useState(scenes[0]);
  const [activeFamily, setActiveFamily] = useState(null);
  const [activeColor, setActiveColor] = useState(colorFamilies[0].shades[6]); // Default Historic White
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef(null);

  // Todas las colecciones disponibles sin restricción, al ser paletas curadas
  const filteredFamilies = colorFamilies;

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

          // PROTEGER EL PISO EN LA IMAGEN AMUEBLADA
          if (activeScene.id === '2' && maskWeight > 0) {
            // Sala amueblada: el piso es muy oscuro y la pared es gris claro.
            // Protegemos los tonos oscuros en la mitad inferior de la imagen.
            const r = data[i];
            const g = data[i+1];
            const b = data[i+2];
            const luma = 0.299 * r + 0.587 * g + 0.114 * b;
            
            if (y > canvas.height * 0.55 && luma < 90) {
              maskWeight = 0; // Protege el piso oscuro
            }
            // Además, un corte estricto al fondo por si acaso
            if (y > canvas.height * 0.85) {
              maskWeight = 0;
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
                    
                    <div className="color-grid circular-grid">
                      {activeFamily.shades.map((shade) => (
                        <div key={shade.id} className="color-swatch-wrapper">
                          <button
                            className={`color-swatch-circle ${activeColor.id === shade.id ? 'active' : ''}`}
                            style={{ backgroundColor: shade.hex }}
                            onClick={() => setActiveColor(shade)}
                            title={shade.name}
                          >
                            {activeColor.id === shade.id && (
                              <Paintbrush size={20} color={isDarkColor(shade.hex) ? '#fff' : '#000'} className="active-icon" />
                            )}
                          </button>
                          <span className="color-swatch-label">{shade.name}</span>
                        </div>
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
