require('dotenv').config()
const { notarize } = require('electron-notarize')

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context
  if (electronPlatformName !== 'darwin') {
    return
  }

  const appName = context.packager.appInfo.productFilename

  return await notarize({
    appBundleId: 'im.youme.teampro',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: 'youme@youme.im',
    appleIdPassword: 'uvba-isma-qagy-rhuo',
  })
}
