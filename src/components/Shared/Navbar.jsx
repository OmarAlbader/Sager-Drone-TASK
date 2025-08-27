const Navbar = () => {
  return (
    <nav className="flex h-16 w-full items-center justify-between bg-[#0B0B0B] px-6 text-white shadow-lg">
      <img
        src="/Icon/white-logo.png"
        alt="logo"
        className="-ml-10 h-[90%] text-white lg:-ml-5"
      />
      <div className="flex h-full items-center">
        <div className="flex h-fit gap-5">
          <img src="/Icon/capture-svgrepo-com.svg" alt="capture" />
          <img src="/Icon/language-svgrepo-com.svg" alt="language" />

          <div className="relative">
            <p className="absolute top-0 left-[55%] grid h-4.5 w-4.5 place-content-center rounded-full bg-red-500 text-[0.85rem] font-medium">
              5
            </p>
            <img src="/Icon/bell.svg" alt="bell" />
          </div>
        </div>

        <div className="mx-5 hidden h-2/3 w-0.5 bg-white/25 sm:block" />

        <div className="mr-0 hidden sm:block lg:mr-5">
          <p className="">
            Hello,{" "}
            <span className="font-bold tracking-wide">Mohammed Omar</span>
          </p>
          <p className="text-gray-500">Technical Support</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
