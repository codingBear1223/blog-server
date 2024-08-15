const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const { resolve } = require("path");

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    if (req.headers["Content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
      return;
    });
  });
  return promise;
};
const serverHandler = (req, res) => {
  //设置返回的格式为 JSON
  res.setHeader("Content-type", "application/json");
  const url = req.url;
  const path = url.split("?")[0];
  req.path = path;
  //get 请求的参数
  req.query = querystring.parse(url.split("?")[1]);
  //post 请求的参数
  getPostData(req).then((data) => {
    req.body = data;
  });
  //博客路由=>操作博客
  const blogData = handleBlogRouter(req, res);
  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }

  //用户信息路由=>操作用户信息
  const userData = handleUserRouter(req, res);
  if (userData) {
    res.end(JSON.stringify(userData));
    return;
  }
  //未命中路由，返回404
  res.writeHead("404", { "Content-type": "text/plain" });
  res.write("404 Not Found\n");
  res.end();
};

module.exports = serverHandler;
