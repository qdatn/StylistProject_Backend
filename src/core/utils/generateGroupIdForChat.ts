function generateGroupId(id1: string, id2: string): string {
  // Sắp xếp senderId và receiverId theo thứ tự alphabet để đảm bảo groupId nhất quán
  const sortedIds = [id1, id2].sort();
  return sortedIds.join("_");
}
export default generateGroupId;