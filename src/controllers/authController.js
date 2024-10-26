// controllers/authController.js
import authService from "../services/authService.js";

class AuthController {
  async register(req, res) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      res.json({ user, token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await authService.updateUser(req.params.id, req.body);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const result = await authService.deleteUser(req.params.id);
      if (!result) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AuthController();
