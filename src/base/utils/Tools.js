import Webp from './Webp'

/**
 * 工具类
 **/
class Tools {
    constructor() {}

    countDown(start, end) {
        let limitTime = end - start;

        let hours = Math.floor(limitTime/60/60);
        let minutes = Math.floor(limitTime/60)-hours*60;
        let seconds = limitTime - hours*60*60 - minutes*60;

        hours = this.checkTime(hours)
        minutes = this.checkTime(minutes)
        seconds = this.checkTime(seconds)

        return hours+':'+minutes+':'+seconds;
    }

    /**
     * 按指定格式格式化日期
     */
    format(date, pattern) {
        var that = date;
        var o = {
            "M+": that.getMonth() + 1,
            "d+": that.getDate(),
            "h+": that.getHours(),
            "m+": that.getMinutes(),
            "s+": that.getSeconds(),
            "q+": Math.floor((that.getMonth() + 3) / 3),
            "S": that.getMilliseconds()
        };
        if (/(y+)/.test(pattern)) {
            pattern = pattern.replace(RegExp.$1, (that.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(pattern)) {
                pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return pattern;
    }

    /**
     * 根据时间戳获取日期对象
     */
    getDate(timeTick) {
        if (!timeTick) return null;

        if (typeof timeTick == 'string') {
            timeTick = timeTick * 1;
        }
        if (timeTick < 9999999999) {
            timeTick = timeTick * 1000;
        }
        return new Date(parseInt(timeTick));
    }

    /**
     *  货币格式化，添加货币符号和默认省略符'--'
     */
    formatCurrency(content) {
        if (content == 0) {
            return '¥' + content;
        }

        return content ? '¥' + content : '--'
    }

    /**
     *  默认时间格式化和默认省略符'--'
     */
    formatDefaultDate(content) {
        if (!content || (content && content == '0000-00-00 00:00:00')) {
            return '--';
        } else {
            return content;
        }
    }


    //时间戳格式化
    formatDate(content, type, defaultValue) {
        if (content == 0) {
            return '--';
        }
        var pattern = type || "yyyy-MM-dd hh:mm";
        if (isNaN(content) || content == null) {

            return defaultValue || content;
        } else if (typeof(content) == 'object') {
            var y = dd.getFullYear(),
                m = dd.getMonth() + 1,
                d = dd.getDate();
            if (m < 10) {
                m = '0' + m;
            }
            var yearMonthDay = y + "-" + m + "-" + d;
            var parts = yearMonthDay.match(/(\d+)/g);
            var date = new Date(parts[0], parts[1] - 1, parts[2]);
            return this.format(date, pattern);
        } else {
            if (typeof content == 'string') {
                content = content * 1;
            }
            if (content < 9999999999) {
                content = content * 1000;
            }
            var date = new Date(parseInt(content));

            return this.format(date, pattern);
        }
    }

    // 货币格式化，2050.5=>2,050.5
    formatCurrency(content, defaultValue, unit) {
        if (!content) {
            return defaultValue || '--';
        }

        content = content + ''; //转字符串

        var prefix, subfix, idx = content.indexOf('.');
        if (idx > 0) {
            prefix = content.substring(0, idx);
            subfix = content.substring(idx, content.length);
        } else {
            prefix = content;
            subfix = '';
        }

        var mod = prefix.toString().length % 3;
        var sup = '';
        if (mod == 1) {
            sup = '00';
        } else if (mod == 2) {
            sup = '0';
        }

        prefix = sup + prefix;
        prefix = prefix.replace(/(\d{3})/g, '$1,');
        prefix = prefix.substring(0, prefix.length - 1);
        if (sup.length > 0) {
            prefix = prefix.replace(sup, '');
        }
        if (subfix) {
            if (subfix.length == 2) {
                subfix += '0';
            } else if (subfix.length == 1) {
                subfix += '00';
            }
            subfix = subfix.substring(0, 3);
        }
        return prefix + subfix;
    }

    strToDate(str) { //字符串转日期，yyyy-MM-dd hh:mm:ss
        var tempStrs = str.split(" ");
        var dateStrs = tempStrs[0].split("-");
        var year = parseInt(dateStrs[0], 10);
        var month = parseInt(dateStrs[1], 10) - 1;
        var day = parseInt(dateStrs[2], 10);

        var timeStrs = tempStrs[1].split(":");
        var hour = parseInt(timeStrs[0], 10);
        var minute = parseInt(timeStrs[1], 10) - 1;
        var second = parseInt(timeStrs[2], 10);
        var date = new Date(year, month, day, hour, minute, second);
        return date;
    }

    getRunTime(systemTime, endTime, isPre, showStyle, isNewVersion) {
        if (!systemTime || isNaN(systemTime) || !endTime || isNaN(endTime)) {
            return '数据错误';
        }

        var showTime = parseInt(endTime) - parseInt(systemTime);

        var aft = '',
            bef = '';
        switch (isPre) {
            case 1:
                {
                    bef = '还有'
                    aft = '开始';
                    break;
                }
            case 2:
                {
                    bef = '剩余'
                    aft = '开奖';
                    break;
                }
            case 3:
                {
                    aft = '后开始';
                    break;
                }
            case 4:
                {
                    aft = '后抢购结束';
                    break;
                }
            case 5:
                {
                    aft = '后结束';
                    break;
                }
            case 6:
                {
                    bef = '还剩'
                    aft = '活动开始';
                    break;
                }
            case 7:
                {
                    bef = '还剩'
                    aft = '活动结束';
                    break;
                }
            default:
                {
                    bef = '剩余'
                    aft = '结束';
                    break;
                }
        }

        if (showTime <= 0) {
            return '已结束';
        }
        var nD = Math.floor(showTime / (60 * 60 * 24));
        var nH = Math.floor(showTime / (60 * 60)) % 24;
        var nM = Math.floor(showTime / 60) % 60;
        var nS = Math.floor(showTime) % 60;
        if (systemTime > 9999999999) {
            nD = Math.floor(showTime / (60 * 60 * 24 * 1000));
            nH = Math.floor(showTime / (60 * 60 * 1000)) % 24;
            nM = Math.floor(showTime / (60 * 1000)) % 60;
            nS = Math.floor(showTime / 1000) % 60;

        }
        if (showStyle == 0) {
            if (nD == 0) {
                return bef + ' <span><em>' + Tools.checkTime(nH) + '</em> : <em>' + Tools.checkTime(nM) + '</em> : <em>' + Tools.checkTime(nS) + '</em> </span> ' + aft;
            } else {
                return bef + ' <span><em>' + Tools.checkTime(nD) + '</em> 天 <em>' + Tools.checkTime(nH) + '</em> : <em>' + Tools.checkTime(nM) + '</em> : <em>' + Tools.checkTime(nS) + '</em> </span> ' + aft;
            }
        } else if (showStyle == 2) {
            return ' <span><em>' + Tools.checkTime(nD * 24 + nH) + '</em> <em>' + Tools.checkTime(nM) + '</em> <em>' + Tools.checkTime(nS) + '</em> </span>';
        } else if (showStyle == 3 && isNewVersion) {
            if (nD == 0) {
                return bef + ' ' + Tools.checkTime(nH) + '时' + Tools.checkTime(nM) + '分' + Tools.checkTime(nS) + '秒 ' + aft;
            } else {
                return bef + ' ' + Tools.checkTime(nD) + '天' + Tools.checkTime(nH) + '时' + Tools.checkTime(nM) + '分' + Tools.checkTime(nS) + '秒 ' + aft;
            }
        } else {
            if (nD == 0) {
                return bef + ' <span><em>' + Tools.checkTime(nH) + '</em>时<em>' + Tools.checkTime(nM) + '</em>分<em>' + Tools.checkTime(nS) + '</em>秒</span> ' + aft;
            } else {
                return bef + ' <span><em>' + Tools.checkTime(nD) + '</em>天<em>' + Tools.checkTime(nH) + '</em>时<em>' + Tools.checkTime(nM) + '</em>分<em>' + Tools.checkTime(nS) + '</em>秒</span> ' + aft;
            }
        }
    }

    checkTime(i) { //时分秒为个位，用0补齐
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    //获取URL参数
    getQueryValue(key) {
        var q = location.search,
            keyValuePairs = new Array();

        if (q.length > 1) {
            var idx = q.indexOf('?');
            q = q.substring(idx + 1, q.length);
        } else {
            q = null;
        }

        if (q) {
            for (var i = 0; i < q.split("&").length; i++) {
                keyValuePairs[i] = q.split("&")[i];
            }
        }

        for (var j = 0; j < keyValuePairs.length; j++) {
            if (keyValuePairs[j].split("=")[0] == key) {
                // 这里需要解码，url传递中文时location.href获取的是编码后的值
                // 但FireFox下的url编码有问题
                return decodeURI(keyValuePairs[j].split("=")[1]);

            }
        }
        return '';
    }

    // 获取窗口尺寸，包括滚动条
    getWindow() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    // 获取窗口可视区域尺寸，不包括滚动条
    getNoScrollWin() {
        return {
            width: $(window).width(),
            height: $(window).height()
        };
    }

    // 获取文档尺寸，不包括滚动条但是高度是文档的高度
    getDocument() {
        var doc = document.body;
        return {
            width: doc.clientWidth,
            height: doc.clientHeight
        };
    }

    // 获取屏幕尺寸
    getScreen() {
        return {
            width: screen.width,
            height: screen.height
        };
    }

    // 显示、禁用滚动条
    showOrHideScrollBar(isShow) {
        preventDefault = preventDefault || function(e) {
            e.preventDefault();
        };
        (document.documentElement || document.body).style.overflow = isShow ? 'auto' : 'hidden';
        // 手机浏览器中滚动条禁用取消默认touchmove事件
        if (isShow) {
            // 注意这里remove的事件必须和add的是同一个
            document.removeEventListener('touchmove', preventDefault, false);
        } else {
            document.addEventListener('touchmove', preventDefault, false);
        }
    }

    // 显示对话框
    showDialog() {}

    // 显示着遮罩层
    showOverlay() {}

    // 显示确认框
    showConfirm(msg, yesCallback, noCallback) {
        var opt = {};
        if (typeof msg == 'object') {
            opt = msg;
        } else {
            opt.message = msg;
            opt.yesCallback = yesCallback;
            opt.noCallback = noCallback;
        }
        opt.type = 'confirm';
        opt.showTitle = true;
        opt.showTip = false;
        opt.titleText = opt.titleText || '提示';
        opt.className = opt.className || 'text-c';

        panel = panel || new TipPanel();
        panel.setOptions(opt);
    }

    // 显示提示
    showAlert(msg, tick, callback) {
        var opt = {};
        if (typeof msg == 'object') {
            opt = msg;
        } else {
            opt.message = msg;
            opt.tick = tick;
            opt.yesCallback = callback;
        }
        if (typeof opt.showTitle != 'boolean') {
            opt.showTitle = false;
        }
        opt.type = 'alert';

        panel = panel || new TipPanel();
        panel.setOptions(opt);
    }

    //显示带输入框的对话框
    showPrompt(msg, tick, callback) {
        var opt = {};
        if (typeof msg == 'object') {
            opt = msg;
        } else {
            opt.message = msg;
            opt.tick = tick;
            opt.yesCallback = callback;
        }
        if (typeof opt.showTitle != 'boolean') {
            opt.showTitle = false;
        }
        opt.showTitle = true;
        opt.panelInput = true;
        opt.showTip = false;
        opt.titleText = '提示';

        opt.type = 'prompt';
        panel = panel || new TipPanel();
        panel.setOptions(opt);
    }

    // 显示加载框
    showLoading() {
        $('#rby-loading').show();
    }

    hideLoading() {
        $('#rby-loading').hide();
    }

    hidePanel(yesClick) {
        panel && panel.hide(yesClick);
    }

    showToast(msg, tick) {
        toastPanel = toastPanel || $('#rby-toast');
        tick = tick || 4000;

        if (delay) {
            clearTimeout(delay);
        }
        //！。来识别，只要句子中间，就断行
        if (typeof msg !== 'string') {
            msg = JSON.stringify(msg);
        }
        msg = msg.replace(/！/g, '！<br/>');
        msg = msg.replace(/！<br\/>$/, '！');
        msg = msg.replace(/。/g, '。<br/>');
        msg = msg.replace(/。<br\/>$/, '。');

        toastPanel.find('span').html(msg);
        toastPanel.show();
        delay = setTimeout(function() {
            toastPanel.hide();
        }, tick);
    }

    isIPad() {
        return (/iPad/gi).test(navigator.appVersion);
    }

    isIos() {
        return (/iphone|iPad/gi).test(navigator.appVersion);
    }

    isAndroid() {
        return (/android/gi).test(navigator.appVersion);
    }

    isWeChatBrowser() {
        var e = navigator.appVersion.toLowerCase();
        return "micromessenger" == e.match(/MicroMessenger/i) ? !0 : !1
    }

    getAndroidVersion() {
        var e = navigator.appVersion;
        var result = e.match(/Android\s([^;])./i);
        if (result) {
            return result[1];
        }
        return -1;
    }

    isRbyAppBrowser() {
        var e = navigator.userAgent.toLowerCase();
        return "rbyapp" == e.match(/rbyapp/i) ? !0 : !1
    }

    // 将form中的值转换为键值对
    formJson(form) {
        var o = {};
        var a = $(form).serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }

    alert(e) {
        !Cookie.get("DevDebug") ? console.log(e) : alert(e)
    }

    _GET() {
        var e = location.search,
            o = {};
        if ("" === e || void 0 === e) return o;
        e = e.substr(1).split("&");
        for (var n in e) {
            var t = e[n].split("=");
            o[t[0]] = decodeURI(t[1])
        }
        if (o.from) {
            delete o.code
        } //o.from得到的是什么值(类型)
        return o
    }

    removeParamFromUrl(e) {
        var o = Tools._GET();
        for (var n in e) delete o[e[n]];
        return location.pathname + Tools.buildUrlParamString(o)
    }

    buildUrlParamString(e) {
        var o = "";
        for (var n in e) o += n + "=" + e[n] + "&";
        o = o.slice(0, o.length - 1);
        var t = "" === o || void 0 === o;
        return t ? "" : "?" + o
    }

    //格式化价格，显示两位小数，当两位小数都为0是省略
    rbyFormatCurrency(content) {
        if (!content || isNaN(content)) return content;

        var v = parseFloat(content),
            result = v.toFixed(2);
        if (result.indexOf('.00') >= 0) {
            result = parseFloat(content).toFixed(0);
        }
        return result;
    }

    //替换URL参数
    changeURLArg(url, arg, arg_val) {
        var pattern = arg + "=([^&]*)",
            replaceText = arg + "=" + arg_val;
        if (url.match(pattern)) {
            var tmp = "/(" + arg + "=)([^&]*)/gi";
            return tmp = url.replace(eval(tmp), replaceText)
        }
        return url.match("[?]") ? url + "&" + replaceText : url + "?" + replaceText
    }

    //根据不同的终端取得Mid，如果非APP则随机生成32位,同时存到本地存储,优先获取本地存储的,没有则生成
    getMid() {
        var m;
        if (Tools.isRbyAppBrowser()) {
            m = Storage.get('rudder_deviceId');
            if (!m) {
                m = Storage.get('mid');
            }
        } else {
            m = Storage.get('mid');
            if (!m) {
                m = GUID.NewGuid().ToString();
                Storage.set('mid', m);
            }
        }
        return m;
    }

    //根据不同的终端取得appid
    getAppid() {
        var m;
        // (Tools.isIos() && ( m = 101 )) || (Tools.isAndroid() && ( m = 102 )) || (m = 103);
        if (Tools.isRbyAppBrowser()) {
            var apppHeader = Storage.get('AppHeader');
            if (apppHeader && apppHeader.rudder_market == 'iOS') {
                m = 101;
            } else {
                m = 102;
            }
        } else {
            m = 103;
        }
        return m;
    }

    //是否ios内嵌的app
    isRbyIosAppBrowser() {
        var appHeader = Storage.get('AppHeader');
        if (!appHeader || !appHeader.rudder_appType) {
            return false;
        }
        return appHeader.rudder_appType.indexOf("iOS") != -1;
    }

    //获取app的版本号，非正确版本号返回-1，否则返回整型
    getAppVersion() {
        var appHeader = Storage.get('AppHeader');

        if (!appHeader || (!appHeader.rudder_appSystemVersion && !appHeader.rudder_version)) {
            return -1;
        }

        var patternVer = /(\d\.\d\.\d)/gi,
            patterndot = /\./gi,
            appVersion = appHeader.rudder_appSystemVersion || appHeader.rudder_version,
            isVersion = appVersion.match(patternVer) + '';

        if (!isVersion) {
            return -1;
        }

        return parseInt(appVersion.replace(patterndot, ''));
    }

    //身份证校验
  cardNoValidate=(value)=> {
    let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(regIdNo.test(value)){
      return true;
    }
    return false;
  };

    //手机号码校验
  mobileValidate=(value)=> {
    let regIdNo = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    if(regIdNo.test(value)){
      return true;
    }
    return false;
  };
}

export default new Tools();
