/**
 * 功能：自动生成路由的
 * 命令：node generate-router.js
 * 实现：读取src目录下的所有子目录，
 *      识别到带有route关键字的文件当作路由的入口文件，
 *      按照一定格式拼成一个路由模块
 */

const fs = require('fs');
const baseDir = './src/pages'; //自定义模块根目录
const targetDir = './src'; //代码根目录
const folderSep = '/'; //目录分隔符

var routerTpl =
  "/**\n" +
  " * 该文件系自动生成，手动修改可能会被替换\n" +
  " * 可以通过node generate-router.js自动生成\n" +
  " */\n" +
  "[DEF]\r\n" +
  "export default [" +
  "ABC" +
  "\n];\n"

try {
  var routers = [], //所有的路由文件
    importReducerStr = '', //生成的路由文件正文
    remarks = [], //相对应的路由备注
    routerStr = []; //生成的路由文件正文

  const moduleFolders = fs.readdirSync(baseDir);

  moduleFolders.map((file) => {
    if (file.indexOf('.') == 0) {
      return;
    }

    const subFilePath = baseDir + folderSep + file;
    const stat = fs.statSync(subFilePath);

    if (stat.isDirectory()) {
      // 这里约定只处理两级目录结构

      const routerFiles = fs.readdirSync(subFilePath);
      routerFiles.map((sfile) => {
        const sstat = fs.statSync(subFilePath + folderSep + sfile);

        if (sstat.isFile() && sfile.toLowerCase().indexOf('route') != -1) {
          // 只处理包含router关键字名称的文件
          remarks.push(getPathFromFile(subFilePath + folderSep + sfile));
          // routers.push(file + folderSep + sfile);
          routers.push({
            key: file,
            file: sfile,
            path: file + folderSep + sfile
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
    let name = item.file;
    let idx = name.indexOf('.');
    if(idx != -1){
        name = name.substring(0,idx);
    }
    // routerStr.push('\n    // ' + remarks[i]);
    // routerStr.push('\n    require("./' + item + '")');
    routerStr.push('\n    ' + name);
    importReducerStr += 'import ' + name + ' from "./pages/' + item.path + '"\r\n';
  });

  routerTpl = routerTpl.replace('[DEF]', importReducerStr);
  routerTpl = routerTpl.replace('ABC', routerStr.join(','));

  fs.writeFileSync(targetDir + folderSep + '_routes.js', routerTpl, 'utf8');

  console.log('更新路由成功\n' + routerTpl);
} catch (ex) {
  console.log(ex);
}

/**
 * 从文件中获取路由的信息
 * @param filePath 文件绝对地址
 * @return
 */
function getPathFromFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  let arr = content.match(/path.*,/);
  if (arr) {
    let pathStr = arr[0];
    pathStr = pathStr.replace('path: \'', '').replace('\',', '');
    return pathStr;
  }

  return null;
}
