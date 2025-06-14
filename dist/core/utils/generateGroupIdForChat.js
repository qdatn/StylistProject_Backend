"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateGroupId(id1, id2) {
    // Sắp xếp senderId và receiverId theo thứ tự alphabet để đảm bảo groupId nhất quán
    const sortedIds = [id1, id2].sort();
    return sortedIds.join("_");
}
exports.default = generateGroupId;
//# sourceMappingURL=generateGroupIdForChat.js.map