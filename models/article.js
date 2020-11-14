// node moduleにある'sqlite3'を呼び出し
const sqlite3 = require('sqlite3').verbose();
// 使用するDBを指定
const db = new sqlite3.Database(':memory:');

const article = async () => {
  // promiseのresolve(DBの処理終了時)を実行して、結果をresに格納する
  const res = await new Promise((resolve) => {

    db.serialize(async () => {
      // テーブル作成
      db.run("CREATE TABLE articles (title TEXT, body TEXT, author TEXT)");
      // 作成したテーブルにデータを格納
      const stmt = db.prepare("INSERT INTO articles VALUES (?, ?, ?)");
      stmt.run("My Article 1", "<p>Body</p>", "Sundaycrafts");
      stmt.run("My Article 2", "<p>Body</p>", "A san");
      stmt.run("My Article 3", "<p>Body</p>", "B san");
      stmt.finalize();

      const data = await new Promise((resolve) => {
        // テーブル名:articles にあるrowidが付与されているデータを取得
        db.all("SELECT rowid AS id, * FROM articles", function(err, data) {
          resolve(data)
        });
      })

      resolve(data)
    })
  })

  return res
}
// 他のファイルで　articleqをインポートできるようにする
exports.article = article
