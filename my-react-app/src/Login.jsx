import React, { useState } from "react";
import Navbar from "./Components/Navbar";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log({
      username,
      password,
      captcha,
      rememberMe
    });
  };

  return (
    <div className="flex flex-col rounded-2xl bg-neutral-100">
       <Navbar/>
      <div className="self-center mt-20 max-w-full w-[533px] max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[29%] max-md:ml-0 max-md:w-full">
            <div className="z-10 justify-center items-start self-stretch px-14 py-3 my-auto w-full text-2xl text-black whitespace-nowrap rounded-lg border border-solid bg-zinc-300 border-stone-300 max-md:px-5 max-md:mt-10">
              EZXISH
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[71%] max-md:ml-0 max-md:w-full">
            <form onSubmit={handleLogin} className="flex flex-col grow p-10 mx-auto w-full text-sm rounded-2xl border border-solid shadow-sm bg-neutral-100 border-stone-300 text-zinc-500 max-md:px-5">
              <div className="justify-center self-center px-5 py-2.5 text-base text-white rounded-xl bg-violet-950">
                Log in
              </div>
              <div className="mt-8 font-medium text-black">
                E-mail or Username*
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter email or username"
                className="justify-center items-start px-5 py-5 mt-2.5 rounded-lg border border-solid bg-neutral-200 bg-opacity-0 border-stone-300 max-md:pr-5"
              />
              <div className="mt-5 font-medium text-black">Password*</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="flex gap-5 px-5 py-3.5 mt-2 w-full whitespace-nowrap rounded-lg border border-solid bg-neutral-200 bg-opacity-0 border-stone-300"
              />
              <div className="flex gap-5 mt-3 w-full text-neutral-700">
                <div className="flex flex-1 gap-0.5">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <div className="my-auto">Remember me</div>
                </div>
                <div className="flex-auto my-auto underline">
                  Forgot password?
                </div>
              </div>
              <div className="mt-5 font-medium text-black">Captcha*</div>
              <input
                type="text"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                placeholder="Enter Captcha"
                className="justify-center items-start px-5 py-5 mt-2.5 rounded-lg border border-solid bg-neutral-200 bg-opacity-0 border-stone-300 max-md:pr-5"
              />
              <button type="submit" className="justify-center items-center px-16 py-5 mt-8 text-sm font-semibold text-white rounded-lg border-0 border-white border-solid shadow-sm bg-violet-950 max-md:px-5">
                Log in
              </button>
              <div className="self-center mt-14 text-base text-violet-950 max-md:mt-10">
                <span className="">Don’t have an account? </span>
                <span className="font-bold text-violet-950">Sign Up</span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex gap-5 px-16 py-14 mt-52 w-full bg-zinc-800 max-md:flex-wrap max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex-auto self-start max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-4/5 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch my-auto leading-[150%] max-md:mt-10 max-md:max-w-full">
                <div className="text-2xl font-bold text-yellow-400 max-md:max-w-full">
                  Contact Us
                </div>
                <div className="flex gap-5 mt-16 text-lg leading-7 text-gray-100 max-md:flex-wrap max-md:mt-10">
                  <div className="flex-auto max-md:max-w-full">
                    Additional Surveyor General, Survey of India, Uppal,
                    <br />
                    Hyderabad 500039, Telangana, INDIA
                  </div>
                </div>
                <div className="flex gap-5 mt-6 text-lg text-gray-100 whitespace-nowrap max-md:flex-wrap">
                  <div className="flex-auto my-auto max-md:max-w-full">
                    +91-40-27201181, +91-40-27201185, +91-40-27201186
                  </div>
                </div>
                <div className="flex gap-5 self-start mt-2.5 text-xl text-gray-100 whitespace-nowrap">
                  <div className="flex-auto my-auto">iism.soi@gov.in</div>
                </div>
                <div className="flex gap-5 justify-between mt-8 ml-6 max-w-full text-4xl leading-9 whitespace-nowrap w-[125px] max-md:ml-2.5">
                  <div className="text-red-600"></div>
                  <div className="text-orange-950"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-xl leading-8 text-gray-100 max-md:mt-10">
                <div className="text-2xl font-bold leading-9 text-yellow-400">
                  Quick Links
                </div>
                <div className="mt-16 max-md:mt-10">Tenders</div>
                <div className="mt-6">Sitemap</div>
                <div className="mt-5">Grievances</div>
                <div className="mt-7">FAQ</div>
                <div className="mt-20 text-2xl font-bold leading-9 text-yellow-400 max-md:mt-10">
                  Visitors Count
                </div>
                <div className="mt-9 text-xl">223</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-xl leading-7 text-white">
          <div className="text-2xl font-bold text-yellow-400">
            Important Links
          </div>
          <div className="mt-14 leading-[151%] max-md:mt-10">
            National Portal of India
          </div>
          <div className="mt-6">SOI Online Maps Portal</div>
          <div className="mt-5">NRSC</div>
          <div className="mt-6">NIC Bharat Maps</div>
          <div className="mt-5">IIRS</div>
          <div className="mt-6">UNGGIM Portal</div>
          <div className="mt-6">UNGGIM-AP Portal</div>
          <div className="mt-6">DigitalSky-Airspace Map</div>
          <div className="mt-5">Department of Science and Technology</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
