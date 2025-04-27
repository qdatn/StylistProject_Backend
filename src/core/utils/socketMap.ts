const userSocketMap = new Map<string, string>();

export function registerUserSocket(userId: string, socketId: string) {
  userSocketMap.set(userId, socketId);
}

export function removeUserSocket(socketId: string) {
  for (const [userId, id] of userSocketMap.entries()) {
    if (id === socketId) {
      userSocketMap.delete(userId);
      break;
    }
  }
}

export function getUserSocketId(userId: string) {
  return userSocketMap.get(userId);
}
