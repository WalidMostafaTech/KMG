import { Link } from "react-router";
import logo from "@/assets/images/logo.png";

import HeaderAction from "./HeaderAction";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
  return (
    <header className="border-b py-4 sticky top-0 z-50 bg-background">
      <div className="container flex items-center justify-between gap-2 lg:gap-12">
        <div>
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-20 lg:w-24" />
          </Link>
        </div>

        <HeaderSearch />

        <HeaderAction />
      </div>
    </header>
  );
};

export default Header;
