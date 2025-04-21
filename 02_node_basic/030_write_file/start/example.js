// ファイル操作のライブラリをimport
const fs = require('fs');
const path = require('path')

console.log(__dirname);
console.log(__filename);

// 第一引数をカレントディレクトリとして、第二引数に相対パスを指定することで、その絶対パスを返す
const distPath = path.resolve(__dirname, '../dist/text.txt');
console.log(distPath);
// join()は、Pathを連結させる。
const pathJoin = path.join(__dirname, TextDecoderStream.txt);
console.log(pathJoin);

// const dirName = __dirname + '/test.txt'
// fs.writeFileSync(distPath, 'hello, woooooooooorld');
