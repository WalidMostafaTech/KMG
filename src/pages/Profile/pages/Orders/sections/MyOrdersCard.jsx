import { Button } from "@/components/ui/button";
import { BsChatLeftText } from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, NotebookTabs, Send } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { sendMsg } from "@/services/chatServices";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DetailsModal from "./DetailsModal";

const MyOrdersCard = ({ order }) => {
  const [open, setOpen] = useState(false);
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const sendOrderToChat = useMutation({
    mutationFn: sendMsg,
    onSuccess: () => {
      queryClient.invalidateQueries(["get_msgs"]);
      setChatDialogOpen(false);
      setMessage("");
      navigate("/chat");
      // toast.success("تم إرسال الرسالة بنجاح");
    },
    onError: (error) => {
      // toast.error("حدث خطأ أثناء إرسال الرسالة");
      console.error("Error sending order to chat:", error);
    },
  });

  const handleSendToChat = () => {
    if (!message.trim()) {
      // toast.error("الرجاء كتابة رسالة");
      return;
    }

    const formData = new FormData();
    formData.append("order_id", order.id);
    formData.append("message", message);

    sendOrderToChat.mutate(formData);
  };

  return (
    <>
      <div className="card flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="w-24 lg:w-36 aspect-square overflow-hidden rounded-2xl">
            <img
              src={order?.product?.game_icon}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 max-w-sm flex-1">
            <h3 className="text-lg font-bold">{order?.product?.title}</h3>
            <p className="text-muted-foreground text-sm">
              رقم الطلب: {order.order_code}
            </p>
            <p className="text-lg font-bold">${order?.product?.price}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button
            onClick={() => setChatDialogOpen(true)}
            className="w-full gap-2"
          >
            مراسلة
            <BsChatLeftText />
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant={`outline`} className="gap-2 rounded-full">
              <BadgeCheck />
              {order.status}
            </Badge>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="gap-2 rounded-full"
            >
              <NotebookTabs />
              تفاصيل الطلب
            </Button>

            <DetailsModal
              open={open}
              onClose={() => setOpen(false)}
              order_id={order.id}
            />
          </div>
        </div>
      </div>

      {/* Chat Dialog */}
      <Dialog open={chatDialogOpen} onOpenChange={setChatDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader className={`text-center!`}>
            <DialogTitle>مراسلة بخصوص الطلب</DialogTitle>
            <DialogDescription>
              أرسل رسالتك للدعم بخصوص هذا الطلب
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Order Details */}
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={order?.product?.game_icon}
                  alt={order?.product?.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{order?.product?.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.order_code}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">السعر:</span>
                <span className="font-bold">${order?.total_price}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الحالة:</span>
                <Badge variant="outline" className="gap-1">
                  <BadgeCheck size={14} />
                  {order.status === "pending"
                    ? "قيد الانتظار"
                    : order.status === "completed"
                    ? "مكتمل"
                    : order.status}
                </Badge>
              </div>

              {order?.product?.platforms &&
                order.product.platforms.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      المنصات:
                    </span>
                    <div className="flex gap-1">
                      {order.product.platforms.map((platform) => (
                        <img
                          key={platform.id}
                          src={platform.icon}
                          alt={platform.name}
                          className="w-6 h-6 rounded"
                          title={platform.name}
                        />
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <Label htmlFor="message">رسالتك</Label>
              <Input
                id="message"
                placeholder="اكتب رسالتك هنا..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !sendOrderToChat.isPending) {
                    handleSendToChat();
                  }
                }}
                disabled={sendOrderToChat.isPending}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setChatDialogOpen(false)}
              disabled={sendOrderToChat.isPending}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleSendToChat}
              disabled={sendOrderToChat.isPending || !message.trim()}
              className="gap-2"
            >
              {sendOrderToChat.isPending ? (
                <>
                  جاري الإرسال...
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                </>
              ) : (
                <>
                  إرسال
                  <Send size={16} />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyOrdersCard;
