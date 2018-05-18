let data = [{
	name: '流程配置',
	url: '/process',
	children: [{
		name: '流程查询',
		url: '/process'
	},{
		name: '流程新增',
		url: '/process/add'
	}]
},{
	name: '产品管理',
	url: '/product',
	children: [{
		name: '产品查询',
		url: '/product/search'
	},{
		name: '产品新增',
		url: '/product/add'
	},{
		name: '材料查询',
		url: '/product/filelist'
	}]
}, {
	name: '贷款管理',
	url: '/entryquery',
	children: [{
		name: '车贷查询',
		url: '/entryquery'
	}, {
		name: '车贷申请',
		url: '/entryquery/loanApplicationOne'
	}]
}]
INSERT INTO `resources`
VALUES
	(
		10000,
		'[NAME]',#资源名称
		'[URL]',#资源地址
		'MENU',#资源类型，MENU、BUTTON
		'SAAS',#所属系统，CRM、SAAS、APP
		-1,#上级资源ID，没有=-1
		'pingchang:enter:lender:create',
		1,#状态
		2,#排序
		'',#图标
		'FUNC',
		'_parent',
	1
	);