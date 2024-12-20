"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFolderFromUrl;
function getFolderFromUrl(url) {
    const urlParts = url.split("/"); // Tách URL thành các phần tử
    const folderIndex = urlParts.indexOf("upload") + 1; // Lấy chỉ số phần tử sau 'upload'
    const folder = urlParts.slice(folderIndex, -1).join("/"); // Lấy phần thư mục và ghép lại
    return folder || null;
}
//# sourceMappingURL=getFolderFromUrl.js.map