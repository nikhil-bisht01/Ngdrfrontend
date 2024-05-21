import React, { useState, useEffect, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { ImPlay3 } from "react-icons/im";
import { IoIosPause } from "react-icons/io";
import { AiFillForward } from "react-icons/ai";
import { AiFillBackward } from "react-icons/ai";
import axios from "axios";
import ErrorBoundary from "../../ErrorBoundary";

const ImageGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [autoplay, setAutoplay] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideInterval, setSlideInterval] = useState(3000);
  const [images, setImages] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/viewweb/view_album`
      );
      const { data } = response.data;
      setImages(data);
    } catch (error) {
      console.log("Error fetching images:", error);
    }
  };

  const categories = [...new Set(images.map((image) => image.category))];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const filteredImages =
    selectedCategory === ""
      ? images
      : images.filter((image) => image.category === selectedCategory);

  const handleStart = () => {
    setAutoplay(true);
  };

  const handlePause = () => {
    setAutoplay(false);
  };

  const handleSpeedUp = () => {
    setSlideInterval((prevInterval) => Math.max(prevInterval - 500, 0));
    setAutoplay(true);
  };

  const handleSlowDown = () => {
    setSlideInterval((prevInterval) => prevInterval + 500);
    setAutoplay(true);
  };

  const handleCarouselChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <ErrorBoundary>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-1"></div>
        <div className="col-span-1 lg:col-span-7 relative">
          {images.length > 0 ? ( // Check if images exist
            <Carousel
              showArrows={true}
              showThumbs={false}
              dynamicHeight={false}
              infiniteLoop={true}
              autoPlay={autoplay}
              interval={slideInterval}
              selectedItem={currentSlide}
              onChange={handleCarouselChange}
              ref={carouselRef}
              className="m-auto p-8"
              emulateTouch={true}
            >
              {filteredImages.map((image, index) => (
                <div
                  key={image.image}
                  onClick={() => handleImageClick(image.image)}
                >
                  <img
                    src={image.image}
                    alt="Gallery"
                    className="h-[50vh] lg:h-[70vh] rounded-md object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <div
              className="item-center text-3xl"
              style={{
                justifyContent: "center",
                marginTop: "50px",
                marginLeft: "650px",
                marginBottom: "50px",
              }}
            >
              No Albums available
            </div>
          )}
          {images.length > 0 && (
            <div className="absolute top-7 right-7 lg:top-5 lg:right-9 p-2">
              <div className="flex justify-center lg:mt-3">
                <button
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  onClick={handleStart}
                >
                  <ImPlay3 />
                </button>
                <button
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  onClick={handlePause}
                >
                  <IoIosPause />
                </button>
                <button
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  onClick={handleSlowDown}
                >
                  <AiFillBackward />
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  onClick={handleSpeedUp}
                >
                  <AiFillForward />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-4 mt-1 lg:mt-4">
          <div className="flex flex-col lg:pt-8 px-2 lg:px-5">
            {categories.map((category) => {
              const categoryImages = images.filter(
                (image) => image.category === category
              );
              const firstImage =
                categoryImages.length > 0 ? categoryImages[0] : null;

              return (
                <div key={category} className="flex items-center mb-2">
                  {firstImage && (
                    <img
                      src={firstImage.image}
                      alt="Thumbnail"
                      className="w-25 h-20 rounded-md mr-2 cursor-pointer"
                      onClick={() => handleCategoryClick(category)}
                    />
                  )}
                  <button
                    className={`border rounded-md px-4 py-2 focus:outline-none ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {selectedImage && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="max-w-2xl mx-auto">
              <img
                src={selectedImage}
                alt={selectedImage}
                className="w-full h-auto"
                loading="lazy"
              />
              <button
                className="absolute top-0 right-0 m-4 text-white hover:text-gray-300 focus:outline-none"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ImageGallery;
