import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClick}
    >
      <FaChevronRight color="white" size="32px" />
    </div>
  );
}

export function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClick}
    >
      <FaChevronLeft color="white" size="32px" />
    </div>
  );
}