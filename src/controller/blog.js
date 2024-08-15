const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: "标题 A",
      content: "内容 A",
      createTime: 1723728629229,
      author: "zhangsan",
    },
    {
      id: 2,
      title: "标题 B",
      content: "内容 B",
      createTime: 1723728699229,
      author: "lisi",
    },
  ];
};

const getDetail = (id) => {
  return {
    id: 1,
    title: "标题 A",
    content: "内容 A",
    createTime: 1723728629229,
    author: "zhangsan",
  };
};

module.exports = { getList, getDetail };
