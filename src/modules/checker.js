import KeyboardHelpers from '@/modules/keyboard'
import _ from 'lodash'

let guess = []
let pressed = []

const reset = () => {
  guess = []
}

const addGuess = (from, to, numberOf) => {
  const chord = KeyboardHelpers.randomNotes(from, to, numberOf)
  guess.push(...chord.map((c) => c.identifier))

  return chord
}

const addPressed = (identifier) => {
  pressed.push(identifier)
}

const removePressed = (identifier) => {
  pressed = pressed.filter((item) => item !== identifier)
}

const correct = () => {
  return _.intersection(guess, pressed)
}

const incorrect = () => {
  return _.difference(pressed, guess)
}

const isCorrect = () => {
  return _.isEqual(guess.toSorted(), pressed.toSorted())
}

export default {
  reset,
  addGuess,
  addPressed,
  removePressed,
  correct,
  incorrect,
  isCorrect
}
