// // コンソールにコマンドライン引数を出力する
// // console.log(process.argv);

// // node:utilモジュールを、utilオブジェクトとしてインポートする
// import * as util from "node:util";

// // コマンドライン引数をparseArgs関数でパースする。
// const { values, positionals } = util.parseArgs({
//   // オプションやフラグ以外の引数を渡すことを許可する。
//   allowPositionals: true,
// });

// // ファイルパスをpositionalから取り出す
// const filePath = positionals[0];
// console.log(filePath);

// // fs/promisesモジュール全体を読み込む
// import * as fs from "node:fs/promises";

// // fs/promisesモジュールからreadfile関数を読み込む
// import { readFile } from "node:fs/promises";

// // 非同期APIを提供するfs/promiseモジュールを読み込む
// import * as fs from "node:fs/promises";

// fs.readFile("sample.md")
//   .then((file) => {
//     console.log(file);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// // 同期APIを提供するモジュールを読み込む

// import * as fs from "node:fs";
// import { sourceMapsEnabled } from "node:process";

// try {
//     const file = fs.readFileSync("sample.md");
// } catch (err) {
//     // ふぁおるが読み込めない時に呼ばれる
// }

// // fsモジュールにはエラーファーストコールバックを扱う非同期APIも含まれる
// import * as fs from "node:fs/promises";

// // エラーファーストコールバックの第一引数にはエラー、第二引数には入るというルール
// fs.readFile("sample.md", (err, file) => {
//   if (err) {
//     console.error(err.message);
//     process.exit(1);
//     return;
//   }
//   console.log(file);
// });

// utilモジュールをutilオブジェクトとしてインポート
import * as util from "node:util";
// fs/promisesモジュールをfsオブジェクトとしてインポート
import * as fs from "node:fs/promises";
// // markedモジュールからmarkedオブジェクトをインポートする
// import { marked } from "marked";
// md2htmlモジュールからmd2html関数をインポートする
import { md2html } from "./md2html.js";
// コマンドライン引数からファイルパスを取得する
const { values, positionals } = util.parseArgs({
  allowPositionals: true,
  options: {
    // gfmEnableフラグを定義する
    gfmEnable: {
      // オプションの型をbooleanに指定
      type: "boolean",
      // --gfmフラグがない場合のデフォルト値をfalseに指定
      default: false,
    },
  },
});
// valuesにはオプションのパース結果がオブジェクトとして格納される
console.log(values.gfmEnable); // --gfmEnableフラグがあればtrueなければfalse
// ファイルパスをpositionals配列から取り出す
const filePath = positionals[0];
// ファイルをUTF-8として非同期で読み込む
fs.readFile(filePath, { encoding: "utf-8" })
  .then((file) => {
    // md2htmlモジュールをつかってHTMLに間関する
    const html = md2html(file, {
      // gfmEnableフラグのパース結果をオプションとして渡す
      gfm: values.gfmEnable,
    });
    console.log(html);
  })
  .catch((err) => {
    console.error(err.message);
    // 終了ステータス1（一般的なエラー）としてプロセスを終了する
    process.exit(1);
  });
