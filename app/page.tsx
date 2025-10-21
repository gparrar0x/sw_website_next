import Header from "@/components/header";
import HeroAnimations from "@/components/hero-animations";
import WhatsAppButton from "@/components/whatsapp-button";
import ContactForm from "@/components/contact-form";

export default function Home() {
  return (
    <div>
      <HeroAnimations />
      <WhatsAppButton />
      <Header />

      {/* Hero Section */}
      <section className="sw-hero" id="inicio">
        <div className="sw-hero-background">
          <div className="sw-gradient-orb sw-orb-1"></div>
          <div className="sw-gradient-orb sw-orb-2"></div>
          <div className="sw-gradient-orb sw-orb-3"></div>
        </div>
        <div className="sw-container">
          <div className="sw-hero-content">
            <div className="sw-hero-badge">
              <span className="sw-badge-dot"></span>
              Agencia de Automatización Empresarial
            </div>
            <h1 className="sw-hero-title">
              <span className="sw-highlight">Soluciones digitales a medida para tu negocio</span>
            </h1>
            <p className="sw-hero-subtitle">
              Transformamos procesos manuales en sistemas inteligentes que trabajan 24/7
            </p>
            <div className="sw-hero-cta">
              <a href="#contacto" className="sw-btn-primary">
                Contáctanos
                <span className="sw-btn-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="sw-services" id="servicios">
        <div className="sw-container">
          <div className="sw-section-header">
            <h2 className="sw-section-title">Nuestros Servicios</h2>
            <p className="sw-section-subtitle">Transformamos tu negocio con automatización inteligente que genera resultados reales</p>
          </div>
          <div className="sw-services-grid">
            <div className="sw-service-card">
              <div className="sw-service-icon">🤖</div>
              <h3>Agentes Conversacionales Inteligentes</h3>
              <p>Tu equipo de ventas 24/7 que nunca duerme. Atención al cliente personalizada que aumenta conversiones y reduce costos operativos.</p>
              <ul className="sw-service-features">
                <li>Respuestas instantáneas en WhatsApp y web</li>
                <li>Clientes más felices con atención personalizada</li>
                <li>70% menos consultas repetitivas</li>
                <li>Ventas que nunca se detienen</li>
              </ul>
            </div>
            <div className="sw-service-card">
              <div className="sw-service-icon">🔄</div>
              <h3>Automatización que Libera tu Tiempo</h3>
              <p>Convierte tareas manuales en procesos automáticos. Desde capturar leads hasta generar reportes - todo funciona solo mientras duermes.</p>
              <ul className="sw-service-features">
                <li>Elimina el trabajo repetitivo de tu equipo</li>
                <li>Procesos más rápidos y sin errores</li>
                <li>Escala tu negocio sin contratar más personal</li>
                <li>Enfoque en lo que realmente importa</li>
              </ul>
            </div>
            <div className="sw-service-card">
              <div className="sw-service-icon">🚀</div>
              <h3>Transformación Digital Completa</h3>
              <p>Moderniza tu empresa con software personalizado diseñado específicamente para tus procesos únicos. Dejamos atrás las herramientas genéricas por soluciones que se adaptan perfectamente a tu negocio.</p>
              <ul className="sw-service-features">
                <li>Software a medida para tu negocio específico</li>
                <li>Análisis completo de procesos actuales</li>
                <li>Operaciones más eficientes y rentables</li>
                <li>Capacitación y transferencia de conocimiento</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="sw-contact" id="contacto">
        <div className="sw-container">
          <div className="sw-contact-content">
            <div className="sw-contact-info">
              <h2>¿Listo para automatizar tu empresa?</h2>
              <p>Agenda una consulta gratuita de 30 minutos con nuestro equipo. Analizaremos tu situación actual y diseñaremos una estrategia de automatización personalizada para tu negocio.</p>
              <div className="sw-founder-card">
                <div className="sw-founder-avatar">🚀</div>
                <div className="sw-founder-info">
                  <h4>Skywalking.dev</h4>
                  <p>Agencia de Automatización con IA</p>
                  <div className="sw-founder-stats">
                    <span>San Martin de los Andes, Argentina</span>
                    <span>Especialistas en AI + Automatización</span>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sw-footer">
        <div className="sw-container">
          <div className="sw-footer-content">
            <div className="sw-footer-brand">
              <div className="sw-brand">
                <span className="sw-brand-icon">🚀</span>
                <span>Skywalking.dev</span>
              </div>
              <p>Agencia de Automatización Empresarial con IA</p>
              <p>Transformando empresas LATAM, un proceso a la vez.</p>
            </div>
            <div className="sw-footer-links">
              <div className="sw-footer-section">
                <h4>Servicios</h4>
                <ul>
                  <li><a href="#servicios">Agentes Conversacionales</a></li>
                  <li><a href="#servicios">Automatización de Procesos</a></li>
                  <li><a href="#servicios">Transformación Digital</a></li>
                </ul>
              </div>
              <div className="sw-footer-section">
                <h4>Contacto</h4>
                <ul>
                  <li><a href="#contacto">Consulta Gratuita</a></li>
                  <li><a href="mailto:hola@skywalking.dev">info@skywalking.dev</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="sw-footer-bottom">
            <p>&copy; 2025 Skywalking.dev. Todos los derechos reservados.</p>
            <p>Caminos con ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
