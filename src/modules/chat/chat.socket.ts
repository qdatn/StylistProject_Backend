import { Server, Socket } from  "socket.io";
import ChatService from "./chat.service";
import { getUserSocketId } from "@core/utils/socketMap";

interface MessagePayload {
  sender: string;
  receiver: string;
  content: string;
}

export default function handleChatSocket(io: Server, socket: Socket) {
  socket.on("sendMessage", async (data: MessagePayload) => {
    const { sender, receiver, content } = data;
    const message = await ChatService.saveMessage(sender, receiver, content);

    // Gửi tới người nhận nếu online
    const receiverSocketId = getUserSocketId(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", message);
    }

    // Xác nhận cho người gửi
    socket.emit("messageSent", message);
  });
}
