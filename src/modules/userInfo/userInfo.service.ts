// services/userInfoService.js
import UserInfoRepository from "@modules/userInfo/userInfo.repository";
import UserInfoDto from "@/modules/userInfo/dtos/userinfo.dto";

class UserInfoService {
  async getAllUserInfos() {
    return await UserInfoRepository.findAll();
  }

  async getUserInfoById(id: string) {
    return await UserInfoRepository.findById(id);
  }

  async createUserInfo(userInfoData: UserInfoDto) {
    return await UserInfoRepository.create(userInfoData);
  }

  async updateUserInfo(id: string, userInfoData: UserInfoDto) {
    return await UserInfoRepository.update(id, userInfoData);
  }

  async deleteUserInfo(id: string) {
    return await UserInfoRepository.delete(id);
  }
}

export default new UserInfoService();
