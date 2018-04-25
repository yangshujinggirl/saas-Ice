/**
 * 功能：自动生成reducer的
 * 命令：node generate-reducer.js
 * 实现：读取src目录下的所有子目录的reducer目录，
 *      识别到带有reducer关键字的文件当作的入口文件，
 *      按照一定格式拼成一个路由模块
 */

const fs = require('fs');
const baseDir = './src/pages'; //代码根目录
const targetDir = './src';
const folderSep = '/'; //目录分隔符

var routerTpl =
  "/**\r\n" +
  " * 该文件系自动生成，手动修改可能会被替换\r\n" +
  " * 可以通过node generate-reducer.js自动生成\r\n" +
  " */\r\n" +
  "[DEF]\r\n" +
  "export default {\r\n" +
  "[ABC]" +
  "};"

try {
  var routers = [], //所有的路由文件
    importReducerStr = '', //生成的路由文件正文
    routerStr = '', //生成的路由文件正文
    reducersKey = 'reducers';

  const moduleFolders = fs.readdirSync(baseDir);

  moduleFolders.map((file) => {
    if (file.indexOf('.') == 0) {
      return;
    }

    const subFilePath = baseDir + folderSep + file + folderSep + reducersKey;
    if (!fs.existsSync(subFilePath)) {
      return;
    }
    const stat = fs.statSync(subFilePath);

    if (stat.isDirectory()) {

      const routerFiles = fs.readdirSync(subFilePath);
      routerFiles.map((sfile) => {
        const sstat = fs.statSync(subFilePath + folderSep + sfile);

        if (sstat.isFile() && sfile.toLowerCase().indexOf('reducer') != -1) {
          routers.push({
            key: file,
            path: file + folderSep + reducersKey + folderSep + sfile
          });
        }
      });
    }
  });

  if (routers.length == 0) {
    console.log('还没有目录');
    return;
  }

  routers.map((item, i) => {
    routerStr += '    ' + item.key + 'Reducer,\r\n';
    importReducerStr += 'import ' + item.key + 'Reducer from "./pages/' + item.path + '"\r\n';
  });

  routerTpl = routerTpl.replace('[DEF]', importReducerStr);
  routerTpl = routerTpl.replace('[ABC]', routerStr);

  fs.writeFileSync(targetDir + folderSep + '_reducers.js', routerTpl, 'utf8');

  console.log('更新reducers成功\r\n' + routerTpl);
} catch (ex) {
  console.log(ex);
}