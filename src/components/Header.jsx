import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FontSizer from "./fontsize/FontSizer";
import Searchbar from "./Searchbar";
import searchData from "./searchdata.json";
import axios from "axios";
import ErrorBoundary from "../ErrorBoundary";

const Header = () => {
  const [images, setImage] = useState([]);

  useEffect(() => {
    const viewHeader = async () => {
      try {
        const url = `${process.env.REACT_APP_API}/viewweb/web_header`;
        const res = await axios.get(url);
        setImage(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    viewHeader();

    return () => {
      setImage([]);
    };
  }, []);

  return (
    <>
      <ErrorBoundary>
        <FontSizer />
        <div className=" grid grid-cols-1 md:grid-cols-7  bg-white ">
          <div className="flex md:flex-row col-span-2 self-center flex-col-reverse h-auto md:h-28">
            <div className="flex flex-col md:flex-row overflow-hidden">
              <div className=" md:hidden">
                <img
                  src={require("../assests/Website Logo NIGST Small.png")}
                  alt="SOI_logo"
                  className="w-full h-full md:ml-24 object-contain"
                />
              </div>
              <div className="flex p-0 md:p-5 md:mt-auto justify-center h-14 md:h-28 lg-32">
                <div className="flex flex-row ">
                  {images.map((data) => {
                    return (
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={data.header_url}
                      >
                        <img
                          key={data.h_id}
                          src={data.imageurl}
                          alt="Azadi_ka_amrit_mahotsav"
                          className="w-1/2 h-auto object-contain rounded-md"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex hidden md:block md:w-full md:col-start-3 md:col-end-5 h-24 md:h-full">
            <img
              src={require("../assests/Website Logo NIGST Small.png")}
              alt="SOI_logo"
              className="w-full h-full md:ml-24 object-contain"
            />
          </div>

          <div className="right-header hidden md:grid md:col-start-6 md:col-span-2 items-center ">
            <section className="search-bar flex flex-col py-2 space-y-4 col-start-2 col-span-2 ">
              <div className="survey-and-login flex flex-row items-center justify-center gap-4 ml-3">
                <Link
                  to="https://www.surveyofindia.gov.in/"
                  target="_blank"
                  className=" text-blue-600 hover:bg-[#1050a2] hover:text-white hover:rounded-md text-base hover:py-1 px-2.5 hover:translate-y-0"
                >
                  Survey of India Website
                </Link>
                <button className="login-btn bg-[#1050a2] rounded-md p-1">
                  <Link to="/login" className="text-white p-5">
                    Login
                  </Link>
                </button>
              </div>
              <div className="px-0 py-0 item-center flex flex-row justify-center">
                <Searchbar data={searchData} />
              </div>
            </section>
          </div>
        </div>
        <div className="bg-yellow-500 h-1.5 w-full"></div>
      </ErrorBoundary>
    </>
  );
};

export default Header;
