#!/bin/bash
#
param=$1
upcmd=$2
repository=http://www1.pingchang666.com:81/web/pingchang-config-server-pro.git

if [[ $param == '' ]]; then
	echo '请输入一个分支名[master|ft1|ft2|ft3|login]'
	exit
fi

if [[ $param != 'master' && $param != 'ft1' && $param != 'ft2' && $param != 'ft3' && $param != 'login' ]]; then
	echo '输入的分支名不在范围内'
	exit
fi

if [[ ! -d release ]]; then
    git clone $repository release
fi

if [[ ! -d release ]]; then
    echo 'clone失败，请重试'
    exit
fi

# 进入目录切换代码到指定分支并更新最新代码
# 要求都是本地没修改、没冲突
cd release
if [[ ! -d .git ]]; then
	cd ../
    git clone $repository release
    cd release
fi

# 分支不存在则创建
if [[ $(git branch -a | grep $param -c) -lt 1 ]]; then
	git branch $param
fi

git checkout $param
git pull origin $param
git fetch origin
git merge master
git push origin $param

cd ../

# 执行构建
export NODE_BUILD=$param
npm run prod

# 拷贝打包后的代码
cp -r build/* release

# 提交本次更改
cd release
git add .
git commit -am 'update'
git push origin $param

# 执行上传到服务器命令
if [[ $upcmd == '-up' ]]; then
	npm run $param
fi

