import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import images from "./index";
import axios from "axios";
import Marquee from "../components/Marquee";

const StyledBox = styled(Box)({
  maxWidth: "100%",
  margin: "0 auto",
});

const Carousel = () => {
  const [viewMar, setViewMar] = useState([]);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveStep((prevActiveStep) =>
        prevActiveStep === images.length - 1 ? 0 : prevActiveStep + 1
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, [images]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === images.length - 1 ? 0 : prevActiveStep + 1
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? images.length - 1 : prevActiveStep - 1
    );
  };

  function viewMarquee() {
    const url = `${process.env.REACT_APP_API}/viewweb/marquee_view`;
    axios
      .get(url)
      .then((res) => {
        setViewMar(res?.data?.data[0]);
      })
      .catch((error) => {
        setViewMar(error?.response?.data?.message);
      });
  }

  return (
    <StyledBox sx={{ backgroundColor: "gray" }}>
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            display: activeStep === index ? "block" : "none",
            position: "relative",
          }}
        >
          <Box sx={{ position: "relative" }}>
            {viewMar !== "No Marquee Found" && !viewMar?.othervisibility ? (
              <Marquee />
            ) : (
              ""
            )}
            <img
              src={image}
              alt="carousel"
              style={{
                width: "100%",
                height: "65vh",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "10px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor:
                      activeStep === index
                        ? "#ffcb00"
                        : "rgba(255, 255, 255, 0.5)",
                    mx: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveStep(index)}
                ></Box>
              ))}
            </Box>
          </Box>
        </Box>
      ))}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: "2",
          cursor: "pointer",
          left: "0",
          color: "#ffcb00",
        }}
        onClick={handleBack}
      >
        <Typography
          variant="h3"
          component="span"
          sx={{ mx: 1, fontWeight: "bold" }}
        >
          &#8249;
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
            zIndex: "2",
            cursor: "pointer",
            color: "#ffcb00",
          }}
          onClick={handleNext}
        >
          <Typography
            variant="h3"
            component="span"
            sx={{ mx: 1, fontWeight: "bold" }}
          >
            &#8250;
          </Typography>
        </Box>
      </Box>
    </StyledBox>
  );
};

export default Carousel;
