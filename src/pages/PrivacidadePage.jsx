import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './modules/PrivacidadePage.module.css';

function PrivacidadePage() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1>Política de Privacidade</h1>
        
        <section>
          <h2>1. Coleta de Informações</h2>
          <p>
            A MultiversoHQ coleta informações para fornecer melhores serviços a todos os nossos usuários. 
            Coletamos informações das seguintes maneiras:
          </p>
          <ul>
            <li><strong>Informações que você nos fornece:</strong> Como seu nome, e-mail, endereço de entrega e CPF ao criar uma conta ou realizar um pedido.</li>
            <li><strong>Informações que recebemos do seu uso de nossos serviços:</strong> Como dados de navegação, cookies e endereço IP para melhorar sua experiência.</li>
          </ul>
        </section>

        <section>
          <h2>2. Uso das Informações</h2>
          <p>
            Usamos as informações que coletamos para fornecer, manter, proteger e melhorar nossos serviços, além de desenvolver novos produtos.
          </p>
          <ul>
            <li>Processar seus pedidos e garantir a entrega de suas HQs.</li>
            <li>Enviar comunicações de marketing, caso você tenha optado por recebê-las.</li>
            <li>Garantir a segurança de nossa plataforma e de seus dados.</li>
          </ul>
        </section>

        <section>
          <h2>3. Compartilhamento de Informações</h2>
          <p>
            Não compartilhamos informações pessoais com empresas, organizações ou indivíduos externos à MultiversoHQ, exceto nas seguintes circunstâncias:
          </p>
          <ul>
            <li><strong>Com sua autorização:</strong> Compartilhamos informações pessoais quando temos seu consentimento.</li>
            <li><strong>Para processamento externo:</strong> Fornecemos informações a parceiros de confiança (como transportadoras e processadores de pagamento) para processar os serviços por você solicitados.</li>
            <li><strong>Por motivos legais:</strong> Para cumprir qualquer lei, regulamentação ou ordem judicial.</li>
          </ul>
        </section>

        <section>
          <h2>4. Segurança dos Dados</h2>
          <p>
            Trabalhamos arduamente para proteger o MultiversoHQ e nossos usuários de acesso não autorizado, alteração, divulgação ou destruição de informações que detemos. Utilizamos criptografia SSL em todas as transações financeiras.
          </p>
        </section>

        <section>
          <h2>5. Seus Direitos</h2>
          <p>
            De acordo com a LGPD (Lei Geral de Proteção de Dados), você tem o direito de acessar, corrigir, excluir ou portar seus dados pessoais a qualquer momento através das configurações de sua conta ou entrando em contato conosco.
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

export default PrivacidadePage;
