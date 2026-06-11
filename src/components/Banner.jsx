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
      image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=1600&h=800&q=80",
      title: "LEGADO MARVEL",
      subtitle: "As histórias que definiram gerações, agora em edições definitivas.",
      publisher: "Marvel",
      link: "/catalogo?publisher=marvel"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=1600&h=800&q=80",
      title: "JUSTIÇA DC",
      subtitle: "Onde os deuses caminham entre nós. Explore o multiverso DC.",
      publisher: "DC",
      link: "/catalogo?publisher=dc"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1588497859490-85d1c17db96d?auto=format&fit=crop&w=1600&h=800&q=80",
      title: "SUA COLEÇÃO",
      subtitle: "Planos exclusivos para quem vive e respira a nona arte.",
      publisher: "Special",
      link: "/planos"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    arrows: false, // Ocultar setas padrão para um look mais clean, ou usar Custom
  };

  const handleCTA = (link) => {
    navigate(link);
  };

  return (
    <div className={styles.bannerContainer}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slideWrapper}>
            <div className={styles.slide}>
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
                    <div className={styles.badgeMarvel}>MARVEL COMICS</div>
                  )}
                  {slide.publisher === "DC" && (
                    <div className={styles.badgeDc}>DC UNIVERSE</div>
                  )}
                  {slide.publisher === "Special" && (
                    <div className={styles.badgeSpecial}>CLUBE DE ASSINATURA</div>
                  )}

                  <h2 className={styles.title}>{slide.title}</h2>
                  <p className={styles.subtitle}>{slide.subtitle}</p>

                  <button
                    className={styles.ctaButton}
                    onClick={() => handleCTA(slide.link)}
                  >
                    Explorar Coleção
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
