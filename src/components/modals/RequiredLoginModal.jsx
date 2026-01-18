import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const RequiredLoginModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="items-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-white" strokeWidth={3} />
          </div>

          <DialogTitle className="text-xl font-semibold text-center">
            تسجيل الدخول مطلوب
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-400 text-sm">
            يجب عليك تسجيل الدخول لتتمكن من المواصلة
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 mt-4" dir="rtl">
          <Button onClick={handleLogin} className="flex-1">تسجيل دخول</Button>

          <Button
            variant="outline"
            onClick={handleCreateAccount}
            className="rounded-full flex-1"
          >
            إنشاء حساب
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequiredLoginModal;
