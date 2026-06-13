import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './modules/SobrePage.module.css';

function SobrePage() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1>Sobre o Grupo MultiversoHQ</h1>
        
        <section className={styles.storySection}>
          <div className={styles.storyContent}>
            <h2>Nossa História</h2>
            <p>
              O MultiversoHQ nasceu da paixão compartilhada de um grupo de colecionadores por histórias que transcendem a realidade. 
              Fundado em 2020, começamos como um pequeno fã-clube e evoluímos para nos tornar o maior portal e clube de assinaturas de quadrinhos do Brasil.
            </p>
            <p>
              Nossa missão é conectar fãs às suas histórias favoritas, facilitando o acesso a títulos da Marvel, DC e editoras independentes, 
              garantindo que cada edição chegue às mãos do leitor em perfeitas condições.
            </p>
          </div>
        </section>

        <section>
          <h2>O Que Fazemos</h2>
          <p>
            Muito mais do que uma loja, somos uma comunidade. Oferecemos um catálogo vasto, notícias atualizadas do mundo nerd, 
            e planos de assinatura personalizados que entregam experiências únicas mensalmente.
          </p>
        </section>

        <section>
          <h2>Nossos Valores</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3>Paixão</h3>
              <p>Vivemos e respiramos a cultura geek. Cada detalhe do nosso serviço é pensado por quem ama o que faz.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Qualidade</h3>
              <p>Comprometimento com a excelência, desde a seleção dos títulos até o cuidado com a embalagem de entrega.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Comunidade</h3>
              <p>Valorizamos a voz dos nossos leitores e promovemos um ambiente inclusivo para todos os fãs.</p>
            </div>
          </div>
        </section>

        <p className={styles.footerNote}>
          MultiversoHQ - Unindo universos, uma página de cada vez.
        </p>
      </main>
      <Footer />
    </>
  );
}

export default SobrePage;
