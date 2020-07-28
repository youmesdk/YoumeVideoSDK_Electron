/**
 *
 * @export
 * @class YouMeVideo
 */
export default class YouMeVideo {
    private static _instance;
    constructor();
    /**
     * 获取实例
     *
     * @static
     * @returns {YouMeVideo}
     */
    static getInstance(): YouMeVideo;
    /**
     * 注册后，c++直接回调视频数据给js
     */
    registerVideoCallback(useFFICallback: boolean): void;
    /**
     * 反注册后，c++不直接回调视频数据给js，内部使用setInterval方式从c++层获取视频数据
     */
    unRegisterVideoCallback(): void;
    /**
     * 设置日志等级(JS层日志)
     *
     * @static
     * @param {number} level
     */
    static setJSLogLevel(level: number): void;
    /**
     * 获取日志等级(JS层日志)
     *
     * @static
     * @returns {number}
     */
    static getJSLogLevel(): number;
    /**
     * 初始化
     *
     * @param {string} strAppKey
     * @param {string} strAPPSecret
     * @param {number} serverRegionId
     * @param {string} pExtServerRegionName
     * @returns {void}
     */
    init(strAppKey: string, strAPPSecret: string, serverRegionId: number, pExtServerRegionName: string, callback: Function): number;
    /**
     * 功能描述:反初始化引擎，在应用退出之前需要调用这个接口释放资源。
     *         这是一个同步调用接口，函数返回时表明操作已经完成。
     *
     * @returns  {number}
     *         其他返回值表明发生了错误，详见YouMeConstDefine.h定义
     */
    uninit(): number;
    /**
     *  功能描述：加入语音频道
     *
     *  @param {string} strUserID: 用户ID，要保证全局唯一
     *  @param {string} strChannelID: 频道ID，要保证全局唯一
     *  @param {number} eUserRole: 用户角色，用于决定讲话/播放背景音乐等权限
     *
     *  @return 错误码，详见YouMeConstDefine.h定义
     */
    joinChannelSingleMode(strUserID: string, strChannelID: string, eUserRole: number, autoRecv: boolean, callback: Function): number;
    removeCanvasBind(canvasid: string): any;
    /**
     *  功能描述:退出所有语音频道
     *
     *  @return 错误码，详见YouMeConstDefine.h定义
     */
    leaveChannelAll(callback: Function): number;
    /**
     *  功能描述:麦克风 静音 打开/关闭
     *
     *  @param bOn:true——关闭麦克风，false——开启麦克风
     *  @return 无
     */
    setMicrophoneMute(bOn: boolean, callback: Function): void;
    /**
     *  功能描述:获取麦克风 静音 状态
     *
     *  @return true——关闭，false——打开
     */
    getMicrophoneMute(): boolean;
    /**
     *  功能描述:获取扬声器 静音 状态
     *
     *  @return true——关闭扬声器，false——开启扬声器
     */
    getSpeakerMute(): boolean;
    /**
     *  功能描述:扬声器 静音 打开/关闭
     *
     *  @param bOn:true——关闭扬声器，false——开启扬声器
     *  @return 无
     */
    setSpeakerMute(bOn: boolean, callback: Function): void;
    stopCapture(callback: Function): number;
    startCapture(callback: Function): number;
    /**
     * 功能描述:   设置是否由外部输入音视频
     * @param {boolean} bInputModeEnabled: true:外部输入模式，false:SDK内部采集模式 默认为false
     */
    setExternalInputMode(bInputModeEnabled: boolean): void;
    /**
     *  功能描述: 设置音视频统计数据时间间隔
     *  @param {number} interval:时间间隔 最低为500ms
     */
    setAVStatisticInterval(interval: number): void;
    /**
     *  功能描述: 设置本地视频渲染回调的分辨率,高分辨率
     *  @param {number} width:宽
     *  @param {number} height:高
     *  @return {number}YOUME_SUCCESS - 成功
     *          其他 - 具体错误码
     */
    setVideoLocalResolution(width: number, height: number): number;
    /**
     *  功能描述: 设置视频网络传输过程的分辨率,高分辨率
     *  @param {number} width:宽
     *  @param {number} height:高
     *  @return {number}YOUME_SUCCESS - 成功
     *          其他 - 具体错误码
     */
    setVideoNetResolution(width: number, height: number): number;
    setMixVideoSize(width: number, height: number): void;
    videoEngineModelEnabled(enabeld: boolean): void;
    getCameraCount(): number;
    getCameraName(cameraid: number): string;
    setOpenCameraId(cameraid: number): number;
    setVideoCallback(): number;
    /**
     *  功能描述:设置是否通知其他人自己的开关麦克风和扬声器的状态
     *
     *  @param bAutoSend:true——通知，false——不通知
     *  @return 无
     */
    setAutoSendStatus(bAutoSend: boolean): void;
    /**
     *  功能描述:设置音量，取值范围是[0-100] 100表示最大音量， 默认音量是100
     *  @param uiVolume: 音量
     *  @return 无
     */
    setVolume(uiVolume: number): void;
    /**
     *  功能描述:获取音量大小,此音量值为程序内部的音量，与系统音量相乘得到程序使用的实际音量
     *
     *  @return 音量值[0,100]
     */
    getVolume(): number;
    getVideoFrame(userId: string, len: number, width: number, height: number): string;
    getVideoFrameNew(userId: string, len: number, width: number, height: number, fmt: number): number;
    pauseChannel(callback: Function): number;
    resumeChannel(callback: Function): number;
    maskVideoByUserId(userid: string, mask: boolean, callback: Function): number;
    getSDKVersion(): number;
    /**
     *  功能描述:设置身份验证的token
     *  @param {string} strToken: 身份验证用token，设置为NULL或者空字符串，清空token值。
     *  @return 无
     */
    setToken(strToken: string): void;
    /**
     *  功能描述: 设置Audio的传输质量
     *  @param quality: 0: low 1: high
     *
     *  @return None
     */
    setAudioQuality(quality: number): void;
    setOtherMicMute(userid: string, mute: boolean): number;
    setOtherSpeakerMute(userid: string, mute: boolean): number;
    setListenOtherVoice(userid: string, ison: boolean): number;
    /**
     *  功能描述: 设置日志等级
     *  @param consoleLevel: 控制台日志等级
     *  @param fileLevel: 文件日志等级
     */
    setLogLevel(consoleLevel: number, fileLevel: number): number;
    setServerRegion(serverRegionId: number, strExtRegionName: string): void;
    setTestConfig(bTest: number): void;
    setServerIpPort(ip: string, port: number): void;
    /**
     *  功能描述:切换语音输出设备
     *  默认输出到扬声器，在加入房间成功后设置，如无听筒输出的需求尽量不要调用该接口。
     *
     *  @param bOutputToSpeaker:true——使用扬声器，false——使用听筒
     *  @return 错误码，详见YouMeConstDefine.h定义
     */
    setOutputToSpeaker(bOutputToSpeaker: boolean): number;
    /**
     *  功能描述: 设置是否开启会议纪要
     *
     *  @param enable: true,开启，false，不开启，默认不开启
     *  @return 错误码，详见YouMeConstDefine.h定义
     */
    setTranscriberEnabled(enable: boolean): number;
    /**
     *  功能描述:启用/禁用移动网络
     *
     *  @param bEnabled:true-可以启用，false-禁用，默认禁用
     *
     *  @return 无
     */
    setUseMobileNetworkEnabled(bEnabled: boolean): void;
    /**
     *  功能描述:是否可使用移动网络
     *
     *  @return true-可以使用，false-禁用
     */
    getUseMobileNetworkEnabled(): number;
    /**
     *  功能描述: 设置用户自定义Log路径
     *  @param strFilePath Log文件的路径
     *  @return YOUME_SUCCESS - 成功
     *          其他 - 具体错误码
     */
    setUserLogPath(strFilePath: string): number;
    playBackgroundMusic(strFilePath: string, bRepeat: boolean): number;
    pauseBackgroundMusic(): number;
    resumeBackgroundMusic(): number;
    stopBackgroundMusic(): number;
    setBackgroundMusicVolume(vol: number): number;
    setHeadsetMonitorOn(micEnabled: boolean, bgmEnabled: boolean): number;
    setReverbEnabled(bEnabled: boolean): number;
    setVadCallbackEnabled(enabled: boolean): number;
    setMicLevelCallback(maxLevel: number): number;
    setFarendVoiceLevelCallback(maxLevel: number): number;
    setReleaseMicWhenMute(enabled: boolean): number;
    setRecordingTimeMs(timeMs: number): void;
    setPlayingTimeMs(timeMs: number): void;
    setServerMode(mode: number): void;
    requestRestApi(strCommand: string, strQueryBody: string, callback: Function): number;
    getChannelUserList(strChannelID: string, maxCount: number, notifyMemChange: boolean): number;
    setUserRole(userRole: number): number;
    getUserRole(): number;
    isBackgroundMusicPlaying(): boolean;
    isInited(): boolean;
    isInChannel(pChannelID: string): boolean;
    /**
     * 功能描述:   向房间广播消息
     * @param pChannelID: 广播房间
     * @param pContent: 广播内容-文本串
     * @param requestID:返回消息标识，回调的时候会回传该值
     * @return   YOUME_SUCCESS - 成功
     *          其他 - 具体错误码
     */
    sendMessage(pChannelID: string, pContent: string, callback: Function): number;
    /**
     *  功能描述: 把某人踢出房间
     *  @param  pUserID: 被踢的用户ID
     *  @param  pChannelID: 从哪个房间踢出
     *  @param  lastTime: 踢出后，多长时间内不允许再次进入
     *  @return YOUME_SUCCESS - 成功
     *          其他 - 具体错误码
     */
    kickOtherFromChannel(pUserID: string, pChannelID: string, lastTime: number): number;
    openVideoEncoder(pFilePath: string): number;
    /**
    *  功能描述: (七牛接口)将提供的音频数据混合到麦克风或者扬声器的音轨里面。
    *  @param data 指向PCM数据的缓冲区
    *  @param len  音频数据的大小
    *  @param timestamp 时间戳
    *  @return YOUME_SUCCESS - 成功
    *          其他 - 具体错误码
    */
    inputAudioFrame(data: string, len: number, timestamp: number): number;
    /**
    *  功能描述: (七牛接口)将提供的视频数据到producer。
    *  @param data 指向视频数据的缓冲区
    *  @param len  视频数据的大小
    * @param width  视频宽
    * @param height  视频高
    * @param fmt  视频格式
    * @param rotation  视频角度
    * @param mirror  镜像
    *  @param timestamp 时间戳
    *  @return YOUME_SUCCESS - 成功
    *          其他 - 具体错误码
    */
    inputVideoFrame(data: string, len: number, width: number, height: number, fmt: number, rotation: number, mirror: number, timestamp: number): number;
    /**
     * 功能描述: 停止视频数据输入(七牛接口，在inputVideoFrame之后调用，房间内其它用户会收到YOUME_EVENT_OTHERS_VIDEO_INPUT_STOP事件)
     * @return YOUME_SUCCESS - 成功
     *         其他 - 具体错误码
     */
    stopInputVideoFrame(): number;
    /**
     *  功能描述: 设置帧率
     *  @param  fps:帧率（1-30），默认15帧，必须在设置分辨率之前调用
     *  @return YOUME_SUCCESS - 成功
     *          其他 - 具体错误码
     */
    setVideoFps(fps: number): number;
    /**
     *  功能描述: 设置帧率
     *  @param  fps:帧率（1-30），默认15帧，必须在设置分辨率之前调用
     *  @return YOUME_SUCCESS - 成功
     *          其他 - 具体错误码
     */
    setVideoFpsForSecond(fps: number): number;
    switchCamera(): number;
    /**
     *  功能描述: 权限检测结束后重置摄像头
     *  @param
     *  @return YOUME_SUCCESS - 成功
     *          其他 - 具体错误码
     */
    resetCamera(): number;
    setCaptureFrontCameraEnable(enable: boolean): number;
    /**
     *  功能描述: 设置外部输入模式的语音采样率
     *  @param inputSampleRate: 输入语音采样率
     *  @param mixedCallbackSampleRate: mix后输出语音采样率
     *  @return YOUME_SUCCESS - 成功
     *          其他 - 具体错误码
     */
    setExternalInputSampleRate(inputSampleRate: number, mixedCallbackSampleRate: number): number;
    /**
     *  功能描述: 设置视频数据上行的码率的上下限,第一路(默认不传)
     *  @param maxBitrate: 最大码率，单位kbit/s.  0无效
     *  @param minBitrate: 最小码率，单位kbit/s.  0无效

     *  @return None
     *
     *  @warning:需要在进房间之前设置
     */
    setVideoCodeBitrate(maxBitrate: number, minBitrate: number): void;
    /**
     *  功能描述: 设置视频数据上行的码率的上下限,第二路(默认不传)
     *  @param maxBitrate: 最大码率，单位kbit/s.  0无效
     *  @param minBitrate: 最小码率，单位kbit/s.  0无效

     *  @return None
     *
     *  @warning:需要在进房间之前设置
     */
    setVideoCodeBitrateForSecond(maxBitrate: number, minBitrate: number): void;
    /**
     *  功能描述: 设置视频网络传输过程的分辨率，低分辨率
     *  @param width:宽
     *  @param height:高
     *  @return YOUME_SUCCESS - 成功
     *          其他 - 具体错误码
     */
    setVideoNetResolutionForSecond(width: number, height: number): any;
    /**
     *  功能描述: 获取视频数据上行的当前码率。
     *
     *  @return 视频数据上行的当前码率
     */
    getCurrentVideoCodeBitrate(): number;
    /**
     *  功能描述: 设置视频数据是否同意开启硬编硬解
     *  @param bEnable: true:开启，false:不开启
     *
     *  @return None
     *
     *  @note: 实际是否开启硬解，还跟服务器配置及硬件是否支持有关，要全部支持开启才会使用硬解。并且如果硬编硬解失败，也会切换回软解。
     *  @warning:需要在进房间之前设置
     */
    setVideoHardwareCodeEnable(bEnable: boolean): void;
    /**
     *  功能描述: 获取视频数据是否同意开启硬编硬解
     *  @return true:开启，false:不开启， 默认为true;
     *
     *  @note: 实际是否开启硬解，还跟服务器配置及硬件是否支持有关，要全部支持开启才会使用硬解。并且如果硬编硬解失败，也会切换回软解。
     */
    getVideoHardwareCodeEnable(): number;
    /**
     *  功能描述: 设置视频无帧渲染的等待超时时间，超过这个时间会给上层回调
     *  @param timeout: 超时时间，单位为毫秒
    */
    setVideoNoFrameTimeout(timeout: number): number;
    /**
     *  功能描述: 查询多个用户视频信息（支持分辨率）
     *  @param userList: 用户ID列表的json数组
     *  @return YOUME_SUCCESS - 成功
     *          其他 - 具体错误码
     */
    queryUsersVideoInfo(userList: string): number;
    setLocalVideoPreviewMirror(mirror: boolean): void;
    /**
     *  功能描述: 设置多个用户视频信息（支持分辨率）
     *  @param videoinfoList: 用户对应分辨率列表的json数组
     *  @return YOUME_SUCCESS - 成功
     *          其他 - 具体错误码
     */
    setUsersVideoInfo(videoinfoList: string): number;
    /**
     *  功能描述: 美颜开关，默认是关闭美颜
     *  @param open: true表示开启美颜，false表示关闭美颜
     *  @return YOUME_SUCCESS - 成功
     *          其他 - 具体错误码
     */
    openBeautify(open: boolean): number;
    /**
     *  功能描述: 美颜强度参数设置
     *  @param param: 美颜参数，0.0 - 1.0 ，默认为0，几乎没有美颜效果，0.5左右效果明显
     *  @return YOUME_SUCCESS - 成功
     *          其他 - 具体错误码
     */
    beautifyChanged(param: number): number;
    /**
     *  功能描述: 调用后同步完成麦克风释放，只是为了方便使用 IM 的录音接口时切换麦克风使用权。
     *  @return bool - 成功
     */
    releaseMicSync(): boolean;
    /**
     *  功能描述: 调用后恢复麦克风到释放前的状态，只是为了方便使用 IM 的录音接口时切换麦克风使用权。
     *  @return bool - true 成功
     */
    resumeMicSync(): boolean;
    bindUserToCanvas(userid: string, canvasid: string): void;
    updateCanvas(userid: string, canvasid: string, getLocalSharePreview: boolean, fitMode: any, cutRate?: number): any;
    /**
    *  功能描述: 设置共享视频帧率
    *  @param  fps:帧率（1-30），默认15帧
    *  @return YOUME_SUCCESS - 成功
    *          其他 - 具体错误码
    */
    setVideoFpsForShare(fps: number): number;
    /**
    *  功能描述: 设置共享视频网络传输过程的分辨率
    *  @param width:宽
    *  @param height:高
    *  @return YOUME_SUCCESS - 成功
    *          其他 - 具体错误码
    */
    setVideoNetResolutionForShare(width: number, height: number): number;
    /**
    *  功能描述: 设置共享视频数据上行的码率的上下限
    *  @param maxBitrate: 最大码率，单位kbps.  0：使用默认值
    *  @param minBitrate: 最小码率，单位kbps.  0：使用默认值

    *  @return None
    *
    *  @warning:需要在进房间之前设置
    */
    setVideoCodeBitrateForShare(maxBitrate: number, minBitrate: number): void;
    /**
    *  功能描述: 设置共享流视频编码是否采用VBR动态码率方式
    #  @param useVBR 0为不使用vbr，1是使用vbr，默认为0
    *
    *  @return None
    *
    *  @warning:需要在进房间之前设置
    */
    setVBRForShare(useVBR: boolean): number;
    /**
    *  功能描述: 设置弱网分辨率调节模式是自动还是手动，默认为自动
    #  @param mode 0 为自动，1 为手动
    *
    *  @return int
    *
    *  @warning:需要在进房间之前设置
    */
    setVideoNetAdjustmode(mode: any): any;
    /**
    *  功能描述: 设置主视频流编码是否采用VBR动态码率方式
    #  @param useVBR 0为不使用vbr，1是使用vbr，默认为0
    *
    *  @return None
    *
    *  @warning:需要在进房间之前设置
    */
    setVBR(useVBR: boolean): number;
    /**
    *  功能描述: 设置小流流视频编码是否采用VBR动态码率方式
    #  @param useVBR 0为不使用vbr，1是使用vbr，默认为0
    *
    *  @return None
    *
    *  @warning:需要在进房间之前设置
    */
    setVBRForSecond(useVBR: boolean): number;
    /**
    * 设置共享视频流采集模式和参数
    * @param mode: 共享视频采集模式  1：采集设备 2：采集指定窗口 3：采集桌面
    * @param renderHandle: 共享视频preview窗口句柄，必选
    * @param captureHandle: 指定需要采集的窗口句柄，采集桌面则可以设置为NULL
    * @return YOUME_SUCCESS - 成功
    *          其他 - 具体错误码
    */
    setShareParameter(mode: number, renderHandle: number, captureHanle: number): number;
    /**
    * 开始采集共享区域视频并开始共享
    * @param mode:共享视频采集模式  1：采集设备 2：采集指定窗口 3：采集桌面
    * @param renderHandle: windows 平台 共享视频preview窗口句柄，必选，可以为0，mac 平台 指定需要采集的窗口句柄，采集桌面则可以设置为NULL，可以为0
    * @param captureHanle: windows 平台only，指定需要采集的窗口句柄，采集桌面则可以设置为NULL
    * @return YOUME_SUCCESS - 成功
    *          其他 - 具体错误码
    */
    startShareStream(mode: number, renderHandle: number, captureHanle: number): number;
    /**
    * 结束采集共享区域视频并结束共享
    * @return 无返回码
    */
    stopShareStream(): number;
    /**
     * 获取麦克风设备数量
     * @return 麦克风设备数量
     */
    getRecordDeviceCount(): number;
    /**
    *  功能描述: 设置预览帧率
    *  @param  fps:帧率（1-60），默认15帧，必须在设置分辨率之前调用
    *  @return YOUME_SUCCESS - 成功
    *          其他 - 具体错误码
    */
    setVideoPreviewFps(fps: number): number;
    /**
     * 获取麦克风信息
     * @param  index 麦克风对应的索引
     * @return       返回麦克风的名称和对一个的设备 id
     */
    getRecordDeviceInfo(index: number): object;
    /**
     * 设置麦克风
     * @param deviceUid 麦克风设备 id
     */
    setRecordDevice(deviceUid: string): void;
    /**
     * 外置微软实时语音识别开关接口
     * @param {boolean} switchOn true 开启识别，false关闭
     * @param {string} fromLang 识别的源语言，语音编码表参阅https://en.wikipedia.org/wiki/Language_localisation
     * @param {string} toLang 翻译的目标语言，语音编码表参阅https://en.wikipedia.org/wiki/Language_localisation
     *
     */
    msSwitchAudioRecognition(switchOn: boolean, fromLang: string, destLang: string, key?: string, region?: string, endPoint?: string): void;
    /**
     * 检查是否已经获取共享屏幕权限
     * @return {number} 如果返回 0 则表示已经获取权限
     */
    checkSharePermission(): any;
    /**
     * 获取可以录制的窗口句柄枚举,可能为null，windows平台和mac平台字段有区别
     * @return {json}
     * win: {winlist:[{
     * hwnd:number, //窗口句柄值
     * name:string //窗口标题
     * }]}
     *
     * mac:{
     * winlist:[{
     *   id:number, //窗口id
     *   owner:number,//父窗口id
     *   window:string //窗口标题
     * }]
     * }
     */
    getWinList(): any;
    /**
     * 获取打开了摄像头的用户字典
     * @return {any}
     */
    getVideoOnUser(): any;
    on(event: string, callback: Function): void;
}
