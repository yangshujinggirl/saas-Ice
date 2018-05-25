import React, { Component } from 'react';
export default class InterviwDialog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            SEARCH_TABLE: null,
            beCalling: '',
            NIM_INS: null,
            // _this.NIM_WEBNET,
            NIM_WEBRTC: null,
            NETCALL: null,
            CALL_LIST: [],
            callMethod: null,
            beCalledInfo: null,
            // 呼叫超时检查定时器
            callTimer: null,
            // 被呼叫超时检查定时器
            beCallTimer: null,
            // 音频或视频通话
            type: null,
            // 是否处于通话流程中
            netcallActive: false,
            // 通话的channelId
            channelId: null,
            // 通话流程的另一方账户
            netcallAccount: "",
            // 通话时长
            netcallDuration: 0,
            // 通话正式开始时间戳
            netcallStartTime: 0,
            // 通话时长定时器
            netcallDurationTimer: null,
            afterPlayRingA: '',

            // 是否开启摄像头输入
            deviceVideoInOn: true,
            // 是否开启音频输入
            deviceAudioInOn: true,
            // 是否开启扬声器输出
            deviceAudioOutOn: true,
            // 是否全屏状态
            isFullScreen: false,

            isRtcSupported: true,
            // 当前视频状态，是桌面共享还是视频: video / window / screen
            videoType: 'video',
            sessionConfig: {
                videoQuality: Netcall.CHAT_VIDEO_QUALITY_480P,
                videoFrameRate: Netcall.CHAT_VIDEO_FRAME_RATE_NORMAL,
                videoBitrate: 0,
                recordVideo: true,
                recordAudio: true,
                highAudio: true
            },
        }
    }
    componentDidMount() {
        if (false) {
            this._initNetcall(this.props.initDate)
        }    
    }
    _initNetcall(data, connectCallback) {
        let _this = this;
        window.NIM.use(window.Netcall);
        window.NIM.use(window.WebRTC);
        let NIM_INS = window.NIM.getInstance({
            // debug: true || { api: 'info', style: 'font-size:14px;color:blue;background-color:rgba(0,0,0,0.1)' },
            account: data.accId,
            // account: 'steven',
            gender: '男',
            appKey: data.appKey,
            token: data.token,
            // token: '89fae3c4a75c36868bf9ef96c6f35e7e',
            onconnect: function (d) {
                // connectCallback(d);
                // _this._onConnect(d);
                // _this.once = false;
                console.log('链接成功：',d)
            },
            onwillreconnect: _this._onWillReconnect,
            ondisconnect: _this._onDisconnect,
            onerror: _this._onError,
            // 多端登录
            onloginportschange: _this._onLoginPortsChange,
            // 用户关系
            onblacklist: _this._onBlacklist,
            onsyncmarkinblacklist: _this._onMarkInBlacklist,
            onmutelist: _this._onMutelist,
            onsyncmarkinmutelist: _this._onMarkInMutelist,
            // 好友关系
            onfriends: _this._onFriends,
            onsyncfriendaction: _this._onSyncFriendAction,
            // 用户名片
            onmyinfo: _this._onMyInfo,
            onupdatemyinfo: _this._onUpdateMyInfo,
            onusers: _this._onUsers,
            onupdateuser: _this._onUpdateUser,
            // 机器人列表的回调
            onrobots: _this._onRobots,
            // 群组
            onteams: _this._onTeams,
            onsynccreateteam: _this._onCreateTeam,
            onteammembers: _this._onTeamMembers,
            // onsyncteammembersdone: _this._onSyncTeamMembersDone,
            onupdateteammember: _this._onUpdateTeamMember,
            // 会话
            onsessions: _this._onSessions,
            onupdatesession: _this._onUpdateSession,
            // 消息
            onroamingmsgs: _this._onRoamingMsgs,
            onofflinemsgs: _this._onOfflineMsgs,
            onmsg: _this._onMsg,
            // 系统通知
            onofflinesysmsgs: _this._onOfflineSysMsgs,
            onsysmsg: _this._onSysMsg,
            onupdatesysmsg: _this._onUpdateSysMsg,
            onsysmsgunread: _this._onSysMsgUnread,
            onupdatesysmsgunread: _this._onUpdateSysMsgUnread,
            onofflinecustomsysmsgs: _this._onOfflineCustomSysMsgs,
            oncustomsysmsg: _this._onCustomSysMsg,
            // 收到广播消息
            onbroadcastmsg: _this._onBroadcastMsg,
            onbroadcastmsgs: _this._onBroadcastMsgs,
            // 同步完成
            onsyncdone: _this._onSyncDone
        });
        _this.setState({
            NIM_INS
        })
        // 初始化webrtc
        let NIM_WEBRTC = window.WebRTC.getInstance({
            nim: _this.state.NIM_INS,
            container: document.getElementById('interview-box'),
            remoteContainer: document.getElementById('interview-remove')
            // debug: true
        });
        _this.setState({
            NIM_WEBRTC
        })
        // 初始化 netcall
        // _this.NIM_WEBNET = window.Netcall.getInstance({
        //     nim: _this.NIM_INS,
        //     mirror: false,
        //     mirrorRemote: false,
        //     /*kickLast: true,*/
        //     container: $('#netcall_container')[0],
        //     remoteContainer: $('#remote_container')[0]
        // });
        // 默认使用webrtc模式
        let NETCALL = _this.state.NIM_WEBRTC;
        _this.setState({
            NETCALL 
        })
        let callMethod = 'webrtc';
        _this.setState({
            callMethod 
        })

        // 初始化webrtc事件
        _this._initWebrtcEvent();
    }
    _initWebrtcEvent() {
        let _this = this,
            webrtc = _this.state.NETCALL;
        // 对方接受通话 或者 我方接受通话，都会触发
        webrtc.on("callAccepted", function (obj) {
            console.log('对方接受通话 或者 我方接受通话，都会触发')
            _this._onCallAccepted(obj);
        }.bind(_this));
        webrtc.on("callRejected", function (obj) {
            layer.msg('对方拒绝了视频请求');
            console.log('对方拒绝了视频请求');
        }.bind(_this));
        webrtc.on('signalClosed', function () {
            console.log("信号关闭");
            _this.setState({
                beCalling: false
            })
        }.bind(_this));
        webrtc.on('rtcConnectFailed', function () {
            console.log("rtc 连接中断");
        }.bind(_this));
        webrtc.on("devices", function (obj) {
        }.bind(_this));
        webrtc.on("deviceStatus", function (obj) {
            console.log("on deviceStatus:", obj);
        }.bind(_this));
        webrtc.on("beCalling", function (obj) {
            console.log('beCalling')
            _this._onBeCalling(obj);
        }.bind(_this));
        webrtc.on("control", function (obj) {
            console.log('control')
            _this._onControl(obj);
        }.bind(_this));
        webrtc.on("hangup", function (obj) {
            // doing:
            console.log("检测挂断");
            _this._onHangup(obj);
        }.bind(_this));
        webrtc.on("heartBeatError", function (obj) {
            console.log("heartBeatError,要重建信令啦");
        }.bind(_this));
        webrtc.on("callerAckSync", function (obj) {
            console.log('callerAckSync')
        }.bind(_this));
        webrtc.on("netStatus", function (obj) {
            console.log("on net status:", obj);
        }.bind(_this));
        webrtc.on("statistics", function (obj) {
        }.bind(_this));
        webrtc.on("audioVolume", function (obj) {
        }.bind(_this));
        webrtc.on('joinChannel', function (obj) {
            console.log('joinChannel: user join', obj)
            _this._onJoinChannel(obj);
        }.bind(_this))
        webrtc.on('leaveChannel', function (obj) {
            console.log('leaveChannel')
        }.bind(_this))
    }
    _onHangup(obj) {
        let _this = this;
        console.log("收到对方挂断通话消息");
        console.log("on hange up", obj);
        console.log(_this.state.beCalling, _this.state.beCalledInfo, _this.state.netcallDurationTimer);
        _this._removeBeCalling(obj.account);
        // 关闭面签弹框和开始提示音量
        // if (_this.listNum) {
        //     $('#audioId') ? $('#audioId')[0].play() : '';
        // }
        // _this.interviewing = true;
        if (_this.state.CALL_LIST.length <= 0) {
            // $('.interview-wrap .video-tools, #beCallingRejectButton').addClass('hide');
            // $('.video-none').removeClass('hide');
        }
        if (!_this._isBeCalling(obj.channelId)) {
            return;
        }
        // 是否挂断当前通话
        if (obj.account && obj.account === _this.state.netcallAccount) {
            close.call(_this);
        }
        if (_this.state.netcallDurationTimer !== null && _this.state.NETCALL.notCurrentChannelId(obj)) {
            return console.log("挂断消息不属于当前活动通话，忽略1");
        }
        if (_this.state.netcallDurationTimer === null && _this.state.beCalling && _this.state.beCalledInfo.channelId !== obj.channelId) {
            return console.log("挂断消息不属于当前活动通话，忽略2");
        }
        if (_this.state.netcallDurationTimer === null && !_this.state.beCalling) {
            return console.log("挂断消息不属于当前活动通话，忽略3，当前无通话活动");
        }
        _this._clearBeCallTimer();
        function close() {
            _this.setState({
                beCalledInfo: null,
                beCalling: false
            })
            // _this.hideAllNetcallUI();
            _this._setDeviceVideoIn(false);
            _this._setDeviceAudioIn(false);
            _this._setDeviceAudioOut(false);
            /**状态重置 */
            _this._resetWhenHangup();
        }
        close.call(_this);

    }
    _resetWhenHangup() {
        let _this = this;
        /** 放开通道 */
        let channelId = null;
        _this.signalInited = false;
        _this.state.NETCALL && _this.state.NETCALL.stopSignal && _this.state.NETCALL.stopSignal();
        // _this.videoType = null

        /** 设置自己空闲 */
        _this.state.NETCALL.calling = false;
        // _this.calling = false;
        let netcallActive = false;
        let netcallAccount = "";
        _this.setState({
            isFullScreen: false,
            videoType: null,
            beCalling: false,
            netcallActive,
            channelId,
            netcallAccount
        })
        /** 关闭呼叫响铃 */
        _this._clearRingPlay();

        /** 关闭各种计时器 */
        _this._clearDurationTimer();
    }
    _onJoinChannel(obj) {
        var _this = this;
        // 如果是p2p模式
        _this._startDeviceAudioOutChat()
        _this._startRemoteStreamMeeting(obj)
        _this._updateVideoShowSize(false, true);
        /** 停止呼叫音乐 */
        _this._clearRingPlay();
    }
    _startRemoteStreamMeeting(obj) {
        let _this = this,
            netcall = _this.state.NETCALL;
        if (!obj.account && !obj.uid) {
            console.log('远程流错误，缺少account或者uid：', obj);
        }
        if (!obj.account) {
            obj.account = netcall.getAccountWithUid(obj.uid);
        }
        /** 根据帐号找到对应的节点，播放音视频
         * @param {string} account 唯一id帐号uid
         */
        if (netcall) {
            netcall.startRemoteStream(obj)
        }
    }
    _startDeviceAudioOutChat() {
        let _this = this;
        _this.state.NETCALL.startDevice({
            type: Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT
        }).catch(function () {
            console.log('播放对方的声音失败')
        })
    }
    _onBeCalling(obj, scene) {
        let _this = this;
        let netcall = _this.state.NETCALL;
        let channelId = obj.channelId;
        _this.setState({
            channelId
        })
        scene = scene || 'p2p';
        console.log("收到音视频呼叫", obj);
        // 如果是同一通呼叫，直接丢掉
        if (_this._hasBeCalling(channelId)) {
            return;
        }
        // 如果是同一用户, 拒绝通话
        if (_this._hasBeCallingByAccount(obj.account)) {
            _this._reject(obj);
            return;
        }
        // 进入等待列表, 如果大于五个拒绝通话
        if (_this.state.CALL_LIST.length != 0) {
            let tmp = { command: Netcall.NETCALL_CONTROL_COMMAND_BUSY };
            tmp.channelId = channelId;
            console.log("通知呼叫方我方不空");
            netcall.control(tmp);
            _this._removeBeCalling(account);
            return;
        }
        obj.interStatus = '2';
        // base64解密
        //obj.customData = obj.custom ? JSON.parse(tools.utf8to16(tools.base64decode(obj.custom))) : '';
        let CALL_LIST = _this.state.CALL_LIST.push(obj);
        _this.setState({
            CALL_LIST
        })
        //_this._showQueuingList();
        netcall.control({
            channelId: channelId,
            command: Netcall.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED
        });
        // 正常发起通话请求
        let type = obj.type;
        channelId = obj.channelId;
        _this.setState({
            beCalling:true
        })
        //p2p场景
        let account = obj.account;
        let netcallActive = true;
        let netcallAccount = account;        
        _this.setState({
            netcallActive,
            type,
            channelId,
            netcallAccount
        })
        if (!netcall.calling && _this.state.beCalling) {
            // $('.interview-wrap .video-tools').removeClass('hide');
            // $('.video-none').addClass('hide');
        }
        _this._callAcceptedResponse();
    }
    _hasBeCalling(id) {
        let _this = this;
        for (var i = 0; i < _this.state.CALL_LIST.length; i++) {
            if (_this.state.CALL_LIST[i].channelId == id) {
                return true;
            }
        }
        return false;
    }
    _hasBeCallingByAccount(account) {
        var _this = this;
        for (var i = 0; i < _this.state.CALL_LIST.length; i++) {
            if (_this.state.CALL_LIST[i].account == account) {
                return true;
            }
        }
        return false;
    }
    _isBeCalling(id) {
        let _this = this;
        for (var i = 0; i < _this.state.CALL_LIST.length; i++) {
            if (_this.state.CALL_LIST[i].channelId == id && _this.CALL_LIST[i].interStatus == '1') {
                return true;
            }
        }
        return false;
    }
    _updateBeCalling(id) {
        let _this = this;
        for (var i = 0; i < _this.state.CALL_LIST.length; i++) {
            if (_this.state.CALL_LIST[i].channelId == id) {
                _this.state.CALL_LIST[i].interStatus = '1';
                _this._viewa(_this.currentInterviewId, true)
                _this.that.remove();
            }
        }
        _this._showQueuingList();
    }
    _removeBeCalling(account) {
        let _this = this;
        let list = [];
        for (var i = 0; i < _this.state.CALL_LIST.length; i++) {
            if (_this.state.CALL_LIST[i].account != account) {
                list.push(_this.state.CALL_LIST[i]);
            }
            if (_this.state.CALL_LIST[i].account == account) {
                _this._clearDurationTimer();
            }
        }
        _this.state.CALL_LIST = list;
        _this._showQueuingList();
    }
    _reject(data) {
        let _this = this;
        if (!_this.state.beCalling) return;
        _this._clearBeCallTimer();
        console.log("拒绝对方音视频通话请求");
        // console.log(_this.beCalledInfo)
        _this.state.NETCALL.response({
            accepted: false,
            beCalledInfo: data ? data : _this.beCalledInfo
        }).then(function () {
            console.log("拒绝对方音视频通话请求成功");
            _this.sendLocalMessage("已拒绝");
            let beCalledInfo = null;
            _this.setState({
                beCalling: false,
                beCalledInfo
            })
            // _this.hideAllNetcallUI();
        }.bind(_this)).catch(function (err) {
            // 自己断网了
            console.log("拒绝对方音视频通话请求失败");
            console.log("error info:", err);
            let beCalledInfo = null;
            _this.setState({
                beCalling:false,
                beCalledInfo
            })
            // _this.hideAllNetcallUI();
        }.bind(_this));

    }
    _onCallAccepted(obj) {
        let _this = this;
        function changeState() {
            this.acceptAndWait = false;
            console.log("音视频通话开始");
            // 显示视频弹框，关闭提示音量
            // _this.listenOnce = false;
            // _this.interviewing = false;
            // $('#audioId') ? $('#audioId')[0].pause() : '';
            // $(".pch-interview-popup").show();
            // $('.pch-interview-popup-shadow').show()
            let type = obj.type;
            _this.setState({
                type
            })
            // this.showConnectedUI(obj.type);
            this.clearCallTimer();
            this._clearRingPlay();
        }
        changeState = changeState.bind(_this);

        // WebRTC模式
        // if (_this.isRtcSupported) {
        let promise;
        if (obj.type === WebRTC.NETCALL_TYPE_VIDEO) {
            promise = _this._setDeviceVideoIn(true);
            // _this.NETCALL.startRecordAac();
            _this.state.NETCALL.startRecordMp4();
        } else {
            promise = _this._setDeviceVideoIn(false);
        }
        promise.then(function () {
            return _this._setDeviceAudioIn(true);
        }.bind(_this)).then(function () {
            _this._startLocalStream();
            _this._updateVideoShowSize(true, false);
            _this.state.NETCALL.setCaptureVolume(255);
        }.bind(_this)).then(function () {
            console.log("开始webrtc连接")
            return _this.state.NETCALL.startRtc();
        }.bind(_this)).then(function () {
            console.log("webrtc连接成功")
            changeState();
            return _this._setDeviceAudioOut(true);
        }.bind(_this)).catch(function (e) {
            console.log("连接出错", e);
            if (/webrtc服务器地址/.test(e)) {
                layer.msg('无法接通!请让呼叫方打开"WebRTC兼容开关"，方可正常通话');
            }
        }.bind(_this));
        // $('#beCallingRejectButton').removeClass('hide');
        // $('.video-none').addClass('hide');
        _this._clearRingPlay();
        // }
        // // 通话时长显示
        _this._startDurationTimer();
        // /** 重置文案聊天高度 */
        // this.resizeChatContent();
        // // 关闭被呼叫倒计时
        let beCallTimer = null;
        _this.setState({
            beCallTimer
        })
        // 自动触发视频请求
        // $(".pch-interview-listen").trigger('click');
        // _beCallingAcceptButton.bind(_this)()
        // $.proxy(_this['_beCallingAcceptButton'], _this);
    }
    /**
     * 通话时长显示
     */
    _startDurationTimer(box) {
        let _this = this;
        _this._clearDurationTimer();
        function timer() {
            let now = (new Date()).getTime();
            let netcallDuration = now - _this.state.netcallStartTime;
            _this.setState({
                netcallDuration
            })
            let timeText = _this._getDurationText(_this.state.netcallDuration);
            // $('.video-time').text(timeText);
        }
        timer = timer.bind(_this);
        _this.setState({
            netcallDuration: 0,
            netcallStartTime: (new Date()).getTime()
        })
        _this.setState({
            netcallDurationTimer:setInterval(timer, 500)
        })
        timer();
    }
    _getDurationText(ms) {
        let allSeconds = parseInt(ms / 1000);
        let result = "";
        let hours, minutes, seconds;
        if (allSeconds >= 3600) {
            hours = parseInt(allSeconds / 3600);
            result += ("00" + hours).slice(-2) + " : ";
        }
        if (allSeconds >= 60) {
            minutes = parseInt(allSeconds % 3600 / 60);
            result += ("00" + minutes).slice(-2) + " : ";
        } else {
            result += "00 : ";
        }
        seconds = parseInt(allSeconds % 3600 % 60);
        result += ("00" + seconds).slice(-2);
        return result;
    }
    _clearDurationTimer() {
        let _this = this;
        if (_this.state.netcallDurationTimer) {
            clearInterval(_this.state.netcallDurationTimer);
            _this.state.netcallDurationTimer = null;
        }
        // $('.video-time').text('');
    }
    _clearBeCallTimer() {
        let _this = this;
        if (_this.state.beCallTimer) {
            clearTimeout(_this.state.beCallTimer);
            let beCallTimer = null;
            _this.setState({
                beCallTimer
            })
        }
    }
    _setDeviceAudioOut(state) {
        let _this = this;
        // $(".icon-volume").toggleClass("icon-disabled", !state);
        _this.setState({
            deviceAudioOutOn: !!state
        })
        if (state) {
            console.log("开启扬声器");
            return _this.state.NETCALL.startDevice({
                type: Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT
            }).then(function () {
                console.log("开启扬声器成功");
            }.bind(_this)).catch(function () {
                console.log("开启扬声器失败");
                console.log("开启扬声器失败");
                _this._onDeviceNoUsable(Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT);
            }.bind(_this));
        } else {
            console.log("关闭扬声器");
            return _this.state.NETCALL.stopDevice(Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT).then(function () {
                console.log("关闭扬声器成功");
            }.bind(_this)).catch(function () {
                console.log("关闭扬声器失败");
            }.bind(_this));
        }
    }
    _startLocalStream(node) {
        let _this = this;
        console.log("开启本地流显示 startLocalStream");
        try {
            _this.state.NETCALL.startLocalStream(node);
        } catch (e) {
            console.log("开启本地流失败");
            console && console.warn && console.warn(e);
        }
    }
    _startRemoteStream() {
        let _this = this;
        console.log("开启远端流显示 startRemoteStream");
        try {
            _this.state.NETCALL.startRemoteStream();
        } catch (e) {
            console.log("开启远端流失败");
            console && console.warn && console.warn(e);
        }
    }
    _setDeviceAudioIn(state) {
        let _this = this;
        // $(".icon-micro").toggleClass("icon-disabled", !state);
        _this.setState({
            deviceAudioInOn:!!state
        })
        if (state) {
            console.log("开启麦克风");
            return _this.state.NETCALL.startDevice({
                // 开启麦克风输入
                type: Netcall.DEVICE_TYPE_AUDIO_IN
            }).then(function () {
                console.log("开启麦克风成功，通知对方我方开启了麦克风");
                // 通知对方自己开启了麦克风
                _this.state.NETCALL.control({
                    command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON
                })
            }.bind(_this)).catch(function () {
                console.log("开启麦克风失败");
                console.log("开启麦克风失败");
                _this._onDeviceNoUsable(Netcall.DEVICE_TYPE_AUDIO_IN);
            }.bind(_this));
        } else {
            console.log("关闭麦克风");
            return _this.state.NETCALL.stopDevice(Netcall.DEVICE_TYPE_AUDIO_IN) // 关闭麦克风输入
                .then(function () {
                    console.log("关闭麦克风成功，通知对方我方关闭了麦克风");
                    // 通知对方自己关闭了麦克风
                    _this.state.NETCALL.control({
                        command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF
                    });
                }.bind(_this)).catch(function () {
                    console.log("关闭麦克风失败");
                }.bind(_this));
        }
    }
    _onDeviceNoUsable(type) {
        let _this = this;
        if (type === Netcall.DEVICE_TYPE_VIDEO) {
            // 通知对方，我方摄像头不可用
            _this.state.NETCALL.control({
                command: Netcall.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID
            });

        } else if (type === Netcall.DEVICE_TYPE_AUDIO_IN) {
            // 通知对方，我方麦克风不可用
            _this.state.NETCALL.control({
                command: Netcall.NETCALL_CONTROL_COMMAND_SELF_AUDIO_INVALID
            });
            // this.$controlItem.filter(".microphone").toggleClass("no-device", true).attr("title", "麦克风不可用");
        } else if (type === Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT) {
            // this.$controlItem.filter(".volume").toggleClass("no-device", true).attr("title", "扬声器不可用");
        }
    }
    _setDeviceVideoIn(state) {
        let _this = this;
        // $(".icon-camera").toggleClass("icon-disabled", !state);
        _this.setState({
            deviceVideoInOn:!!state
        })
        if (state) {
            console.log("开启摄像头");
            return _this.state.NETCALL.startDevice({
                type: Netcall.DEVICE_TYPE_VIDEO
                /* width: this.videoCaptureSize.width,
                 height: this.videoCaptureSize.height */
            }).then(function () {
                _this.setState({
                    videoType: 'video'
                })
                console.log("开启摄像头成功，通知对方己方开启了摄像头");
                // 通知对方自己开启了摄像头
                _this.state.NETCALL.control({
                    command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON
                });
                _this._startLocalStream() && _this._setVideoViewSize()
            }.bind(_this)).catch(function (err) {
                console.error(err)
                _this.setState({
                    videoType: null
                })
                // 通知对方自己的摄像头不可用
                console.log("开启摄像头失败，通知对方己方摄像头不可用", err);
                _this._onDeviceNoUsable(Netcall.DEVICE_TYPE_VIDEO);

                _this.state.NETCALL.control({
                    command: Netcall.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID
                });
            }.bind(_this));

        } else {
            _this.setState({
                videoType: null
            })
            console.log("关闭摄像头");
            return _this.state.NETCALL.stopDevice(Netcall.DEVICE_TYPE_VIDEO).then(function () {
                // 通知对方自己关闭了摄像头
                console.log("关闭摄像头成功，通知对方我方关闭了摄像头");
                _this.state.NETCALL.control({
                    command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF
                });
                $(".netcall-video-local").toggleClass("empty", true);
                $(".netcall-video-local .message").text("您关闭了摄像头");

            }.bind(_this)).catch(function (e) {
                _this.setState({
                    videoType: null
                })
                console.log("关闭摄像头失败");
            }.bind(_this));

        }
    }
    _onControl(obj) {
        console.log("on control:", obj);
        let _this = this;
        let netcall = _this.state.NETCALL;
        // 如果不是当前通话的指令, 直接丢掉
        if (netcall.notCurrentChannelId(obj)) {
            console.log("非当前通话的控制信息");
            return;
        }
        var type = obj.type;
        switch (type) {
            // NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON 通知对方自己打开了音频
            case Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON:
                console.log("对方打开了麦克风");
                break;
            // NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF 通知对方自己关闭了音频
            case Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF:
                layer.msg("对方关闭了麦克风");
                break;
            // NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON 通知对方自己打开了视频
            case Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON:
                console.log("对方打开了摄像头");
                break;
            // NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF 通知对方自己关闭了视频
            case Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF:
                layer.msg("对方关闭了摄像头");
                break;
            // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT 拒绝从音频切换到视频
            case Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT:
                layer.msg("对方拒绝从音频切换到视频通话");
                break;
            // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO 请求从音频切换到视频
            case Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO:
                layer.msg("对方请求从音频切换到视频通话");
                break;
            // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE 同意从音频切换到视频
            case Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE:
                layer.msg("对方同意从音频切换到视频通话");
                break;
            // NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO 从视频切换到音频
            case Netcall.NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO:
                layer.msg("对方请求从视频切换为音频");
                // this.doSwitchToAudio();
                break;
            // NETCALL_CONTROL_COMMAND_BUSY 占线
            case Netcall.NETCALL_CONTROL_COMMAND_BUSY:
                layer.msg("对方正在通话中");
                _this.clearRingPlay();
                break;
            // NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID 自己的摄像头不可用
            case Netcall.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID:
                layer.msg("对方摄像头不可用");
                break;
            case Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_START:
                layer.msg("通知对方自己开始录制视频了");
                break;
            case Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_STOP:
                layer.msg("通知对方自己结束录制视频了");
                break;
        }
    }
    _updateVideoShowSize(local, remote) {
        let _this = this;
        let bigSize = {
            cut: true,
            width: _this.state.isFullScreen ? 140 : 80,
            height: _this.state.isFullScreen ? 140 : 80
        };
        let remoteSize = {
            cut: true,
            width: _this.state.isFullScreen ? 280 : 280,
            height: _this.state.isFullScreen ? 510 : 210
        };
        if (local) {
            _this.state.NETCALL.setVideoViewSize(bigSize);
        }
        if (remote) {
            _this.state.NETCALL.setVideoViewRemoteSize(remoteSize);
        }
    }
    _onConnect(data) {
        console.log('_onConnect', JSON.stringify(data));
    }
    _onWillReconnect() {
        console.log('_onWillReconnect');
    }
    _onDisconnect() {
        console.log('_onDisconnect');
        // layer.alert('视频连接已经断开，请刷新重试!');
    }
    _onError() {
        console.log('_onError');
    }
    _onLoginPortsChange(loginPorts) {
        console.log('当前登录帐号在其它端的状态发生改变了', loginPorts);
    }
    _onBlacklist(blacklist) {
        let _this = this;
        console.log('收到黑名单', blacklist);
    }
    _onMarkInBlacklist(obj) {
        console.log(obj);
        console.log(obj.account + '被你在其它端' + (obj.isAdd ? '加入' : '移除') + '黑名单');
        if (obj.isAdd) {
            addToBlacklist(obj);
        } else {
            removeFromBlacklist(obj);
        }
    }
    _onMutelist(mutelist) {
        var _this = this;
        console.log('收到静音列表', mutelist);
    }
    _onMarkInMutelist(obj) {
        console.log(obj);
        console.log(obj.account + '被你' + (obj.isAdd ? '加入' : '移除') + '静音列表');
        if (obj.isAdd) {
            addToMutelist(obj);
        } else {
            removeFromMutelist(obj);
        }
    }
    _onFriends(friends) {
        let _this = this;
        console.log('收到好友列表', friends);
    }
    _onSyncFriendAction(obj) {
        console.log(obj);
    }
    _onMyInfo(user) {
        let _this = this;
        console.log('收到我的名片', user);
    }
    _onUpdateMyInfo(user) {
        let _this = this;
        console.log('我的名片更新了', user);
    }
    _onUsers(users) {
        let _this = this;
        console.log('收到用户名片列表', users);
    }
    _onUpdateUser(user) {
        let _this = this;
        console.log('用户名片更新了', user);
    }
    _onRobots(robots) {
        console.log('收到机器人列表', robots);
    }
    _onTeams(teams) {
        let _this = this;
        console.log('群列表', teams);
    }
    _onCreateTeam(team) {
        let _this = this;
        console.log('你创建了一个群', team);
    }
    _onTeamMembers(teamId, members) {
        let _this = this;
        console.log('群id', teamId, '群成员', members);
    }
    _onUpdateTeamMember(teamMember) {
        console.log('群成员信息更新了', teamMember);
    }
    _onSessions(sessions) {
        let _this = this;
        console.log('收到会话列表', sessions);
    }
    _onUpdateSession(session) {
        let _this = this;
        console.log('会话更新了', session);
    }
    _onRoamingMsgs(obj) {
        console.log('漫游消息', obj);
        // pushMsg(obj.msgs);
    }
    _onOfflineMsgs(obj) {
        console.log('离线消息', obj);
        // pushMsg(obj.msgs);
    }
    _onMsg(msg) {
        console.log('收到消息', msg.scene, msg.type, msg);
        // pushMsg(msg);
    }
    _onBroadcastMsg(msg) {
        console.log('收到广播消息', msg);
    }
    _onBroadcastMsgs(msgs) {
        console.log('收到广播消息列表', msgs);
    }
    _onOfflineSysMsgs(sysMsgs) {
        console.log('收到离线系统通知', sysMsgs);
    }
    _onSysMsg(sysMsg) {
        console.log('收到系统通知', sysMsg)
    }
    _onUpdateSysMsg(sysMsg) {
        // pushSysMsgs(sysMsg);
    }
    _onSysMsgUnread(obj) {
        console.log('收到系统通知未读数', obj);
    }
    _onUpdateSysMsgUnread(obj) {
        console.log('系统通知未读数更新了', obj);
    }
    _onOfflineCustomSysMsgs(sysMsgs) {
        console.log('收到离线自定义系统通知', sysMsgs);
    }
    _onCustomSysMsg(sysMsg) {
        console.log('收到自定义系统通知', sysMsg);
    }
    _onSyncDone() {
        console.log('同步完成');
    }
    _showNetcallVideoLink() {
        let _this = this;
        _this.state.NETCALL.call({
            type: 2,
            account: 'manager',
            pushConfig: {
                enable: true,
                needBadge: true,
                needPushNick: true,
                pushContent: '',
                custom: '',
                pushPayload: '',
                sound: '',
            },
            webrtcEnable: false,
            sessionConfig: _this.state.sessionConfig
        }).then(function (obj) {
            console.log("发起通话成功，等待对方接听");
            if (_this.state.afterPlayRingA) {
                let afterPlayRingA = function () {
                    // _this.playRing("E", 45);
                }.bind(_this);
                _this.setState({
                    afterPlayRingA
                })
            } else {
                // _this.playRing("E", 45);
            }

        }.bind(_this)).catch(function (err) {
            console.log("发起音视频通话请求失败：", err);
            // layer.msg('发起音视频通话请求失败：' + err.message || err.error);
            if (err && err.code === 11001) {
                console.log("发起音视频通话请求失败，对方不在线");
                if (_this.state.afterPlayRingA) {
                    let afterPlayRingA = function () {
                        console.log("对方不在线");
                    }.bind(_this);
                    _this.setState({
                        afterPlayRingA
                    })
                } else {
                    console.log("对方不在线");
                }
            } else {
                _this._cancelCalling();
            }

        }.bind(_this));
    }
    _beCallingAcceptButton(e) {
        console.log('接听 ')
        let _this = this,
            errMsg = '', i;
        // if (_this.CALL_LIST.length <= 0) {
        //     errMsg = '暂无面签请求';
        // } else {
        //     var arra = _this.CALL_LIST;
        //     for (i = 0; i < _this.CALL_LIST.length; i++) {
        //         if (_this.CALL_LIST[i].interStatus == '1') {
        //             errMsg = '正在面签中';
        //         }
        //     }
        // }
        // if (errMsg) {
        //     layer.msg(errMsg);
        //     return;
        // }
        // $('.interview-wrap .video-tools').addClass('hide');
        // $('.video-none').removeClass('hide');
        // $(_this).addClass('hide');
        // $("#beCallingRejectButton").removeClass('hide');
        _this._callAcceptedResponse();
    }
    _callAcceptedResponse() {
        // $('.interview-wrap .video-tools').addClass('hide');
        // $('.video-none').removeClass('hide');
        let _this = this;
        _this._clearBeCallTimer();
        console.log("同意对方音视频请求");
        let beCalledInfo = _this.state.CALL_LIST[0];
        _this.setState({
                beCalling:false,
                beCalledInfo
            })
        _this._updateBeCalling(_this.state.beCalledInfo.channelId);
        _this.state.NETCALL.response({
            accepted: true,
            beCalledInfo: _this.state.beCalledInfo,
            sessionConfig: _this.state.sessionConfig
        }).then(function (obj) {
            console.log("同意对方音视频请求成功");
            // 加个定时器 处理点击接听了 实际上对面杀进程了，没有callAccepted回调
            _this.acceptAndWait = true;
            setTimeout(function () {
                if (_this.acceptAndWait) {
                    console.log("通话建立过程超时");
                    // _this.hideAllNetcallUI();
                    _this._hangup();
                    _this.acceptAndWait = false;
                }
            }.bind(_this), 45 * 1000);
            // _this._resServer();

        }.bind(_this)).catch(function (err) {
            console.log("同意对方音视频通话失败，转为拒绝");
            console.log("error info:", err);
            // _this.$beCallingAcceptButton.toggleClass("loading", false);
            _this._reject();
        }.bind(_this));

    }
    _resServer() {
        $.ajax({
            url: apiserver + '/video/answer',
            method: 'get'
        });
    }
    _hangup() {
        let _this = this;
        _this.state.NETCALL.hangup();
        _this.setState({
            beCalling: false,
            beCalledInfo: null
        })
        _this._setDeviceAudioIn(false);
        _this._setDeviceAudioOut(false);
        _this._setDeviceVideoIn(false);
        // _this.hideAllNetcallUI();
        _this._stopRemoteStream();
        _this._stopLocalStream();

        /** 重置文案聊天高度 */
        // _this.resizeChatContent();
        /**状态重置 */
        _this._resetWhenHangup();
    }
    _stopLocalStream() {
        let _this = this;
        console.log("停止本地流显示 stopLocalStream");
        try {
            _this.state.NETCALL.stopLocalStream();
        } catch (e) {
            console.log("停止本地流失败");
            console && console.warn && console.warn(e);
        }
    }
    _stopRemoteStream() {
        let _this = this;
        console.log("停止远端流显示 stopRemoteStream");
        try {
            _this.state.NETCALL.stopRemoteStream();
        } catch (e) {
            console.log("停止远端流失败");
            console && console.warn && console.warn(e);
        }
    }
    _beCallingRejectButton() {
        let _this = this;
        $('.pch-interview-popup').add($('.pch-interview-popup-shadow')).hide();
        $(".pch-interview-status2,.pch-interview-status3").hide();
        $("#view-file").hide();
        $(".pch-interview-status1").show();
        _this._cancelCalling(true);
    }
    _cancelCalling(data) {
        let _this = this;
        console.log('取消视频请求');
        // 关闭面签弹框和开始提示音量
        // if (_this.listNum) {
        //     $('#audioId') ? $('#audioId')[0].play() : '';
        // }
        // _this.interviewing = true;
        // $(".pch-interview-popup").hide();
        // $('.pch-interview-popup-shadow').hide();
        if (_this.state.beCalledInfo.account) {
            _this._removeBeCalling(_this.state.beCalledInfo.account);
        }
        if (_this.state.CALL_LIST.length > 0) {
            let beCalledInfo = _this.state.CALL_LIST[0];
            _this.setState({
                beCalledInfo
            })
            // $('#beCallingRejectButton').addClass('hide');
            // $('.video-none').removeClass('hide');
        } else {
            // $('.interview-wrap .video-tools, #beCallingRejectButton').addClass('hide');
            // $('.video-none').removeClass('hide');
        }
        // if (!_this.isBusy) {
        // console.log("取消呼叫");
        // _this.NETCALL.stopRecordAac();
        _this.state.NETCALL.stopRecordMp4();
        _this.state.NETCALL.hangup();
        // }
        // this.clearCallTimer();
        _this._clearRingPlay();
        // if (isClick === true && !this.isBusy) this.sendLocalMessage("未接通");
        // this.hideAllNetcallUI();
        _this._resetWhenHangup();
    }
    playRing(name, count, done) {
        let _this = this;
        done = done || function () { };
        _this.playRingInstance = _this.playRingInstance || {};
        let nameMap = {
            A: "avchat_connecting",
            B: "avchat_no_response",
            C: "avchat_peer_busy",
            D: "avchat_peer_reject",
            E: "avchat_ring"
        };
        let url = "http://lx-static.ufile.ucloud.com.cn/admin/img/audio/" + nameMap[name] + ".mp3";
        function doPlay(url, playDone) {
            let audio = document.createElement("audio");
            audio.autoplay = true;
            function onEnded() {
                _this.playRingInstance.cancel = null;
                audio = null;
                playDone();
            }
            onEnded = onEnded.bind(_this);
            audio.addEventListener("ended", onEnded);
            audio.src = url;
            _this.playRingInstance.cancel = function () {
                audio.removeEventListener("ended", onEnded);
                audio.pause();
                audio = null;
            }
        }
        doPlay = doPlay.bind(_this);
        let wrap = function () {
            _this.playRingInstance = null
            done();
        }.bind(_this);
        for (let i = 0; i < count; i++) {
            wrap = (function (wrap) {
                return function () {
                    doPlay(url, wrap);
                };
            })(wrap);
        }
        wrap();
    }
    _clearRingPlay() {
        let _this = this;
        if (_this.playRingInstance) {
            _this.playRingInstance.cancel && _this.playRingInstance.cancel();
            _this.playRingInstance = null;
        }
    }
    _toggleScreenHandler(e) {
        let _this = this;
        // _this.isFullScreen = !$(e.target).closest('.video-box').hasClass('video-box-fullscreen');
        // !_this.isFullScreen ?
        //     $('.video-box').removeClass('video-box-fullscreen') :
        //     $('.video-box').addClass('video-box-fullscreen');
        if (_this.state.isFullScreen) {
            // $('.interview-wrap').append('<div class="video-fullscreen-shade"></div>');
            // $('.video-screen-toggle').html('&#xe637;');
            // $('.video-box').addClass('video-box-fullscreen');
            // _this._updateVideoShowSize(true, true);

        } else {
            // $('.video-fullscreen-shade').remove();
            // $('.video-box').removeClass('video-box-fullscreen');
            // $('.video-screen-toggle').html('&#xe636;');
            _this._updateVideoShowSize(true, true);

        }
    }
    render() {
        return[
            <div className='pch-interview-box' key='1'>
                <div className='pch-interview-left'>
                    面签详情
                </div>
                <div className='pch-interview-right'>
                    <div id='interview-box'>
                    </div>
                    <div id='interview-remove'></div>
                    <div id='interview-cancal'>
                        取消
                    </div>
                </div>
            </div>,
            <div className='pch-interview-shadow' key='2'>
            </div>
        ]
    }
}