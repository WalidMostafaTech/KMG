import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Globe, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";

const HeaderAction = () => {
  const user = "walid mostafa";
  const navigate = useNavigate();

  const getInitials = (fullName) => {
    if (!fullName) return "?";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" className="rounded-full lg:hidden">
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

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className={`cursor-pointer`}>
              <AvatarImage src={null} />
              <AvatarFallback>{getInitials(user)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel className="flex items-center gap-2">
              <h3 className="font-semibold">{user}</h3>

              <Avatar>
                <AvatarImage src={null} />
                <AvatarFallback>{getInitials(user)}</AvatarFallback>
              </Avatar>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate("/profile")}
              className="justify-start"
            >
              الملف الشخصي
              <FaRegUser />
            </DropdownMenuItem>
            <DropdownMenuItem>
              الطلبات
              <FiShoppingCart />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="bg-red-500/10">
              تسجيل الخروج
              <IoIosLogOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <Button>تسجيل الدخول</Button>
        </Link>
      )}
    </div>
  );
};

export default HeaderAction;
