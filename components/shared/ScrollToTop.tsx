"use client";
import Image from "next/image";

const ScrollToTop = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div role="button" className="fixed bottom-3 right-3 cursor-pointer">
      <Image
        src="/upload.png"
        width={50}
        height={50}
        priority
        alt=""
        onClick={handleScroll}
        className="animate-spin-slow drop-shadow-[2px_2px_6px_black] dark:filter-none"
      />
    </div>
  );
};

export default ScrollToTop;
