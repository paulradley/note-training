import _ from 'lodash'

const raw = [
  { name: 'C', accidental: '' },
  { name: 'C', accidental: '#' },
  { name: 'D', accidental: '' },
  { name: 'D', accidental: '#' },
  { name: 'E', accidental: '' },
  { name: 'F', accidental: '' },
  { name: 'F', accidental: '#' },
  { name: 'G', accidental: '' },
  { name: 'G', accidental: '#' },
  { name: 'A', accidental: '' },
  { name: 'A', accidental: '#' },
  { name: 'B', accidental: '' }
]

const parseIdentifier = (identifier) => {
  const parsed = identifier.match(/^(.)(.)?(.)$/)

  return {
    name: parsed[1],
    octave: parseInt(parsed[3]),
    accidental: parsed[2] ?? ''
  }
}

const indexOfRaw = (note) => {
  return raw.findIndex((r) => r.name === note.name && r.accidental === note.accidental)
}

const noteAlias = (current) => {
  const index = indexOfRaw(current)
  const next = raw[(index + 1) % raw.length]
  const prev = raw[(index + raw.length - 1) % raw.length]

  if (['C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B'].includes(current.name + current.accidental)) {
    return {
      identifier: current.identifier,
      name: next.name,
      octave: current.name === 'B' ? current.octave + 1 : current.octave,
      accidental: 'b'
    }
  }

  if (['C', 'F'].includes(current.name + current.accidental)) {
    return {
      identifier: current.identifier,
      name: prev.name,
      octave: current.name === 'C' ? current.octave - 1 : current.octave,
      accidental: '#'
    }
  }
}

const keyboardFactory = (from, to) => {
  const fromNote = parseIdentifier(from)
  const toNote = parseIdentifier(to)
  const keyboard = []

  for (let octave = fromNote.octave; octave <= toNote.octave; octave++) {
    const from = octave === fromNote.octave ? indexOfRaw(fromNote) : 0
    const to = octave === toNote.octave ? indexOfRaw(toNote) : raw.length - 1

    for (let i = from; i <= to; i++) {
      const note = {
        identifier: raw[i].name + raw[i].accidental + octave,
        name: raw[i].name,
        octave: octave,
        accidental: raw[i].accidental
      }
      keyboard.push(note)
    }
  }

  return keyboard
}

const randomNotes = (from, to, numberOf = [1, 2, 3, 4], maxGap = 12) => {
  let count = _.sample(numberOf)
  const noteGap = 3
  const keyboard = keyboardFactory(from, to)
  const startCandidates = keyboard.slice(0, keyboard.length - noteGap * (count - 1))
  if (!startCandidates.length) {
    throw 'No available notes'
  }
  const startRange = _.random(0, startCandidates.length - 1)
  const endRange = Math.min(startRange + maxGap, keyboard.length - 1)
  const noteIndexes = []

  let start = startRange
  do {
    const end = endRange - noteGap * (count - 1)
    const single = _.random(start, end)
    noteIndexes.push(single)
    start = single + noteGap
  } while (--count)

  return _.at(keyboard, noteIndexes).map((note) => {
    const alias = noteAlias(note) ?? note

    return _.random(0, 2) ? alias : note
  })
}

export default {
  keyboardFactory,
  randomNotes
}
