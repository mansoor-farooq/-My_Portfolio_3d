// Micro-interaction Audio Synthesizer via Web Audio API (Zero external assets, instant 60fps response)
let audioCtx = null;
let isMuted = false;

export function initAudio() {
  if (typeof window === "undefined") return;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

export function toggleAudioMute() {
  isMuted = !isMuted;
  return isMuted;
}

export function getAudioMuted() {
  return isMuted;
}

// Crisp UI Hover tick (frequency 1200Hz -> 800Hz, 15ms)
export function playHoverSound() {
  if (isMuted) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.025, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.02);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.02);
  } catch (e) {
    // Ignore audio autoplay restrictions gracefully
  }
}

// Crisp UI Click pop (frequency 600Hz -> 180Hz, 35ms)
export function playClickSound() {
  if (isMuted) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(750, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch (e) {
    // Graceful fallback
  }
}

// Success chime
export function playSuccessSound() {
  if (isMuted) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.07);
      gain.gain.setValueAtTime(0.04, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.18);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.18);
    });
  } catch (e) {
    // Graceful fallback
  }
}
