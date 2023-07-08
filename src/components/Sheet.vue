<script setup>
import Sheet from '@/modules/sheet'
import { onMounted, ref, watch } from 'vue'
import { Renderer } from 'vexflow'

const props = defineProps({
  leftChord: Array,
  rightChord: Array
})

const sheet = ref(null)
let context

onMounted(() => {
  context = new Renderer(sheet.value, Renderer.Backends.SVG).getContext()
  Sheet.render(context, [], [])
})

watch([() => props.leftChord, () => props.rightChord], () => {
  Sheet.render(context, props.leftChord, props.rightChord)
})
</script>

<template>
  <div ref="sheet" class="sheet"></div>
</template>

<style lang="scss">
.sheet {
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    transform: scale(1.8);
  }
}
</style>
