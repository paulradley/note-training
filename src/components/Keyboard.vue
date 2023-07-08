<script setup>
import KeyboardHelpers from '@/modules/keyboard'
import { computed, ref } from 'vue'

const props = defineProps({
  from: String,
  to: String,
  correct: Array,
  incorrect: Array
})

const notes = ref(KeyboardHelpers.keyboardFactory(props.from, props.to))

const noteClass = computed(() => {
  return (identifier) => {
    return {
      correct: props.correct.includes(identifier),
      incorrect: props.incorrect.includes(identifier)
    }
  }
})
</script>

<template>
  <ul class="keyboard">
    <li
      v-for="note in notes"
      :key="note.identifier"
      class="keyboard-note"
      :class="noteClass(note.identifier)"
    />
  </ul>
</template>

<style lang="scss" scoped>
$note-width: 25px;
$note-gap: 2px;
$color-primary: #000;
$color-secondary: #fff;

.keyboard {
  display: flex;
  justify-content: center;
  padding: calc($note-width * 2) $note-width $note-width;
  list-style-type: none;

  &-note {
    flex-shrink: 0;
    height: calc($note-width * 5);
    width: $note-width;
    background-color: $color-secondary;
    border-radius: 2px;
    box-shadow: 0 $note-gap $note-gap 0 $color-primary;

    &:nth-child(12n + 5),
    &:nth-child(12n + 7),
    &:nth-child(12n + 10),
    &:nth-child(12n + 12),
    &:nth-child(12n + 2) {
      background-color: $color-primary;
      height: calc($note-width * 3);
      margin-left: calc(-1 * $note-width / 2);
      margin-right: calc(-1 * $note-width / 2);
      z-index: 1;
      width: $note-width - $note-gap;
      border-left: $note-gap solid ivory;
      border-right: $note-gap solid ivory;
      border-radius: 2px + $note-gap;
      box-shadow: none;
    }

    &.correct {
      margin-top: 4px;
      outline: none;
      background-color: #64f57b;
    }

    &.incorrect {
      margin-top: 4px;
      outline: none;
      background-color: red;
    }
  }
}
</style>
