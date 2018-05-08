/**
 * 功能：自动创建新的模块
 * 命令：node create-module.js xx xx
 * 实现：读取template下的模版文件生成到对应的目录
 * 
 */
const fs = require('fs');
const child_process = require('child_process');
const baseDir = './src/pages';
const baseTempDir = './template';
const folderSep = '/';
const moduleFolders = [
    'actions',
    'constants',
    'columns',
    'reducers',
    'reqs',
    'components',
    'containers',
];

var folderName = 'abc';
var moduleName = "Abc";
var moduleTitle = '';

try {
    var args = process.argv.splice(2);
    if (args.length < 1) {
        console.log('请输入目录名称');
        return;
    }
    folderName = args[0];
    if (!/^[a-z]{1}[a-z0-9]*$/.test(folderName.toLowerCase())) {
        console.log('输入的目录名称不正确，需要字母＋数字');
        return;
    }
    if (args.length > 1) {
        moduleName = args[1];
    } else {
        moduleName = folderName;
    }
    moduleName = moduleName.substring(0, 1).toUpperCase() + moduleName.substring(1);
    if (!/^[A-Z]{1}[a-zA-Z0-9]*$/.test(moduleName)) {
        console.log('输入的模块名称不正确，需要字母＋数字');
        return;
    }
    
    if(args.length > 2){
        moduleTitle = args[2];
    }

    const targetPath = baseDir + folderSep + folderName;

    if (fs.existsSync(targetPath)) {
        console.log('目录已存在' + targetPath);
    } else {
        fs.mkdirSync(targetPath);
        console.log('成功创建目录' + targetPath);
    }

    moduleFolders.map(function(item, i) {
        const folder = targetPath + folderSep + item;
        if (fs.existsSync(folder)) {
            console.log('目录已存在' + folder);
        } else {
            fs.mkdirSync(folder);
            console.log('成功创建目录' + folder);
        }
    })

    const templateFiles = fs.readdirSync(baseTempDir);
    templateFiles.map(function(file, i) {
        const subFilePath = baseTempDir + folderSep + file;
        const stat = fs.statSync(subFilePath);
        if (stat.isFile()) {
            copyFile(file, baseTempDir, targetPath);
        } else if (stat.isDirectory()) {
            const subFiles = fs.readdirSync(subFilePath);
            subFiles.map(function(sfile, i) {
                let ssubFilePath = subFilePath + folderSep + sfile;
                const subStat = fs.statSync(ssubFilePath);
                if (subStat.isFile()) {
                    copyFile(sfile, subFilePath, targetPath + folderSep + file)
                }else if(subStat.isDirectory()){
                    const ssubFiles = fs.readdirSync(ssubFilePath);
                    ssubFiles.map(function(ssfile, i) {
                        const ssubStat = fs.statSync(ssubFilePath + folderSep + ssfile);
                        if (ssubStat.isFile()) {
                            copyFile(ssfile, ssubFilePath, targetPath + folderSep + file + folderSep + sfile)                            
                        }
                    })
                }
            })
        }
    })

    // 创建模块后，重新生成reducer、router
    child_process.execSync('node generate-reducer.js');
    child_process.execSync('node generate-router.js');

} catch (ex) {
    console.log(ex);
}

function copyFile(fileName, sourcePath, targetPath) {
    var fileContent = fs.readFileSync(sourcePath + folderSep + fileName, 'utf8');
    fileContent = fileContent.replace(/\[ROUTERPATH\]/g, getRouterPath(folderName, moduleName));
    fileContent = fileContent.replace(/\[MODULE\]/g, moduleName);
    fileContent = fileContent.replace(/\[MODULEPATH\]/g, moduleName.toLowerCase());
    fileContent = fileContent.replace(/\[MODULENAME\]/g, moduleTitle);
    fileName = fileName.replace('Template', moduleName);

    targetPath = targetPath.replace('Template', moduleName);
    if(!fs.existsSync(targetPath)){
        fs.mkdirSync(targetPath);
    }
    fs.writeFileSync(targetPath + folderSep + fileName, fileContent, 'utf8');
}

function getRouterPath(folderName, moduleName) {
    if (folderName.toLowerCase() == moduleName.toLowerCase()) {
        return folderName.toLowerCase();
    } else {
        return folderName.toLowerCase() + '-' + moduleName.toLowerCase();
    }
}
