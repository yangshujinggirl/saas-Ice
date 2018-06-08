var data = [{
  name: '流程配置',
  url: '/process/0',
  icon: '&#xe644;',
  children: [{
    name: '流程查询',
    url: '/process'
  }, {
    name: '流程新增',
    url: '/process/add'
  }]
}, {
  name: '产品管理',
  url: '/product/0',
  icon: '&#xe677;',
  children: [{
    name: '产品查询',
    url: '/product/search'
  }, {
    name: '产品新增',
    url: '/product/add'
  }, {
    name: '材料查询',
    url: '/product/filelist'
  }]
}, {
  name: '贷款管理',
  url: '/entryquery/0',
  icon: '&#xe60b;',
  children: [{
    name: '车贷查询',
    url: '/entryquery'
  }, {
    name: '车贷申请',
    url: '/entryquery/loanApplicationOne'
  }]
}, {
  name: '审查审批',
  url: '/reviewApprove/0',
  icon: '&#xe62d;',
  children: [{
    name: '进件审查审批',
    url: '/reviewApprove'
  }]
}, {
  name: '征信管理',
  url: '/reviewApprove/10',
  icon: '&#xe62d;',
  children: [{
    name: '征信录入',
    url: '/reviewApprove/11'
  },{
    name: '征信校验',
    url: '/reviewApprove/12'
  }]
}, {
  name: '面签管理',
  url: '/interview/0',
  icon: '&#xe678;',
  children: [{
    name: '面签列表',
    url: '/interview'
  }, {
    name: '信用卡面签',
    url: '/interview/credit'
  }, {
    name: '签字管理',
    url: '/interview/sign'
  }]
}, {
  name: '合同管理',
  url: '/contract',
  icon: '&#xe678;',
  children: [{
    name: '合同模版',
    url: '/contract'
  }, {
    name: '合同编辑',
    url: '/contractedit'
  }, {
    name: '合同归档',
    url: '/contractfile'
  }]
}];


var startResourceId = 10000;
var startRoleResourceId = 8000;
var resource_tpl = "INSERT INTO `resources` VALUES([ID],'[NAME]','[URL]','MENU','SAAS',[PID],'[PERMISSION]',1,[ORDER],'[ICON]','FUNC','_parent',1);"
var role_resource_tpl = "INSERT INTO `role_resource` VALUES ([ID], 10, [RESOURCEID], '[PERMISSION]', 1, '2018-05-08 19:20:09', '2018-05-08 19:20:09');"
var result = [];

function addResource(data, pid) {
  if (!data || data.length == 0) {
    return;
  }

  for (var i = 0, len = data.length; i < len; i++) {
    data[i].id = startResourceId;
    data[i].rid = startRoleResourceId;
    data[i].permission = 'pingchang:saas' + data[i].url.replace(/\//g, ':');
    data[i].pid = pid;

    result.push(replaceTpl(data[i]));
    result.push(replaceRoleTpl(data[i]));

    addResource(data[i].children, data[i].id);
  }
}

function replaceTpl(d){
	let str = resource_tpl;
	str = str.replace('[ID]', d.id);
	str = str.replace('[NAME]', d.name);
	str = str.replace('[URL]', d.url);
	str = str.replace('[PID]', d.pid || -1);
	str = str.replace('[PERMISSION]', d.permission);
	str = str.replace('[ORDER]', d.id);
	str = str.replace('[ICON]', d.icon || '');

	startResourceId++;

	return str;
}

function replaceRoleTpl(d){
	let str = role_resource_tpl;
	str = str.replace('[ID]', d.rid);
	str = str.replace('[RESOURCEID]', d.id);
	str = str.replace('[PERMISSION]', d.permission);

	startRoleResourceId++;

	return str;
}


addResource(data);

console.log(result.join('\r\n'))
