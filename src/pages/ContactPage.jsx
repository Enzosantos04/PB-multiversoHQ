import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

function ContactPage() {
 const{
    searchTerm,setSearchTerm,usuarioAtual,}=useComics();
    const navigate = useNavigate()
  const handleChange = (e) =>{setSearchTerm(e.target.value);};


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
