import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slides = [
    {
      id: 1,
      image:
        "https://ss-images.saostar.vn/2018/08/31/3582800/ava-usuk-ngang-copy.jpg",
      alt: "Slide 1",
    },
    {
      id: 2,
      image:
        "https://www.shutterstock.com/shutterstock/videos/3438942789/thumb/1.jpg?ip=x480",
      alt: "Slide 2",
    },
    {
      id: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhaO4J3W42OsDi5jhvpfdqF8RGvWkvoUdXbA&s",
      alt: "Slide 3",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="outline-none">
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;
