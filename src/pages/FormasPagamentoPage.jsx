import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './modules/FormasPagamentoPage.module.css';

function FormasPagamentoPage() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1>Formas de Pagamento</h1>
        
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '40px' }}>
          No MultiversoHQ, oferecemos diversas opções para você garantir suas HQs com total segurança e praticidade.
        </p>

        <div className={styles.paymentGrid}>
          <div className={styles.paymentCard}>
            <div className={styles.iconWrapper}><img src="https://ajuda.fastcommerce.com.br/lojas/00000009/prod/fc/fc-visa.svg" alt="Visa" /> <img src="https://imgs.search.brave.com/yXjLjzMfbSqQ66BGWunffYUgWU4JdOJCtWKt_j1WAjo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hanVk/YS5mYXN0Y29tbWVy/Y2UuY29tLmJyL2xv/amFzLzAwMDAwMDA5/L3Byb2QvZmMvZmMt/bWFzdGVyY2FyZC0y/LnN2Zw" alt="Mastercard" /></div>
            <h3>Cartão de Crédito</h3>
            <p>Aceitamos as principais bandeiras: Visa, Mastercard, Elo, American Express e Hipercard.</p>
            <p><strong>Parcelamento:</strong> Em até 6x sem juros ou até 12x com acréscimo.</p>
          </div>

          <div className={styles.paymentCard}>
            <div className={styles.iconWrapper}><img src="https://ajuda.fastcommerce.com.br/lojas/00000009/prod/fc/fc-pix2.svg" alt="Pix" /></div>
            <h3>Pix</h3>
            <p>Pagamento instantâneo com 5% de desconto em todo o catálogo.</p>
            <p>O QR Code é gerado na finalização do pedido e tem validade de 30 minutos.</p>
          </div>

          <div className={styles.paymentCard}>
            <div className={styles.iconWrapper}><img src="https://ajuda.fastcommerce.com.br/lojas/00000009/prod/fc/fc-boleto.svg" alt="Boleto Bancário" /></div>
            <h3>Boleto Bancário</h3>
            <p>Pagamento à vista em qualquer agência bancária ou via internet banking.</p>
            <p><strong>Prazo:</strong> A confirmação ocorre em até 2 dias úteis após o pagamento.</p>
          </div>
        </div>

        <section className={styles.securitySection}>
          <h2>Pagamento 100% Seguro</h2>
          <p>
            Todas as transações no MultiversoHQ são processadas em ambiente criptografado com tecnologia SSL. 
            Não armazenamos os dados sensíveis do seu cartão em nossos servidores.
          </p>
        </section>

        <section style={{ marginTop: '50px' }}>
          <h2>Dúvidas Frequentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <strong>Posso alterar a forma de pagamento após finalizar o pedido?</strong>
              <p>Por questões de segurança, não é possível alterar a forma de pagamento após a conclusão. Caso precise trocar, será necessário cancelar o pedido e realizar um novo.</p>
            </div>
            <div>
              <strong>Qual o prazo para aprovação do Pix?</strong>
              <p>A aprovação do Pix é imediata. Assim que o pagamento for confirmado, seu pedido entrará em processo de separação.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default FormasPagamentoPage;
