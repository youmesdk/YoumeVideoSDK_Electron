/*
 * @Author: fan.li
 * @Date: 2019-02-27 17:21:03
 * @Last Modified by: fan.li
 * @Last Modified time: 2019-02-27 19:37:01
 *
 * electron-builder AfterPack 钩子函数，
 * 负责根据当前打包的Platform（Arch）把相应的Video SDK 拷贝到
 *
 * resources/app/ 目录中
 */

const chalk = require('chalk')
const builder = require('electron-builder')
const copy = require('copy')
const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')

/**
 * 拷贝文件夹
 * @param {string} src 原文件路径
 * @param {string} dist 目标路径
 */
function copyDir(src, dist) {
  exec(`mkdir -p ${dist}`)
  exec(`cp -R ${src} ${dist}`)
}

function handleCopyFile(src, dist) {
  return new Promise((resolve, reject) => {
    copy(src, dist, function(err, files) {
      if (err) {
        console.log(chalk.red(`copy file from ${src} to ${dist} fail!`), err)
        return reject(err)
      }
      console.log(chalk.blue(`copy file from ${src} to ${dist} success!`))
      return resolve(files)
    })
  })
}

const recordSdkSrc = path.join(__dirname,  '..', 'app', 'utils','screenRecord/**/*')

exports.default = async function(context) {
  const platform = context.electronPlatformName
  const arch = context.arch

  if (platform === 'win32' && arch === builder.Arch.x64) {
    const src = path.join(__dirname,  '..',  'youme_voice_engine', 'x86-64/**/*')
    const dist = path.join(context.appOutDir, 'resources', 'youme_voice_engine', 'x86-64')
    return handleCopyFile(src, dist).then(() => {
      const recordSdkDist = path.join(context.appOutDir, 'resources', 'app', 'utils', 'screenRecord')
      return handleCopyFile(recordSdkSrc, recordSdkDist)
    }).then(()=>{
      const src = path.join(__dirname,  '..', 'dll','x86-64/**/*')
      const dist = context.appOutDir
      return handleCopyFile(src, dist)
    })
  }

  if (platform === 'win32' && arch === builder.Arch.ia32) {
    const src = path.join(__dirname,  '..', 'youme_voice_engine', 'x86/**/*')
    const dist = path.join(context.appOutDir, 'resources', 'youme_voice_engine', 'x86')
    return handleCopyFile(src, dist).then(() => {
      const recordSdkDist = path.join(context.appOutDir, 'resources', 'app', 'utils', 'screenRecord')
      return handleCopyFile(recordSdkSrc, recordSdkDist)
    }).then(()=>{
      const src = path.join(__dirname,  '..', 'dll','x86/**/*')
      const dist = context.appOutDir
      return handleCopyFile(src, dist)
    })
  }

  if (platform === 'darwin') {
    const src = path.join(__dirname,  '..','youme_voice_engine', 'macos/')
    const dist = path.join(context.appOutDir, 'youme-electron-demo.app','Contents','Resources', 'youme_voice_engine', 'macos')
    copyDir(src, dist)
  }
}
