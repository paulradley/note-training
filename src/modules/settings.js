import store from 'store'
import { WebMidi } from 'webmidi'
import _ from 'lodash'

const defaultSettings = {
  device: {
    options: [],
    selected: null
  },
  leftHand: {
    enabled: false,
    from: 'F2',
    to: 'B3',
    notes: [1, 2]
  },
  rightHand: {
    enabled: true,
    from: 'C4',
    to: 'C6',
    notes: [1, 2]
  }
}

const storedSettings = store.get('settings')
const settings = storedSettings ? storedSettings : defaultSettings

await WebMidi.enable()
settings.device.options = WebMidi.inputs.map((i) => i.name)
settings.device.selected = WebMidi.inputs[0]?.name

const storeSettings = (newSettings) => {
  Object.assign(settings, newSettings)
  store.set('settings', newSettings)
}

const registerListener = (event, listener) => {
  const input = WebMidi.getInputByName(settings.device.selected)
  if (input) {
    input.addListener(event, listener)
  }
}

export default {
  settings,
  defaultSettings: _.cloneDeep(defaultSettings),
  store: storeSettings,
  registerListener
}
