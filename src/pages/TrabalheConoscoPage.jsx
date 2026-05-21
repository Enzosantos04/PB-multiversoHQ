import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './modules/TrabalheConoscoPage.module.css';

function TrabalheConoscoPage() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1>Trabalhe Conosco</h1>
        
        <section>
          <h2>Faça parte do nosso Universo!</h2>
          <p>
            No MultiversoHQ, somos apaixonados por histórias, arte e tecnologia. Se você é um fã de quadrinhos, 
            entusiasta da cultura geek e quer ajudar a construir a maior comunidade nerd do Brasil, você está no lugar certo.
          </p>
          <p>
            Valorizamos a criatividade, a diversidade e o compromisso com a experiência do leitor. 
            Confira nossas oportunidades e venha escrever o próximo capítulo conosco.
          </p>
        </section>

        <section>
          <h2>Por que trabalhar na MultiversoHQ?</h2>
          <ul>
            <li>Ambiente dinâmico e criativo.</li>
            <li>Cultura de aprendizado contínuo.</li>
            <li>Acesso em primeira mão às novidades do mundo geek.</li>
            <li>Horários flexíveis e foco em resultados.</li>
            <li>Equipe apaixonada e colaborativa.</li>
          </ul>
        </section>

        <section>
          <h2>Vagas Abertas</h2>
          <div className={styles.careerGrid}>
            <div className={styles.careerCard}>
              <h3>Curador de Conteúdo (HQs)</h3>
              <span className={styles.location}>Remoto / Rio de Janeiro</span>
              <p>Responsável pela seleção de títulos e criação de resenhas para o nosso clube de assinaturas.</p>
              <button className={styles.applyButton}>Candidate-se</button>
            </div>

            <div className={styles.careerCard}>
              <h3>Desenvolvedor Front-end (React)</h3>
              <span className={styles.location}>Remoto</span>
              <p>Irá atuar na melhoria contínua da nossa plataforma e na criação de novas experiências interativas.</p>
              <button className={styles.applyButton}>Candidate-se</button>
            </div>

            <div className={styles.careerCard}>
              <h3>Social Media Specialist</h3>
              <span className={styles.location}>Rio de Janeiro</span>
              <p>Gerenciamento de comunidades e criação de conteúdo épico para nossas redes sociais.</p>
              <button className={styles.applyButton}>Candidate-se</button>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '50px', textAlign: 'center' }}>
          <h2>Não encontrou sua vaga?</h2>
          <p>
            Envie seu currículo para o nosso banco de talentos através do e-mail: 
            <strong> talentos@multiversohq.com.br</strong>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default TrabalheConoscoPage;
