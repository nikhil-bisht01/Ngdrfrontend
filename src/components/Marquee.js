import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import axios from "axios";
import ErrorBoundary from "../ErrorBoundary";

export default function Marquee() {
  const [hideShow, setHideShow] = useState(false);
  const [viewMar, setViewMar] = useState({});
  const marRef = useRef();

  function stop() {
    marRef.current.stop();
  }

  function start() {
    marRef.current.start();
  }

  function hide() {
    setHideShow(true);
  }

  function show() {
    setHideShow(false);
  }

  async function viewMarquee() {
    try {
      const url = `${process.env.REACT_APP_API}/viewweb/marquee_view`;
      const response = await axios.get(url);
      setViewMar(response.data.data[0]);
    } catch (error) {
      console.log(error);
      setViewMar({ error: error.response?.data?.message || "Error fetching data" });
    }
  }

  useEffect(() => {
    viewMarquee();
  }, []);

  return (
    <ErrorBoundary>
      <div
        style={{
          position: hideShow ? "absolute" : "sticky",
          top: "200px",
          zIndex: "1",
          width: hideShow ? "1.5%" : "100%",
          overflow: "hidden",
          transition: "width 0.5s",
          backgroundColor: viewMar.backgroundcolor || "defaultColor",
          color: viewMar.textcolor || "defaultTextColor",
          height: "35px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <marquee
          width="100%"
          direction="right"
          height="35px"
          style={{ fontSize: "20px" }}
          onMouseOver={stop}
          onMouseOut={start}
          ref={marRef}
        >
          {viewMar.url ? (
            <a href={`https://${viewMar.url}`} target="_blank" rel="noreferrer">
              {viewMar.text}
            </a>
          ) : (
            viewMar.text || "Default Marquee Text"
          )}
        </marquee>
        <div style={{ display: "flex", justifyContent: "right" }}>
          {!hideShow ? (
            <AiOutlineEyeInvisible style={{ fontSize: "25px" }} onClick={hide} />
          ) : (
            <BiShow style={{ fontSize: "25px" }} onClick={show} />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
