import React from "react";
import * as ReactSlick from "react-slick";
import styles from "./modules/Banner.module.css";
import { useNavigate } from "react-router-dom";
import { CustomNextArrow, CustomPrevArrow } from "./Arrows";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider =
  ReactSlick?.default?.default || ReactSlick?.default || ReactSlick;

const Banner = () => {
  const navigate = useNavigate();
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1200&h=400&fit=crop",
      title: "Novos Lançamentos Marvel",
      subtitle: "Descubra as últimas aventuras dos seus heróis favoritos",
      link: "#marvel",
      publisher: "Marvel",
    },
    {
      id: 2,
      image:
        "https://indutalks.com.br/wp-content/uploads/2024/09/Liga-da-Justica-Todos-os-Titulos.jpg",
      title: "Universo DC em Expansão",
      subtitle: "Explore as histórias épicas da Liga da Justiça",
      link: "#dc",
      publisher: "DC",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=1200&h=400&fit=crop",
      title: "Edições Especiais",
      subtitle: "Coleções raras e limitadas disponíveis agora",
      link: "#especiais",
      publisher: "Special",
    },
    {
      id: 4,
      image:
        "https://i0.wp.com/www.comicbookwire.com/wp-content/uploads/2018/02/jla-avengers.jpg?ssl=1",
      title: "Crossovers Épicos",
      subtitle: "Marvel vs DC - As maiores batalhas já contadas",
      link: "#crossover",
      publisher: "Both",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const handleSlideClick = (link) => {
    if (link.startsWith("#")) {
      const element = document.querySelector(link);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const handleIrParaContato = () => {
    navigate("/catalogo");
  };

  return (
    <div className={styles.bannerContainer}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slideWrapper}>
            <div
              className={styles.slide}
              onClick={() => handleSlideClick(slide.link)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={styles.slideImage}
                />

                <div className={styles.overlay} />
              </div>

              <div className={styles.content}>
                <div className={styles.contentInner}>
                  {slide.publisher === "Marvel" && (
                    <div className={styles.badgeMarvel}>MARVEL</div>
                  )}

                  {slide.publisher === "DC" && (
                    <div className={styles.badgeDc}>DC COMICS</div>
                  )}

                  {slide.publisher === "Both" && (
                    <div className={styles.badgeBoth}>MARVEL & DC</div>
                  )}

                  {slide.publisher === "Special" && (
                    <div className={styles.badgeSpecial}>ESPECIAL</div>
                  )}

                  <h2 className={styles.title}>{slide.title}</h2>

                  <p className={styles.subtitle}>{slide.subtitle}</p>

                  <button
                    className={styles.ctaButton}
                    onClick={handleIrParaContato}
                  >
                    Explorar Agora
                    <span className={styles.arrow}>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
