import { Link } from "react-router";
import logo from "@/assets/images/logo.png";

import HeaderAction from "./HeaderAction";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b py-4 sticky top-0 z-50 bg-background">
      <div className="container flex items-center justify-between gap-4 lg:gap-12">
        <div>
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="flex-1 items-center gap-2 bg-input py-2 px-4 rounded-full hidden lg:flex">
          <button>
            <Search />
          </button>
          <input
            type="search"
            placeholder="بحث ..."
            className="flex-1 outline-none border-none"
          />
        </div>

        <HeaderAction />
      </div>
    </header>
  );
};

export default Header;
