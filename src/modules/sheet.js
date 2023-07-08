import { Stave, StaveNote, Accidental, Voice, Formatter, StaveConnector } from 'vexflow'

const renderHand = (context, stave, clef, chord) => {
  stave = stave.addClef(clef).setContext(context).draw()
  if (chord.length === 0) {
    return
  }

  const keys = chord.map((c) => `${c.name}${c.accidental}/${c.octave}`)
  const staveNotes = new StaveNote({ keys: keys, duration: 'q', auto_stem: true, clef: clef })
  chord.forEach((c, i) => {
    if (c.accidental) {
      staveNotes.addModifier(new Accidental(c.accidental), i)
    }
  })

  const voice = new Voice({ num_beats: 1, beat_value: 4 })
    .addTickable(staveNotes)
    .setStave(stave)
    .setContext(context)
  new Formatter().joinVoices([voice]).formatToStave([voice], stave)

  voice.draw()
}

const render = (context, chordLeft, chordRight) => {
  context.clear()
  context.resize(150, 350)

  const staveRight = new Stave(5, 75, 300)
  renderHand(context, staveRight, 'treble', chordRight)

  const staveLeft = new Stave(5, 175, 300)
  renderHand(context, staveLeft, 'bass', chordLeft)

  new StaveConnector(staveRight, staveLeft)
    .setType(StaveConnector.type.DOUBLE)
    .setContext(context)
    .draw()
}

export default {
  render
}
