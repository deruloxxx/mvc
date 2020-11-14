// インポート
const {article} = require('../models/article')

const rootController = async (req, res) => {
  // articleの結果を格納
  const data = await article()

  // 以下のタグでarticleの結果を出力
  res.send(`<h1>${data[0].title}</h1><p>${data[0].body}</p><p><small>${data[0].author}</small></p>`)
};

// 他のファイルで　articleqをインポートできるようにする
exports.rootController = rootController
