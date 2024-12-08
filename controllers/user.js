const User = require("../models/user");
const { userValidate } = require("../helpers/validation");
const { verifyAccessToken } = require("../helpers/jwt_service");

module.exports = {
  getListUser: async (req, res, next) => {
    try {
      const users = await User.find();
      if(users) {
        const userInfos = users.map((user) => {
          const { password, isFirstLogin,...userInfo } = user._doc;
          return userInfo;
        })
        return res.status(200).json({
          data: userInfos,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        const { password, isFirstLogin, ...userInfo } = user._doc;
        return res.status(200).json({
          data: userInfo,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getCurrentUser: async (req, res, next) => {
    if (!req.headers["authorization"]) {
      return res.status(400).json({
        msg: "No bearer token provided",
      });
    }
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    try {
      const payload = await verifyAccessToken(token);
      const { userId } = payload;
      const user = await User.findOne({
        _id: userId,
      });
      if (user) {
        const { password, isFirstLogin, ...userInfo } = user._doc;
        return res.status(200).json({
          data: userInfo,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
