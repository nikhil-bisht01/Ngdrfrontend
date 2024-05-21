import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { GrMail, GrTwitter } from "react-icons/gr";
import {
  // FaYoutube,
  FaPhoneAlt,
  // FaFacebookSquare,
  // FaLinkedin,
} from "react-icons/fa";
import axios from "axios";
import ErrorBoundary from "../ErrorBoundary";

const Footer = () => {
  const [visitor, setVisitor] = useState("");
  const [phone, setPhone] = useState([]);
  const [address, setAddress] = useState([]);
  const [email, setEmail] = useState([]);
  const [quickLinks, setQuickLinks] = useState(null);
  const [importantLinks, setImportantLinks] = useState(null);
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    viewContact();
    viewQuickLinks();
    viewSocialMedia();
  }, []);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API}/viscount`)
        .then((response) => {
          const newCount = response?.data;
          setVisitor(newCount);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, []);

  function viewContact() {
    try {
      const url = `${process.env.REACT_APP_API}/viewweb/contact_footer`;
      axios
        .get(url)
        .then((res) => {
          setPhone(res?.data?.phone);
          setAddress(res?.data?.address);
          setEmail(res?.data?.email);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function viewQuickLinks() {
    try {
      const url = `${process.env.REACT_APP_API}/viewweb/footer_web`;
      axios
        .get(url)
        .then((res) => {
          setQuickLinks(res?.data?.obj["Quick Links"]);
          setImportantLinks(res?.data?.obj["Important Links"]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function viewSocialMedia() {
    try {
      const url = `${process.env.REACT_APP_API}/viewweb/web_view_media`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data.data);
          setIcons(res?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ErrorBoundary>
      <div className="mt-0">
        <footer className="bg-[#262C31] text-gray-100">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 pl-4 md:pl-16 pt-20 pb-20">
              <div className="flex flex-col font-sans md:ml-[40px]  mb-8 md:mb-0">
                <h3 className="text-[#ffcb00] text-[20px] mb-10 font-bold ">
                  Contact Us
                </h3>
                {address.length > 0 ? (
                  <div className="flex  items-center mb-2 ">
                    <HiLocationMarker
                      color="black"
                      size="1.5em"
                      className="rounded-full w-auto h-auto p-2  bg-[#ffcb00]"
                    />
                    <p className="text-[15px] w-[70%] ml-3 ">{address}</p>
                  </div>
                ) : (
                  ""
                )}
                {phone.length > 0 ? (
                  <div className="flex items-center mb-2">
                    <FaPhoneAlt
                      color="black"
                      size="1.5em"
                      className="rounded-full w-auto h-auto p-2  bg-[#ffcb00]"
                    />
                    <span>
                      <p className="text-[15px]  ml-3 ">{phone}</p>
                    </span>
                  </div>
                ) : (
                  ""
                )}
                {email.length > 0 ? (
                  <div className="flex items-center mb-2">
                    <GrMail
                      color="black"
                      size="1.5em"
                      className="rounded-full w-auto h-auto p-2  bg-[#ffcb00]"
                    />
                    <Link to={email} className="text-[17px] px-5">
                      {email.join(" , ")}
                    </Link>
                  </div>
                ) : (
                  ""
                )}

                <div className="flex flex-wrap">
                  {icons.map((data, index) => (
                    <Link key={index} to={data.url} target="_blank">
                      <i
                        className={`${data.name} p-5 pt-3.5 w-auto h-auto`}
                        style={{ color: data.color, fontSize: "30px" }}
                      ></i>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col  md:ml-[100px]  ">
                <h3 className="text-lg text-[#ffcb00] text-[20px] font-bold  mb-10">
                  Quick Links
                </h3>
                <div className="flex flex-col   mb-2">
                  {quickLinks !== null
                    ? quickLinks?.name.map((data, index) => (
                        <Link
                          key={index}
                          to={quickLinks.link[index]}
                          target="_blank"
                          className="mr-2 mb-2 text-[17px]"
                        >
                          {data}
                        </Link>
                      ))
                    : ""}
                </div>
                <h3 className="text-lg text-[#ffcb00] text-[20px] font-bold mt-10 mb-4">
                  Visitors Count
                </h3>
                <span>{visitor.total}</span>
              </div>

              <div className="flex flex-col md:ml-10   ">
                <h3 className="text-[20px] text-[#ffcb00]  mb-10 font-bold">
                  Important Links
                </h3>
                <div className="flex flex-col">
                  {importantLinks !== null
                    ? importantLinks.name.map((impLinks, index) => (
                        <Link
                          key={index}
                          to={importantLinks.link[index]}
                          target="_blank"
                          className="text-[16px] text-[#ffffff] hover:text-[#ffcb00] mb-2"
                        >
                          {impLinks}
                        </Link>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default Footer;
