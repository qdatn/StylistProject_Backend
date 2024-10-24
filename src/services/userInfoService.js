// services/userInfoService.js
import userInfoRepository from "../repositories/userInfoRepo.js";

class UserInfoService {
  async getAllUserInfos() {
    return await userInfoRepository.findAll();
  }

  async getUserInfoById(id) {
    return await userInfoRepository.findById(id);
  }

  async createUserInfo(userInfoData) {
    return await userInfoRepository.create(userInfoData);
  }

  async updateUserInfo(id, userInfoData) {
    return await userInfoRepository.update(id, userInfoData);
  }

  async deleteUserInfo(id) {
    return await userInfoRepository.delete(id);
  }
}

export default new UserInfoService();
