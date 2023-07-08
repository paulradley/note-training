<script setup>
import {
  ElForm,
  ElFormItem,
  ElButton,
  ElInput,
  ElSelect,
  ElOption,
  ElCol,
  ElRow,
  ElCheckbox
} from 'element-plus'
import { reactive } from 'vue'
import _ from 'lodash'

const props = defineProps({
  formState: Object,
  defaultState: Object
})

const form = reactive(_.cloneDeep(props.formState))

const reset = () => {
  Object.assign(form, _.cloneDeep(props.defaultState))
}

const emit = defineEmits(['updateSettings'])
const updateSettings = () => {
  emit('updateSettings', form)
}
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-form label-width="100px" style="max-width: 500px">
        <el-col :span="12">
          <el-form-item class="header">MIDI</el-form-item>
          <el-form-item label="Device">
            <el-select
              v-model="form.device.selected"
              placeholder="Select device"
              no-data-text="No devices"
              class="select"
            >
              <el-option
                v-for="option of form.device.options"
                :key="option"
                :label="option"
                :value="option"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-row>
          <el-col :span="12">
            <el-form-item class="header">Left Hand</el-form-item>
            <el-form-item label="Enabled">
              <el-checkbox v-model="form.leftHand.enabled" />
            </el-form-item>
            <el-form-item label="From">
              <el-input
                v-model="form.leftHand.from"
                placeholder="From note"
                :disabled="!form.leftHand.enabled"
              />
            </el-form-item>
            <el-form-item label="To">
              <el-input
                v-model="form.leftHand.to"
                placeholder="To note"
                :disabled="!form.leftHand.enabled"
              />
            </el-form-item>
            <el-form-item label="Notes">
              <el-select
                v-model="form.leftHand.notes"
                multiple
                placeholder="Select note number"
                class="select"
                :disabled="!form.leftHand.enabled"
              >
                <el-option :label="1" :value="1" />
                <el-option :label="2" :value="2" />
                <el-option :label="3" :value="3" />
                <el-option :label="4" :value="4" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="header">Right Hand</el-form-item>
            <el-form-item label="Enabled">
              <el-checkbox v-model="form.rightHand.enabled" />
            </el-form-item>
            <el-form-item label="From">
              <el-input
                v-model="form.rightHand.from"
                placeholder="From note"
                :disabled="!form.rightHand.enabled"
              />
            </el-form-item>
            <el-form-item label="To">
              <el-input
                v-model="form.rightHand.to"
                placeholder="To note"
                :disabled="!form.rightHand.enabled"
              />
            </el-form-item>
            <el-form-item label="Notes">
              <el-select
                v-model="form.rightHand.notes"
                multiple
                placeholder="Select note number"
                class="select"
                :disabled="!form.rightHand.enabled"
              >
                <el-option :label="1" :value="1" />
                <el-option :label="2" :value="2" />
                <el-option :label="3" :value="3" />
                <el-option :label="4" :value="4" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="start">
          <el-form-item>
            <el-button type="primary" @click="updateSettings">Save</el-button>
            <el-button type="info" @click="reset">Reset</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.header {
  margin: 10px 0 2px;
}

.select {
  width: 100%;
}
</style>
