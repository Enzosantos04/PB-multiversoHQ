import React, { useState } from 'react';
import styles from './modules/Contact.module.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    succeeded: false,
    error: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, succeeded: false, error: false });
    
    // ATENÇÃO: Substitua 'YOUR_FORM_ID' pelo seu ID real do Formspree (ex: mqkvzoxy)
    const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ submitting: false, succeeded: true, error: false });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        console.error('Erro Formspree:', data);
        setStatus({ submitting: false, succeeded: false, error: true });
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      setStatus({ submitting: false, succeeded: false, error: true });
    }
  };

  return (
    <div className={styles.app}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroCategory}>Atendimento</span>
          <h1>Entre em Contato</h1>
          <p className={styles.description}>
            Dúvidas, sugestões ou apenas quer bater um papo sobre quadrinhos? 
            Estamos aqui para ajudar!
          </p>
        </div>
      </header>

      <section className={styles.contactSection}>
        <div className={styles.wrapper}>
          {!status.succeeded ? (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <span>NOME</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome completo"
                />
              </div>

              <div className={styles.field}>
                <span>E-MAIL</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu.email@exemplo.com"
                />
              </div>

              <div className={styles.field}>
                <span>MENSAGEM</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Como podemos ajudar?"
                />
              </div>

              <button 
                type="submit" 
                className={styles.submitButton} 
                disabled={status.submitting}
              >
                {status.submitting ? 'ENVIANDO...' : 'ENVIAR MENSAGEM'}
              </button>

              {status.error && (
                <div style={{ color: '#dc2626', marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>
                  Ocorreu um erro no envio. Verifique o ID do Formspree ou sua conexão.
                </div>
              )}
            </form>
          ) : (
            <div className={styles.successMessage}>
              Sua mensagem foi enviada com sucesso! 🚀
              <br />
              <small style={{ fontWeight: 400, opacity: 0.8 }}>Entraremos em contato em breve.</small>
              <button 
                onClick={() => setStatus({ ...status, succeeded: false })}
                style={{ 
                  display: 'block', 
                  margin: '1rem auto 0', 
                  background: 'none', 
                  border: '1px solid currentColor', 
                  padding: '5px 15px', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  color: 'inherit'
                }}
              >
                Enviar outra mensagem
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Contact;
