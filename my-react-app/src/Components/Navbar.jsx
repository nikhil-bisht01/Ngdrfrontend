function Navbar() {
  return ( <div>

    <div className="flex gap-5 justify-between px-5 pt-2 pb-6 w-full bg-white max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
    <div className="flex gap-5 justify-between self-start mt-3"></div>
    <div className="flex flex-col">
      <div className="flex gap-2 self-end px-4 py-2.5 text-base font-medium text-white whitespace-nowrap rounded-lg bg-violet-950">
        <div>Login</div>
      </div>
      <div className="flex flex-col justify-center items-end px-16 py-2 mt-2 rounded-md border border-black border-solid max-md:pl-5"></div>
    </div>
  </div>
  <div className="flex gap-5 justify-between items-start py-4 pr-20 pl-4 w-full text-xl font-medium text-white bg-neutral-400 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
    <div className="flex gap-5 my-auto max-md:flex-wrap max-md:max-w-full">
      <div className="text-xl leading-8">Home</div>
      <div className="leading-[167%]">About NGD</div>
      <div className="text-lg leading-8">Training</div>
      <div className="flex-auto leading-[161%]">Training Registration</div>
      <div className="flex-auto leading-[164%]">SOI Projects</div>
      <div className="text-lg leading-8">Site Map</div>
      <div className="my-auto text-lg leading-8">Gallery</div>
      <div className="text-lg leading-8">Contact Us</div>
    </div>
  </div>
  </div>
);
}

export default Navbar;
