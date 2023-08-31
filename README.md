# jSynth v2
  
  ![screenshot](/assets/images/screenshot.jpg)

  ## Description
  [jSynth](https://elrond-hubbard.github.io/jSynth2/) is a musical instrument built with JavaScript and the Tone.js library.

  ## Table of Contents
  * [Interface](#interface)
  * [Oscillator](#oscillator)
  * [Envelope](#envelope)
  * [Filter](#filter)
  * [Sequencer](#sequencer)
  * [Future](#future)
  * [Credits](#credits)
  * [Questions](#questions)

  ## Interface
  To play notes, use the keys on your keyboard.

  ![image](https://camo.githubusercontent.com/c790d2b0427884d4e886f224e35922f93384a015fabc12b9b761122b3ffb6f84/68747470733a2f2f7261772e6769746875622e636f6d2f6b796c65737465747a2f617564696f6b6579732f6d61737465722f696d616765732f617564696f6b6579732d6d617070696e672d726f7773322e6a7067)

  ## Oscillator
  Select a waveform with the "SHAPE" buttons. Each shape generates a different sound.
  * SIN: Smooth, quiet, and simple with no harmonics or overtones.
  * SQR: Sharp and hollow with odd harmonic content.
  * SAW: The sawtooth wave contains both odd and even harmonics and is said to be the richest in terms of timbre. Classic!
  * TRI: Similar to the sine wave with some additional odd harmonics.

  The "UNISON" controls add additional oscillators to the signal path. Use the slider to detune the oscillators for a more dynamic sound.

  ## Envelope
  The "ENVELOPE" controls determine the volume curve of the oscillator and filter.
  * ATTACK: The time it takes for the signal to reach peak value. (max 2 seconds)
  * DECAY: The time it takes for the signal to fall to its SUSTAIN value. (max 2 seconds)
  * SUSTAIN: The value held after the signal peaks.
  * RELEASE: The time it takes for the signal to fade out when it is released. (max 2 seconds)

  ## Filter
  jSynth includes a low-pass filter to reduce the volume of higher frequencies.
  * CUTOFF: Frequencies above this threshold will be filtered out of the signal.
  * Q: Increases the peak gain of frequencies just before the cutoff.

  ## Sequencer
  To record a sequence, press the "REC" button and input notes. The sequencer can store up to 16 notes. Press "PLAY" to initialize the sequence. The sequencer will play back at 16th note intervals until you press "STOP". Press "CLEAR" to delete the sequence. Use the BPM form to set beats-per-minute

  ## Future
  jSynth v2 is the second iteration of a long-term project aiming to build a full-featured musical performance suite on the web. In the future, it may include:
  * Additional synthesizers with note polyphony
  * Seperate envelope controls for amplitude and filter
  * Additional filter types (hipass, bandpass, etc.)
  * Sequence storage and sequence arrangement
  * A drum machine
  * Reverb, chorus, delay and sidechain compression effects
  * Multi-user websocket functionality  

  If you would like to contribute to this project, contact me and let me know!

  ## Credits
  [Tone.js](https://github.com/Tonejs)  
  [AudioKeys.js](https://github.com/kylestetz/AudioKeys)

  ## Questions
  [Elrond-Hubbard](https://github.com/Elrond-Hubbard)  
  marsolomichael@gmail.com

  
