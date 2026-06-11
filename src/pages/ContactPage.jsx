import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import { useComics } from "../context/ComicsContext";
import { useNavigate } from "react-router-dom";

function ContactPage() {
  const { searchTerm, setSearchTerm } = useComics();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <>
      <Header onChange={handleChange} value={searchTerm} />
      <main>
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default ContactPage;
