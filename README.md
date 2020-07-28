
# 游密视频Demo说明

此示例演示了视频通话中常见需求。初始化引擎、加入/离开房间、开/关麦克风、开/关摄像头及开/关扬声器等功能。

## 运行Demo

> 下面操作请确保已安装`nodejs`环境及`npm`或`yarn`等package管理工具
> nodejs 需要 12.x 版本

1. 当前文件所在目录运行 `yarn`, 进行依赖安装

2. 在该目录下运行 `yarn start`运行Demo，可以开启两个应用程序，一个发送一个接收

3. Demo为接口演示demo，需要按顺序点击“初始化引擎”->“加入房间”，成功后再点击其他按钮

4. 如果要构建安装包，运行: `yarn dist`

## 文件及目录说明

1. `Demo`目录为本示例代码目录, 如何使用SDK请参考本目录下的`render.js`文件

2. `youme_voice_engine`及`youmevideo.min.js`为视频通话SDK文件，请不要修改他们的相对位置

## 注意事项

1. 视频SDK依赖`ffi`模块，请确保`youmevideo.min.js`的依赖搜索过程中能搜索到`ffi`模块，需要安装vs 2015