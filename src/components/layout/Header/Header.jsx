import { Link } from "react-router";
import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { Globe, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full lg:hidden"
          >
            <Search />
          </Button>

          {/* Language Select */}
          <Select defaultValue="en">
            <SelectTrigger className="min-w-[110px] rounded-full">
              <SelectValue placeholder="اللغة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">
                <Globe />
                العربية
              </SelectItem>
              <SelectItem value="en">
                <Globe />
                English
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Login Button */}
          <Link to="/login">
            <Button>تسجيل الدخول</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
