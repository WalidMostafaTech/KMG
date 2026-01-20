import logoutIcon from "@/assets/icons/logout-icon.png";
import { logoutAct } from "@/store/profile/profileSlice";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { closeModal } from "@/store/modals/modalsSlice";
import { Loader2Icon } from "lucide-react";

const LogOutModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { logoutModal } = useSelector((state) => state.modals);
  const { logOutLoading } = useSelector((state) => state.profile);

  const onClose = () => {
    dispatch(closeModal("logoutModal"));
  };

  const handleLogout = () => {
    dispatch(logoutAct())
      .unwrap()
      .then(() => onClose());
  };

  return (
    <Dialog open={logoutModal} onOpenChange={() => onClose()}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogDescription>
            <img src={logoutIcon} alt="logout" className="mx-auto" />
          </DialogDescription>
          <DialogTitle className="text-center">
            {t("logOutModal.logoutConfirm")}
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1 rounded-full"
            disabled={logOutLoading}
            onClick={onClose}
          >
            {t("logOutModal.cancel")}
          </Button>

          <Button
            type="submit"
            className="flex-1"
            disabled={logOutLoading}
            onClick={handleLogout}
          >
            {logOutLoading && <Loader2Icon className="size-4 animate-spin" />}
            {t("logOutModal.logout")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogOutModal;
