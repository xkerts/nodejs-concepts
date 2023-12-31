const User = require("../model/User");

const handleLogout = async (req, res) => {
  //On client also delete the access token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  //Check if refreshToken is in DB
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  //Delete refresh token in DB
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
  res.sendStatus(204);
};

module.exports = { handleLogout };
