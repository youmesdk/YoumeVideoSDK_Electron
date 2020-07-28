/*
 * @Author: fan.li
 * @Date: 2019-02-19 18:31:12
 * @Last Modified by: fan.li
 * @Last Modified time: 2019-02-19 21:35:08
 *
 * @flow
 *
 * windows录屏SDK需要shaders文件夹与app的exe文件在同一目录
 * 开发环境下，需要把上述文件拷贝到node_modules的electron.exe同级目录
 * 在正式打包后，需要把shader反正应用目录
 */

const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const copy = require("copy");

const srcShadersPath = path.join(
  __dirname,
  "..",
  "youme_voice_engine",
  "shaders"
);
const distShadersPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "electron",
  "dist",
  "shaders"
);

(function() {
  if (!fs.existsSync(distShadersPath)) {
    copy(srcShadersPath + "/**/*", distShadersPath, function(err) {
      if (err) {
        throw new Error(
          chalk.whiteBright.bgRed.bold(
            "复制shaders目录到node_modules中electron的dist目录中失败"
          )
        );
      } else {
        console.log(
          chalk.blue("复制shaders目录到node_modules中electron的dist目录中成功")
        );
      }
    });
  }
})();
