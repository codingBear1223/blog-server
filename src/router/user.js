const handleUserRouter = (req, res) => {
  const method = req.method;

  //登录
  if (method === "POST" && path === "/api/user/login") {
    return {
      msg: "这是登录的接口",
    };
  }
};
module.exports = handleUserRouter;