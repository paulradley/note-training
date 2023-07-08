import {assert, test, vi} from 'vitest'
import Keyboard from "@/modules/keyboard"
import _ from 'lodash'

test('Keyboard Factory', () => {
  const result = Keyboard.keyboardFactory('C4', 'C4')
  assert.deepStrictEqual(result, [
    {
      identifier: 'C4',
      name: 'C',
      octave: 4,
      accidental: '',
    }
  ])
})

test.each([
  ['C1', 'D1', ['C1', 'C#1', 'D1']],
  ['B1', 'C2', ['B1', 'C2']],
  ['B1', 'C3', ['B1', 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3']],
])('Identifiers', (from, to, expected) => {
  const result = Keyboard.keyboardFactory(from, to)
  assert.deepStrictEqual(result.map(el => el.identifier), expected)
})

test.each([
  ['C4', 'C4', 0, 'C4'],
  ['C4', 'D4', 0, 'C4'],
  ['C4', 'D4', 1, 'C#4'],
  ['C4', 'D4', 2, 'D4'],
  ['C4', 'C5', 0, 'C4'],
  ['C4', 'C5', 12, 'C5'],
])('Random Note', (from, to, index, expected) => {
  vi.spyOn(_, 'random')
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(index)

  const count = 1
  const result = Keyboard.randomNotes(from, to, [count])

  assert.lengthOf(result, count)
  assert.strictEqual(result[0].identifier, expected)
})

test.each([
  ['C4', 'F#4', ['C4', 'D#4', 'F#4']],
  ['C4', 'A4', ['C4', 'D#4', 'F#4', 'A4']],
])('Min Gap', (from, to, expected) => {
  const count = expected.length
  const result = Keyboard.randomNotes(from, to, [count])

  assert.lengthOf(result, count)
  assert.deepStrictEqual(result.map(r => r.identifier), expected)
})

test('Complex random notes', () => {
  vi.spyOn(_, 'sample').mockReturnValueOnce(4)
  vi.spyOn(_, 'random')
    .mockReturnValueOnce(15)
    .mockReturnValueOnce(15)
    .mockReturnValueOnce(19)
    .mockReturnValueOnce(24)
    .mockReturnValueOnce(27)

  const result = Keyboard.randomNotes('C3', 'C6', [1, 2, 3, 4], 12)

  assert.deepStrictEqual(result.map(r => r.identifier), ['D#4', 'G4', 'C5', 'D#5'])
})