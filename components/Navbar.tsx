import { navLists } from "@/constants";
import { appleImg, bagImg, searchImg } from "@/utils";
import Image from "next/image";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <nav className="screen-max-width flex w-full gap-2">
        <div className="relative h-[18px] w-[14px]">
          <Image src={appleImg} fill className="object-cover" alt="logo" />
        </div>
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((item, i) => (
            <div
              key={i}
              className="cursor-pointer px-5 text-sm text-gray transition-all duration-[200ms] hover:text-white"
            >
              {" "}
              {item}{" "}
            </div>
          ))}
        </div>
        <div className="flex items-baseline gap-7 max-sm:flex-1 max-sm:justify-end">
          <div className=" relative size-[1.125rem]">
            <Image
              src={searchImg}
              fill
              alt="search Img"
              className="object-fill"
            />
          </div>
          <div className=" relative size-[1.125rem]">
            <Image src={bagImg} fill alt="Bag Img" className="object-fill" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
