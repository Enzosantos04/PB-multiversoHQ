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

      <Footer />
    </>
  );
}

export default ContactPage;