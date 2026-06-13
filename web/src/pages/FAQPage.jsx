import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './modules/FAQPage.module.css';

function FAQPage() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1>Perguntas Frequentes (FAQ)</h1>
        
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '40px' }}>
          Tire suas dúvidas sobre pedidos, entregas, assinaturas e muito mais.
        </p>

        <section className={styles.faqSection}>
          <h2>Pedidos e Entrega</h2>
          <div className={styles.faqItem}>
            <h3>Qual o prazo de entrega dos pedidos?</h3>
            <p>O prazo varia de acordo com sua região e o tipo de frete escolhido. Em média, capitais recebem em até 5 dias úteis, e outras regiões em até 10 dias úteis após a postagem.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>Como acompanho o rastreamento do meu pedido?</h3>
            <p>Assim que seu pedido for postado, você receberá um e-mail com o código de rastreio e o link da transportadora para acompanhar a entrega em tempo real.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>Vocês entregam em todo o Brasil?</h3>
            <p>Sim! O MultiversoHQ realiza entregas em todos os estados e municípios do território nacional via Correios e transportadoras parceiras.</p>
          </div>
        </section>

        <section className={styles.faqSection}>
          <h2>Assinaturas e Planos</h2>
          <div className={styles.faqItem}>
            <h3>Como funciona o clube de assinaturas?</h3>
            <p>Ao assinar um de nossos planos, você recebe mensalmente uma caixa personalizada com HQs selecionadas pela nossa curadoria, além de brindes exclusivos e mimos nerds.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>Posso cancelar minha assinatura a qualquer momento?</h3>
            <p>Sim. O cancelamento pode ser feito diretamente no seu painel de usuário. Pedimos apenas que seja feito com pelo menos 5 dias de antecedência da próxima renovação.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>Quais as formas de pagamento aceitas na assinatura?</h3>
            <p>Para assinaturas recorrentes, aceitamos exclusivamente cartão de crédito para garantir a renovação automática mensal.</p>
          </div>
        </section>

        <section className={styles.faqSection}>
          <h2>Conta e Cadastro</h2>
          <div className={styles.faqItem}>
            <h3>Esqueci minha senha, como recuperar?</h3>
            <p>Na página de login, clique em "Esqueci minha senha". Enviaremos um link de redefinição para o seu e-mail cadastrado em poucos instantes.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>Como altero meu endereço de entrega?</h3>
            <p>Você pode gerenciar seus endereços na seção "Minha Conta". Alterações feitas após o fechamento de um pedido só valerão para as próximas compras.</p>
          </div>
        </section>

        <section style={{ marginTop: '50px', textAlign: 'center' }}>
          <h2>Ainda tem dúvidas?</h2>
          <p>Se não encontrou o que procurava, entre em contato com nosso suporte através da página de Contato ou pelo e-mail: <strong>suporte@multiversohq.com.br</strong></p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default FAQPage;
