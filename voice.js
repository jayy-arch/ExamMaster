/* ===== VOICE ASSISTANT ===== */

function openVoiceModal() {
  document.getElementById('voice-modal-overlay').classList.add('open');
}
function closeVoiceModal() {
  document.getElementById('voice-modal-overlay').classList.remove('open');
  stopListening();
}

let recognition = null;
let isListening = false;

function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    setStatus('Speech recognition is not supported in this browser. Try Chrome.');
    return;
  }

  if (isListening) { stopListening(); return; }

  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = function () {
    isListening = true;
    document.getElementById('voice-orb').classList.add('listening');
    setStatus('Listening... speak now');
  };

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    setStatus('You said: "' + transcript + '"');
    handleVoiceCommand(transcript.toLowerCase().trim());
  };

  recognition.onerror = function (event) {
    setStatus('Could not hear you. Please try again.');
    stopListening();
  };

  recognition.onend = function () {
    stopListening();
  };

  recognition.start();
}

function stopListening() {
  isListening = false;
  document.getElementById('voice-orb').classList.remove('listening');
  if (recognition) { try { recognition.stop(); } catch(e) {} recognition = null; }
  if (!document.getElementById('voice-status').textContent.startsWith('You said')) {
    setStatus('Click the button to speak');
  }
}

function setStatus(msg) {
  const el = document.getElementById('voice-status');
  if (el) el.textContent = msg;
}

function showOutput(msg) {
  const el = document.getElementById('voice-output');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
  speak(msg);
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;
  window.speechSynthesis.speak(utter);
}

function handleVoiceCommand(cmd) {
  // Navigation
  if (cmd.includes('home') || cmd.includes('main page')) {
    showOutput('Taking you to the home page.'); setTimeout(() => { window.location.href = 'index.html'; }, 1500); return;
  }
  if (cmd.includes('tool') || cmd.includes('tools')) {
    showOutput('Opening the tools page.'); setTimeout(() => { window.location.href = 'tools.html'; }, 1500); return;
  }
  if (cmd.includes('material') || cmd.includes('study material')) {
    showOutput('Opening your study materials.'); setTimeout(() => { window.location.href = 'materials.html'; }, 1500); return;
  }
  if (cmd.includes('feedback') || cmd.includes('review')) {
    showOutput('Opening the feedback page.'); setTimeout(() => { window.location.href = 'feedback.html'; }, 1500); return;
  }
  if (cmd.includes('ai assistant') || cmd.includes('homework help')) {
    showOutput('Opening the AI Study Assistant.'); setTimeout(() => { window.location.href = 'ai-assistant.html'; }, 1500); return;
  }
  if (cmd.includes('note') || cmd.includes('summarize')) {
    showOutput('Opening the Smart Note Summarizer.'); setTimeout(() => { window.location.href = 'notes.html'; }, 1500); return;
  }
  if (cmd.includes('planner') || cmd.includes('plan')) {
    showOutput('Opening the Study Planner.'); setTimeout(() => { window.location.href = 'planner.html'; }, 1500); return;
  }
  if (cmd.includes('explain') || cmd.includes('confused')) {
    showOutput('Opening Explain It Differently.'); setTimeout(() => { window.location.href = 'explain.html'; }, 1500); return;
  }
  if (cmd.includes('accountability') || cmd.includes('goal') || cmd.includes('streak') || cmd.includes('badge')) {
    showOutput('Opening the Accountability Partner.'); setTimeout(() => { window.location.href = 'accountability.html'; }, 1500); return;
  }
  if (cmd.includes('peer') || cmd.includes('partner') || cmd.includes('match')) {
    showOutput('Opening the Peer Study Matcher.'); setTimeout(() => { window.location.href = 'peer.html'; }, 1500); return;
  }

  // Info queries
  if (cmd.includes('dark mode') || cmd.includes('light mode')) {
    toggleTheme(); showOutput('Theme switched!'); return;
  }
  if (cmd.includes('help') || cmd.includes('what can you do') || cmd.includes('commands')) {
    showOutput('I can navigate pages for you. Say things like: open tools, go to home, open planner, explain something, or dark mode. I can also read back information.'); return;
  }
  if (cmd.includes('hello') || cmd.includes('hi')) {
    showOutput('Hello! I am your StudyBoost voice assistant. How can I help you study today?'); return;
  }
  if (cmd.includes('close') || cmd.includes('exit') || cmd.includes('stop')) {
    showOutput('Closing voice assistant.'); setTimeout(() => closeVoiceModal(), 1200); return;
  }
  if (cmd.includes('log') || cmd.includes('study today') || cmd.includes('log today')) {
    if (typeof logToday === 'function') { logToday(); showOutput('Logged your study session for today. Keep it up!'); }
    else showOutput('Go to the home page or accountability page to log your study streak.');
    return;
  }

  showOutput('I heard: "' + cmd + '". Try saying: open tools, go home, open planner, or say help for a full list of commands.');
}

function runQuickCommand(cmd) {
  document.getElementById('voice-output').style.display = 'none';
  setStatus('Running: ' + cmd);
  handleVoiceCommand(cmd);
}

/* Close modal when clicking overlay background */
document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('voice-modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeVoiceModal();
    });
  }
  setStatus('Click the button to speak');
});
