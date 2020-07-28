"use strict";

var { BrowserWindow } = require('electron').remote;
const os = require('os');
var plat = os.platform();

//实时音视频sdk
const ym = require('../youmevideo.min.js')
//录屏推流sdk
const screen_record = require('./plugins/screenrecord');
var youme = ym.getInstance();

//设置一直显示在固定位置
var teacherid = "user" + Math.ceil(100000 * Math.random()).toString();
var teacherCanvasId = "myCanvas" + teacherid;

var channelid = "room001";
var appkey = "YOUME5BE427937AF216E88E0F84C0EF148BD29B691556";
var appSecret = "y1sepDnrmgatu/G8rx1nIKglCclvuA5tAvC0vXwlfZKOvPZfaUYOTkfAdUUtbziW8Z4HrsgpJtmV/RqhacllbXD3abvuXIBlrknqP+Bith9OHazsC1X96b3Inii6J7Und0/KaGf3xEzWx/t1E1SbdrbmBJ01D1mwn50O/9V0820BAAE=";
var serverRegion = 0;
var regionName = "cn";

window.onload = function () {
  document.getElementById("inputUserid").value = teacherid;
  document.getElementById("inputRoomid").value = channelid;
};

var canvasStatusMap = {};
var canvasUserIdMap = {};

//本地采集分辨率
var localWidth = 320;
var localHeight = 240;

//网络传输分辨率
var netWidth = 320;
var netHeight = 240;

//视频合流分辨率
var mixWidth = 320;
var mixHeight = 240;

var isWaiting = false;


// 当前是否正在录屏(实时录屏)
var isShareScreen = false;

function youme_Init() {
  if (isWaiting) {
    return;
  }
  isWaiting = true;
  youme.init(appkey, appSecret, serverRegion, regionName,
    function (err, obj) {
      if (err === 0) {
        youme.setExternalInputMode(false);
        youme.setAVStatisticInterval(5000);
        youme.videoEngineModelEnabled(false);

        // 初始化屏幕共享
        youme.setVideoFpsForShare(15);
        youme.setVideoNetResolutionForShare(1280,720);
        setLog("初始化成功");
      }
      else {
        setLog("初始化失败，错误码为" + err);
      }
    });

  isWaiting = false;
}

function youme_JoinRoom() {
  if (isWaiting) {
    return;
  }
  isWaiting = true;

  var roomid = document.getElementById("inputRoomid").value;
  var userid = document.getElementById("inputUserid").value;
  if (roomid === "") {
    roomid = channelid;
    document.getElementById("inputRoomid").value = roomid;
  }
  if (userid === "") {
    userid = teacherid;
    document.getElementById("inputUserid").value = userid;
  }
  channelid = roomid;
  teacherid = userid;

  setResolution();
  
  youme.joinChannelSingleMode(userid, roomid, 5, true, function (err, obj) {
    if (err === 0) {
      setCameraSelect();
      youme.setVideoCallback("");
      youme.setAutoSendStatus(true);
      youme.setVolume(100);
      document.getElementById("rangeVolume").value = 100;
      document.getElementById("volumeValue").innerText = 100;

      setLog("收到回调：进入语音频道成功！频道id：" + roomid);

      setLog("加入房间成功");
    }
    else {
      setLog("开始加入房间失败，错误码为" + err);
    }

  });

  isWaiting = false;
}

function youme_LeaveRoom() {
  if (isWaiting) {
    return;
  }

  isWaiting = true;
  youme.stopCapture();
  youme.leaveChannelAll(function (err, obj) {
    if (err === 0) {
      setLog("离开房间成功");
    }
    else {
      setLog("离开房间失败，错误码为" + err);
    }
  });
  removeCanvasAll();
  isWaiting = false;
}

function youme_OpenMic() {
  if (isWaiting) {
    return;
  }

  isWaiting = true;

  youme.setMicrophoneMute(false, function (err, obj) {
    if (err === 0) {
      setLog("麦克风已开启");
    }
    else {
      setLog("开启麦克风失败，错误码为" + err);
    }
  });

  isWaiting = false;
}

function youme_CloseMic() {
  if (isWaiting) {
    return;
  }

  isWaiting = true;

  youme.setMicrophoneMute(true, function (err, obj) {
    if (err === 0) {
      setLog("麦克风已关闭");
    }
    else {
      setLog("关闭麦克风失败，错误码为" + err);
    }
  });

  isWaiting = false;
}

function youme_CloseSpeaker() {
  if (isWaiting) {
    return;
  }

  isWaiting = true;

  youme.setSpeakerMute(true, function (err, obj) {
    if (err === 0) {
      setLog("扬声器已关闭");
    }
    else {
      setLog("关闭扬声器失败，错误码为" + err);
    }
  });

  isWaiting = false;
}

function youme_OpenSpeaker() {
  if (isWaiting) {
    return;
  }

  isWaiting = true;

  youme.setSpeakerMute(false, function (err, obj) {
    if (err === 0) {
      setLog("扬声器已开启");
    }
    else {
      setLog("开启扬声器失败，错误码为" + err);
    }
  });

  isWaiting = false;
}



function youme_OpenCamera() {
  if (isWaiting) {
    return;
  }

  isWaiting = true;

  var cameraList = document.getElementById("cameraList");
  if (cameraList !== undefined) {
    if (cameraList.options.length > 0) {
      var index = cameraList.selectedIndex;
      var cameraid = cameraList[index].value;
      youme.setOpenCameraId(cameraid);
    }
  }

  youme.startCapture(function (err, obj) {
    if (err === 0) {
      setLog("摄像头已开启");
      console.log(obj);
      setCanvas(obj.param, true);
    }
    else {
      setLog("开启摄像头失败，错误码为" + err);
    }
  });

  isWaiting = false;
}

function youme_CloseCamera() {
  if (isWaiting) {
    return;
  }

  isWaiting = true;

  youme.stopCapture(function (err, obj) {
    if (err === 0) {
      setLog("摄像头已关闭");
      console.log(obj);
      changeCanvasStatus(obj.param, false);
    }
    else {
      setLog("关闭摄像头失败，错误码为" + err);
    }
  });

  isWaiting = false;
}

// 开始实时屏幕共享（录屏）
function youme_startScreenShare() {
  var btnDom = document.getElementById('shareScreenBtn');
  var code = 0;
  if (isShareScreen) {
    isShareScreen = false;
    youme.stopShareStream();
  } else {
    isShareScreen = true;
    if (plat !== "darwin"){
      //windows 平台
      code = youme.startShareStream(3, 0, 0);
    }else{
      //macos 平台
      code = youme.startShareStream(3, 0);
    }
  }

  if (code === 0) {
    btnDom.innerHTML = isShareScreen ? '停止屏幕共享' : '开始屏幕共享';
  } else {
    btnDom.innerHTML = isShareScreen ? '开始屏幕共享' : '停止屏幕共享';
    isShareScreen = !isShareScreen;
  }
}

function youme_startWindowShare(){
  
    var btnDom = document.getElementById('shareWinBtn');
    var code = 0;
    if (isShareScreen) {
      isShareScreen = false;
      youme.stopShareStream();
    } else {
      //获取当前所有窗口句柄
      const list = youme.getWinList();
      console.log("winList:")
      console.log(list)
      let listJson = JSON.parse(list)
      isShareScreen = true;
      if (plat !== "darwin"){
        //windows 平台
        listJson['winlist'].forEach(item => {
          if(item['name'].indexOf(document.title) > -1){
            console.log('selected: '+item['name'] +' hwnd:'+item['hwnd'])
            code = youme.startShareStream(2, 0, item['hwnd']);
          }
        });
      }else{
        //macos 平台
        listJson['winlist'].forEach(item => {
          if(item['window'].indexOf(document.title) > -1){
            console.log('selected: '+item['window'] +' id:'+item['id'])
            code = youme.startShareStream(2, item['id'], 0);
          }
        });
      }
    }
  
    if (code === 0) {
      btnDom.innerHTML = isShareScreen ? '停止窗口共享' : '开始窗口共享';
    } else {
      btnDom.innerHTML = isShareScreen ? '开始窗口共享' : '停止窗口共享';
      isShareScreen = !isShareScreen;
    }
}

function setVolume() {
  var value = document.getElementById("rangeVolume").value;
  document.getElementById("volumeValue").innerText = value;
  youme.setVolume(value);
}

function setResolution() {
  var lwidth = document.getElementById("inputLocalWidth").value;
  if (lwidth !== "" && lwidth !== 0) {
    localWidth = lwidth;
  }
  var lheight = document.getElementById("inputLocalHeight").value;
  if (lheight !== "" && lheight !== 0) {
    localHeight = lheight;
  }
  var nwidth = document.getElementById("inputNetWidth").value;
  if (nwidth !== "" && nwidth !== 0) {
    netWidth = nwidth;
  }
  var nheight = document.getElementById("inputNetHeight").value;
  if (nheight !== "" && nheight !== 0) {
    netHeight = nheight;
  }
  var mwidth = document.getElementById("inputMixWidth").value;
  if (mwidth !== "" && mwidth !== 0) {
    mixWidth = mwidth;
  }
  var mheight = document.getElementById("inputMixHeight").value;
  if (mheight !== "" && mheight !== 0) {
    mixHeight = mheight;
  }

  //youme.setMixVideoSize(mixWidth, mixHeight);
  youme.setVideoLocalResolution(localWidth, localHeight)
  youme.setVideoNetResolution(netWidth, netHeight)
  youme.setVideoNetResolutionForSecond(240,160)
  youme.setVBRForShare(true)

}


function setLog(log) {
  var str = log + "\n";
  document.getElementById('logDiv').textContent += str;
}

function setCameraSelect() {
  var cameraSel = document.getElementById("cameraList");
  if (cameraSel === undefined) {
    return;
  }
  var count = youme.getCameraCount();

  for (var i = 0; i < count; ++i) {
    var name = youme.getCameraName(i);
    cameraSel[i] = new Option(i, i);
    cameraSel[i].text = name;
  }
}

// 启动、关闭屏幕录制 ,
function startPushRTMP (e) {
  if (screen_record.is_runing()) {
    e.innerHTML = '启动录屏上传';
    screen_record.stop();
  } else {
    e.innerHTML = '推流中,点击停止';
    let destination = 'rtmp://pili-publish.youme.im/youmetest/0418';
    setLog('推流到：' + destination);
    screen_record.start(destination, function () {
      e.innerHTML = '启动录屏上传';
      setLog('录屏推理停止。');
    }, true);
  }

};

// 断网了，正在重连
youme.on('YOUME_EVENT_RECONNECTING', function (message) {
  setLog('断网了，正在重连');
});

// 收到其它用户的视频流
youme.on('YOUME_EVENT_OTHERS_VIDEO_ON', function (message) {
  setCanvas(message.param, true);
  setLog('收到其它用户的视频流' + message.param);
});

// 其它用户的视频流断开（包含网络中断的情况）
youme.on('YOUME_EVENT_OTHERS_VIDEO_SHUT_DOWN', function (message) {
  removeCanvas(message.param);
  setLog('其它用户的视频流断开（包含网络中断的情况）' + message.param);
});

// 其他用户视频输入开始（内部采集下开启摄像头
youme.on('YOUME_EVENT_OTHERS_VIDEO_INPUT_START', function (message) {
  setLog('其他用户视频输入开始（内部采集下开启摄像头' + message.param);
});


// 其他用户视频输入停止（内部采集下停止摄像头
youme.on('YOUME_EVENT_OTHERS_VIDEO_INPUT_STOP', function (message) {
  setLog('其他用户视频输入停止（内部采集下停止摄像头' + message.param);
});


// 音视频数据通路连通，定时检测，一开始收到数据会收到PASS事件，之后变化的时候会发送
youme.on('YOUME_EVENT_MEDIA_DATA_ROAD_PASS', function (message) {
  setLog('音视频数据通路连通');
});


// 音视频数据通路不通
youme.on('YOUME_EVENT_MEDIA_DATA_ROAD_BLOCK', function (message) {
  setLog('音视频数据通路不通');
});

// 本地录屏视频流开始
youme.on('YOUME_EVENT_LOCAL_SHARE_INPUT_START', function (message) {
  console.log('YOUME_EVENT_LOCAL_SHARE_INPUT_START', message);
  setLog(`本地录屏开始${message.param}`);
});

// 本地录屏视频流停止
youme.on('YOUME_EVENT_LOCAL_SHARE_INPUT_STOP', function (message) {
  setLog(`本地录屏停止${message.param}`);
  console.log('YOUME_EVENT_LOCAL_SHARE_INPUT_STOP', message);
});

// 远端录屏流开始
youme.on('YOUME_EVENT_OTHERS_SHARE_INPUT_START', function (message) {
  setLog(`远端录屏开始${message.param}`);
  console.log('YOUME_EVENT_OTHERS_SHARE_INPUT_START', message);
  setCanvas(message.param, true);
});

// 远端录屏流停止
youme.on('YOUME_EVENT_OTHERS_SHARE_INPUT_STOP', function (message) {
  setLog(`远端录屏停止${message.param}`);
  console.log('YOUME_EVENT_OTHERS_SHARE_INPUT_STOP', message);
  removeCanvas(message.param);
});

// 音视频数据通路不通
youme.on('onMemberChange', function (message) {
  var memchange = message.memchange;

  var str = "memChange: ";
  for (var i in memchange) {
    var userid = memchange[i].userid;
    var isJoin = memchange[i].isJoin;
    str = str + "userid:" + userid + "isjoin:" + isJoin + "; "
  }
  setLog(str);
});

function changeCanvasStatus(userid, isCameraOpen) {
  var canvasid = "myCanvas" + userid;
  if (canvasStatusMap[canvasid] !== undefined) {
    canvasStatusMap[canvasid] = isCameraOpen;
  }
}

function setCanvas(userid, isCameraOpen) {
  var canvasid = "myCanvas" + userid;
  if (canvasStatusMap[canvasid] !== undefined) {
    canvasStatusMap[canvasid] = isCameraOpen;
  }
  else {
    var newCanvas = document.createElement('canvas');
    newCanvas.id = canvasid;
    var content;
    if (userid === teacherid) {
      content = document.getElementById("content0");
      newCanvas.style.width = "100%"
      newCanvas.style.height = "100%"
      newCanvas.style.objectFit = "contain"
    }
    else {
      content = document.getElementById("content1");
      newCanvas.style.maxWidth = "320px"
    }
    content.appendChild(newCanvas);
    canvasStatusMap[canvasid] = isCameraOpen;
    canvasUserIdMap[canvasid] = userid;

    var canvas = document.getElementById(canvasid);
    canvas.width = 480;
    canvas.height = 360;
  }
  youme.bindUserToCanvas(userid, canvasid);
  // 切换到接收小流
  // youme.setUsersVideoInfo( JSON.stringify([{userId:userid,resolutionType:1}]))
}

function removeCanvas(userid) {
  if (userid === teacherid) {
    return;
  }
  var canvasid = "myCanvas" + userid;
  if (canvasStatusMap[canvasid] !== undefined) {
    var canvas = document.getElementById(canvasid);
    if (canvas !== undefined && canvas !== null) {
      var content = document.getElementById("content1");
      content.removeChild(canvas);
    }
    delete canvasStatusMap[canvasid];
    delete canvasUserIdMap[canvasid];
    youme.removeCanvasBind(canvasid)
  }
}

function removeCanvasAll() {
  var content0 = document.getElementById("content0");
  var tcanvas = document.getElementById(teacherCanvasId);
  if (tcanvas !== undefined && tcanvas !== null) {
    content0.removeChild(tcanvas);
    delete canvasStatusMap[teacherCanvasId];
  }
  var content = document.getElementById("content1");
  for (var canvasid in canvasStatusMap) {
    var canvas = document.getElementById(canvasid);
    if (canvas !== undefined && canvas !== null) {
      youme.removeCanvasBind(canvasid)
      content.removeChild(canvas);
    }
  }

  canvasStatusMap = {};
  canvasUserIdMap = {};

}

