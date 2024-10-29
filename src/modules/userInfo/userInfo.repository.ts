// repositories/userInfoRepository.js
import UserInfo from "@modules/userInfo/userInfo.model";
import UserInfoDto from "@/modules/userInfo/dtos/userinfo.dto";

class UserInfoRepository {
  async findAll() {
    return await UserInfo.find();
  }

  async findById(id: string) {
    return await UserInfo.findOne({ user: id }).populate("user");
  }

  async create(userInfoData: UserInfoDto) {
    return (await UserInfo.create(userInfoData)).populate("user");
  }

  async update(id: string, userInfoData: UserInfoDto) {
    return await UserInfo.findOneAndUpdate({ user: id }, userInfoData, {
      new: true,
    }).populate("user");
  }

  async delete(id: string) {
    return await UserInfo.deleteOne({ user: id });
  }
}

export default new UserInfoRepository();
