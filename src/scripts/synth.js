/**
 * A wrapper for all synthesizers
 * */

import * as Tone from "tone";

export class Synth {
  constructor() {
    this.membrane = new Tone.PolySynth(Tone.MembraneSynth).toDestination();
    this.metal = new Tone.PolySynth(Tone.MetalSynth).toDestination();
    this.synth = new Tone.PolySynth().toDestination();
    this.fm = new Tone.PolySynth(Tone.FMSynth).toDestination();
    this.duo = new Tone.PolySynth(Tone.DuoSynth).toDestination();
  }

  getSynth(synth_str) {
    switch (synth_str) {
      case "membrane":
        return this.membrane;
      case "metal":
        return this.metal;
      case "fm":
        return this.fm;
      case "duo":
        return this.duo;
      default:
        return this.synth;
    }
  }
}