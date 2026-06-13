import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './modules/TrocasDevolucoesPage.module.css';

function TrocasDevolucoesPage() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1>Trocas e Devoluções</h1>
        
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '40px' }}>
          Sua satisfação é nossa prioridade. Se precisar trocar ou devolver um produto, siga as orientações abaixo.
        </p>

        <section>
          <h2>Como solicitar?</h2>
          <div className={styles.stepGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <h3>Contato</h3>
              <p>Envie um e-mail para <strong>sac@multiversohq.com.br</strong> com o número do seu pedido e o motivo da solicitação.</p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h3>Análise</h3>
              <p>Nossa equipe analisará sua solicitação em até 2 dias úteis e enviará as instruções de postagem.</p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <h3>Envio</h3>
              <p>O produto deve ser enviado em sua embalagem original, sem indícios de uso, acompanhado da nota fiscal.</p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>4</div>
              <h3>Resolução</h3>
              <p>Após o recebimento e conferência, realizaremos a troca por um novo item ou o estorno do valor pago.</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Prazos e Condições</h2>
          <div className={styles.infoBox}>
            <h3>Arrependimento de Compra</h3>
            <p>Você tem até <strong>7 dias corridos</strong> após o recebimento para desistir da compra e solicitar o reembolso total.</p>
          </div>

          <div className={styles.infoBox}>
            <h3>Produtos com Defeito</h3>
            <p>Caso sua HQ chegue com algum defeito de fabricação ou dano de transporte, o prazo para solicitação é de até <strong>30 dias corridos</strong>.</p>
          </div>

          <div className={styles.infoBox}>
            <h3>Condições do Produto</h3>
            <p>Para que a troca ou devolução seja aceita, o produto não deve apresentar sinais de leitura, dobras ou danos causados por mau uso.</p>
          </div>
        </section>

        <section style={{ marginTop: '50px', textAlign: 'center' }}>
          <h2>Dúvidas?</h2>
          <p>Nossa equipe de suporte está pronta para te ajudar. Fale conosco através da nossa página de contato.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default TrocasDevolucoesPage;
