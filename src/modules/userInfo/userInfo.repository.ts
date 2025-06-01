// repositories/userInfoRepository.js
import UserInfo from "@modules/userInfo/userInfo.model";
import UserInfoDto from "@modules/userInfo/dtos/userInfo.dto";

class UserInfoRepository {
  async findAll() {
    // return await UserInfo.find().populate("user");
    return await UserInfo.find()
      .populate("style_preferences")
      .populate({
        path: "user",
        match: { role: "customer" },
      })
      .then((userInfos) => userInfos.filter((info) => info.user !== null));
  }

  async findById(id: string) {
    return await UserInfo.findOne({ user: id })
      .populate("user")
      .populate("style_preferences");
  }

  async create(userInfoData: UserInfoDto) {
    return await UserInfo.create(userInfoData);
  }

  async update(id: string, userInfoData: UserInfoDto) {
    return await UserInfo.findOneAndUpdate({ user: id }, userInfoData, {
      new: true,
    })
      .populate("user")
      .populate("style_preference");
  }

  async delete(id: string) {
    return await UserInfo.deleteOne({ user: id });
  }
}

export default new UserInfoRepository();
