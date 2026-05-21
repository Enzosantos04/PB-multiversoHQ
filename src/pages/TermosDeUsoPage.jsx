import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './modules/TermosDeUsoPage.module.css';

function TermosDeUsoPage() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1>Termos de Uso</h1>
        
        <section>
          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e usar o site MultiversoHQ, você concorda em cumprir e estar vinculado aos seguintes Termos de Uso. 
            Se você não concordar com qualquer parte destes termos, não deverá acessar o site ou utilizar nossos serviços.
          </p>
        </section>

        <section>
          <h2>2. Uso do Site</h2>
          <p>
            O MultiversoHQ concede a você uma licença limitada para acessar e fazer uso pessoal deste site. 
            Esta licença não inclui qualquer revenda ou uso comercial deste site ou de seu conteúdo.
          </p>
          <ul>
            <li>Você não deve usar o site de forma que cause ou possa causar danos ao site ou interrupção da disponibilidade ou acessibilidade do site.</li>
            <li>Você não deve usar o site para copiar, armazenar, hospedar, transmitir, enviar, usar, publicar ou distribuir qualquer material que consista em qualquer spyware, vírus de computador, cavalo de Troia, verme, ou outro software de computador malicioso.</li>
          </ul>
        </section>

        <section>
          <h2>3. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo incluído neste site, como texto, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é de propriedade do MultiversoHQ ou de seus fornecedores de conteúdo (como Marvel e DC Comics) e é protegido pelas leis de direitos autorais internacionais.
          </p>
        </section>

        <section>
          <h2>4. Contas de Usuário</h2>
          <p>
            Se você criar uma conta no MultiversoHQ, você é responsável por manter a confidencialidade de sua conta e senha e por restringir o acesso ao seu computador, e concorda em aceitar a responsabilidade por todas as atividades que ocorram sob sua conta ou senha.
          </p>
        </section>

        <section>
          <h2>5. Limitação de Responsabilidade</h2>
          <p>
            O MultiversoHQ não será responsável por quaisquer danos de qualquer tipo decorrentes do uso deste site, incluindo, mas não se limitando a danos diretos, indiretos, incidentais, punitivos e consequenciais.
          </p>
        </section>

        <section>
          <h2>6. Alterações nos Termos</h2>
          <p>
            Reservamo-nos o direito de fazer alterações em nosso site, políticas e nestes Termos de Uso a qualquer momento. 
            Se qualquer uma destas condições for considerada inválida, nula ou por qualquer motivo inexequível, essa condição será considerada separável e não afetará a validade e exequibilidade de qualquer condição restante.
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

export default TermosDeUsoPage;
