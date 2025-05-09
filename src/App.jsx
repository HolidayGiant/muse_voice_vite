import React, { useEffect, useState } from 'react';
import deck from './deck.json';

const App = () => {
  const [promptId, setPromptId] = useState(deck.prompts[0].id);
  const [recognized, setRecognized] = useState("");
  const [listening, setListening] = useState(false);

  const prompt = deck.prompts.find(p => p.id === promptId);

  useEffect(() => {
    if (!listening) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Speech recognition not supported in this browser.');
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript.trim().toLowerCase();
      setRecognized(transcript);
      if (prompt.branch_map && prompt.branch_map[transcript]) {
        setPromptId(prompt.branch_map[transcript]);
      } else if (["next", "please", "we're ready"].some(k => transcript.includes(k))) {
        const idx = deck.prompts.findIndex(p => p.id === promptId);
        setPromptId(deck.prompts[idx + 1]?.id || promptId);
      } else if (["stop", "close", "we're done"].some(k => transcript.includes(k))) {
        alert('Session ended.');
        setListening(false);
      }
    };
    recognition.start();
    return () => recognition.stop();
  }, [listening, promptId, prompt]);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>{deck.name}</h1>
      <p>{deck.description}</p>
      <div style={{ padding: 20, background: '#fff', borderRadius: 8, margin: '20px 0' }}>
        <p>{prompt.text}</p>
        {recognized && <p style={{ color: 'green' }}>Heard: {recognized}</p>}
      </div>
      <button onClick={() => setListening(true)}>
        <span role="img" aria-label="microphone">🎤</span> Start Listening
      </button>
    </div>
  );
};

export default App;