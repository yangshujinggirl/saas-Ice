/**
 * 功能：自动生成路由的
 * 命令：node generate-navs.js
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
  " * 可以通过node generate-navs.js自动生成\n" +
  " */\n" +
  "export default [" +
  "ABC" +
  "\n];\n"

try {
  var remarks = [], //相对应的路由备注
    routerStr = []; //生成的路由文件正文

  const moduleFolders = fs.readdirSync(baseDir);

  moduleFolders.map((file) => {
    if (file.indexOf('.') == 0) {
      return;
    }

    if (file.indexOf('Account') == 0) {
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
          remarks.push(getRouteFromFile(subFilePath + folderSep + sfile));
        }
      });
    }
  });

  if (remarks.length == 0) {
    console.log('还没有目录');
    return;
  }

  remarks.map((item, i) => {
    routerStr.push('\n    ' + JSON.stringify(item));
  });

  routerTpl = routerTpl.replace('ABC', routerStr.join(','));

  fs.writeFileSync(targetDir + folderSep + '_navs.js', routerTpl, 'utf8');

  console.log('更新菜单成功\n' + routerTpl);
} catch (ex) {
  console.log(ex);
}

/**
 * 从文件中获取路由的信息
 * @param filePath 文件绝对地址
 * @return
 */
function getRouteFromFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  let patharr = content.match(/path.*,/g);
  let namearr = content.match(/name.*,/g);

  let d = {
    value: {
      icon: '&#xe643',
      name: '',
      value: ''
    },
    leaf: []
  }

  if (patharr && patharr.length > 0) {
    let leafs = [];
    let prefix = '';
    patharr.map((item, i) => {
      item = item.replace(/path:\s*(\"|\')+/, '').replace(/(\"|\')+,/, '');

      let name;
      if (namearr && namearr.length > 0) {
        name = namearr[i];
        if(name) {
          name = name.replace(/name:\s*(\"|\')+/, '').replace(/(\"|\')+,/, '');
        }

      }
      if (i == 0) {
        prefix = item;
        d.value.value = item + '';
        d.value.name = name || item
        leafs.push({
          value: {
            name: name || item,
            value: prefix
          }
        })
      } else {
        leafs.push({
          value: {
            name: name || item,
            value: prefix + '/' + item
          }
        })
      }
    })
    d.leaf = leafs;
    return d;
  }

  return null;
}
