import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './modules/RegulamentosPage.module.css';

function RegulamentosPage() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1>Regulamentos</h1>
        
        <section>
          <h2>1. Disposições Gerais</h2>
          <p>
            Estes regulamentos regem as promoções, eventos e programas de fidelidade oferecidos pela MultiversoHQ. 
            A participação em qualquer uma de nossas atividades implica na aceitação total e irrestrita destes regulamentos.
          </p>
        </section>

        <section>
          <h2>2. Promoções e Cupons</h2>
          <p>
            Todos os cupons de desconto têm validade por tempo limitado, conforme especificado em cada campanha.
          </p>
          <ul>
            <li>Os cupons não são cumulativos com outras promoções, salvo indicação em contrário.</li>
            <li>O MultiversoHQ se reserva o direito de cancelar ou alterar promoções a qualquer momento, sem aviso prévio.</li>
            <li>Descontos não são convertíveis em dinheiro.</li>
          </ul>
        </section>

        <section>
          <h2>3. Programa de Assinaturas</h2>
          <p>
            Ao assinar um de nossos planos, o usuário concorda com a cobrança recorrente no método de pagamento escolhido.
          </p>
          <ul>
            <li>O cancelamento pode ser feito a qualquer momento através do painel do usuário.</li>
            <li>As edições enviadas são selecionadas de acordo com a disponibilidade de estoque e o perfil do plano escolhido.</li>
          </ul>
        </section>

        <section>
          <h2>4. Sorteios e Concursos</h2>
          <p>
            Eventuais sorteios realizados em nossas redes sociais ou site seguirão as normas da legislação brasileira vigente.
            Os vencedores serão comunicados via e-mail ou mensagem direta na plataforma onde o concurso foi realizado.
          </p>
        </section>

        <section>
          <h2>5. Clube de Vantagens</h2>
          <p>
            O Clube de Vantagens é um programa exclusivo para assinantes ativos, oferecendo descontos em parceiros e acesso antecipado a pré-vendas.
          </p>
        </section>

        <p style={{ marginTop: '40px', fontSize: '0.9rem', opacity: 0.7 }}>
          Última atualização: 21 de maio de 2026.
        </p>
      </main>
      <Footer />
    </>
  );
}

export default RegulamentosPage;
