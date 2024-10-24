// controllers/userInfoController.js
import userInfoService from "../services/userInfoService.js";

class UserInfoController {
  async getAllUserInfo(req, res) {
    try {
      const userInfos = await userInfoService.getAllUserInfos();
      res.status(200).json(userInfos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserInfoById(req, res) {
    try {
      const userInfo = await userInfoService.getUserInfoById(req.params.id);
      if (!userInfo) {
        return res.status(404).json({ message: "UserInfo not found" });
      }
      res.status(200).json(userInfo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createUserInfo(req, res) {
    try {
      const userInfo = await userInfoService.createUserInfo(req.body);
      res.status(201).json(userInfo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUserInfo(req, res) {
    try {
      const updatedUserInfo = await userInfoService.updateUserInfo(
        req.params.id,
        req.body
      );
      if (!updatedUserInfo) {
        return res.status(404).json({ message: "UserInfo not found" });
      }
      res.status(200).json(updatedUserInfo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUserInfo(req, res) {
    try {
      const deletedUserInfo = await userInfoService.deleteUserInfo(
        req.params.id
      );
      if (!deletedUserInfo) {
        return res.status(404).json({ message: "UserInfo not found" });
      }
      res.status(200).json({ message: "UserInfo deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new UserInfoController();
