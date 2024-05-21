import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import ErrorBoundary from "../../ErrorBoundary";

function SCarousel() {
  const [sliderRef, setSliderRef] = useState(null);
  const [hotelCards, setHotelCards] = useState([]);

  const sliderSettings = {
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    fade: false,
    speed: 1000,
    autoplay: true,
    initialSlide: 2,
    lazyLoad: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1540,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  useEffect(() => {
    try {
      const url = `${process.env.REACT_APP_API}/viewweb/web_project`;
      axios
        .get(url)
        .then((res) => {
          setHotelCards(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="content p-[25px] md:p-[30] m-auto xl:p-8 w-full">
        <h2 className="font-bold text-lg text-center">SOI PROJECTS</h2>
        <div className="mx-3 flex justify-between">
          <button
            className="bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-full p-2"
            onClick={() => sliderRef?.slickPrev()}
          >
            <FaArrowLeft />
          </button>
          <button
            className="bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-full p-2"
            onClick={() => sliderRef?.slickNext()}
          >
            <FaArrowRight />
          </button>
        </div>
        <Slider
          className="mt-4 mx-0 grid gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5  "
          ref={(slider) => setSliderRef(slider)}
          {...sliderSettings}
        >
          {hotelCards.map((card, index) => {
            return (
              <div
                key={index}
                className="p-4 bg-white shadow-md h-96 w flex  slider relative"
              >
                <img
                  alt={card.name}
                  src={card.Purl}
                  className="w-full object-cover mb-4 rounded-lg h-48"
                />
                <p className="text-gray-700 mb-4 flex-grow">
                  {card.p_description}
                </p>
                <div className="bg-[#1050a2] hover:bg-[#ffcb00] text-white font-bold w-full flex justify-center py-2 px-4 rounded-sm  text-center absolute bottom-0">
                  <a href={card.url} target="_blank" rel="noreferrer">
                    {card.name}
                  </a>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </ErrorBoundary>
  );
}

export default SCarousel;
