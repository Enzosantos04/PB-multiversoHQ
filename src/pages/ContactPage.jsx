<<<<<<< HEAD
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <Contact />
      </main>
=======
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import { useComics } from "../context/ComicsContext";

function ContactPage() {
  const {
    searchTerm,
    setSearchTerm,
  } = useComics();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Header
        onChange={handleChange}
        value={searchTerm}
      />

      <main>
        <Contact />
      </main>

>>>>>>> master
      <Footer />
    </>
  );
}

<<<<<<< HEAD
export default ContactPage;
=======
export default ContactPage;
>>>>>>> master
