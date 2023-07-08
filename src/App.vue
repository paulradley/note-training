<script setup>
import Sheet from '@/components/Sheet.vue'
import Keyboard from '@/components/Keyboard.vue'
import Settings from '@/components/Settings.vue'
import { onMounted, ref } from 'vue'
import { ElContainer, ElMain, ElDialog } from 'element-plus'
import Checker from '@/modules/checker'
import SettingsModule from '@/modules/settings'

const leftChord = ref([])
const rightChord = ref([])
const correct = ref([])
const incorrect = ref([])
const settingsDialog = ref(false)

const onUpdateSettings = (settings) => {
  settingsDialog.value = false

  SettingsModule.store(settings)

  registerListeners()
  newGuess(settings)
}

const registerListeners = () => {
  SettingsModule.registerListener('noteon', (e) => {
    Checker.addPressed(e.note.identifier)

    correct.value = Checker.correct()
    incorrect.value = Checker.incorrect()
  })

  SettingsModule.registerListener('noteoff', (e) => {
    const wasCorrect = Checker.isCorrect()
    Checker.removePressed(e.note.identifier)

    correct.value = Checker.correct()
    incorrect.value = Checker.incorrect()

    if (wasCorrect) {
      newGuess(SettingsModule.settings)
    }
  })
}

const newGuess = ({ leftHand, rightHand }) => {
  Checker.reset()
  leftChord.value = leftHand.enabled
    ? Checker.addGuess(leftHand.from, leftHand.to, leftHand.notes)
    : []
  rightChord.value = rightHand.enabled
    ? Checker.addGuess(rightHand.from, rightHand.to, rightHand.notes)
    : []
}

onMounted(() => {
  registerListeners()
  newGuess(SettingsModule.settings)
})
</script>

<template>
  <el-container>
    <div class="gear-icon" @click="settingsDialog = true"></div>
    <el-main>
      <Sheet :left-chord="leftChord" :right-chord="rightChord"></Sheet>
      <Keyboard from="A0" to="C8" :correct="correct" :incorrect="incorrect"></Keyboard>
      <el-dialog v-model="settingsDialog">
        <template #header><h3>Settings</h3></template>
        <Settings
          :form-state="SettingsModule.settings"
          :default-state="SettingsModule.defaultSettings"
          @updateSettings="onUpdateSettings"
        />
      </el-dialog>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.gear-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-image: url('@/assets/gear.png');
  background-size: cover;
}
</style>
