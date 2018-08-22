import {
  NativeEventEmitter,
  NativeModules
} from 'react-native'
import {
  addNokeDeviceIfNeeded,
  addNokeDeviceOnce,
  fromNokeEvents,
  onEvent
} from './events'

const { RNNoke } = NativeModules

export default {
  initiateNokeService: RNNoke.initiateNokeService,
  on: onEvent,
  offlineUnlock: RNNoke.offlineUnlock,
  sendCommands: RNNoke.sendCommands,
  addNokeDevice(data) {
    return RNNoke.addNokeDevice(data)
  },
  removeAllNokes: RNNoke.removeAllNokes,
  removeNokeDevice: RNNoke.removeNokeDevice,
  startScan: RNNoke.startScan,
  stopScan: RNNoke.stopScan,
  disconnect: RNNoke.disconnect,
  getDeviceInfo: RNNoke.getDeviceInfo,
  setOfflineData: RNNoke.setOfflineData,
  fromNokeEvents,
  addNokeDeviceIfNeeded,
  addNokeDeviceOnce,

  AUTHOR: RNNoke.AUTHOR
}