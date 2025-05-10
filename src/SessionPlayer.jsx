import React, { useState, useEffect } from 'react';

export default function SessionPlayer({ deck, onExit }) {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLanding(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (showLanding) {
    return (
      <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded text-center">
        <img src="/Reclining Muse Logo Design.png" alt="Muse logo" className="mx-auto mb-6 max-w-xs" />
        <h1 className="text-2xl font-bold mb-4">Welcome to Muse</h1>
        <p className="text-gray-600">Preparing your session...</p>
      </div>
    );
  }

  if (!deck || !Array.isArray(deck.prompts)) {
    return (
      <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded text-center">
        <h1 className="text-2xl font-bold mb-4">Missing session deck</h1>
        <p className="text-gray-600">No prompts were loaded. Please try again.</p>
        <button onClick={onExit} className="mt-4 px-4 py-2 bg-gray-200 rounded">Back</button>
      </div>
    );
  }

  const [index, setIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(null);
  const [countdown, setCountdown] = useState(null);

  const prompt = deck.prompts[index];
  const total = deck.prompts.length;

  useEffect(() => {
    const speakWithGoogleTTS = async () => {
      const apiKey = 'YOUR_GOOGLE_TTS_KEY';
      const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text: prompt.text },
          voice: { languageCode: 'en-US', name: 'en-US-Wavenet-F' },
          audioConfig: { audioEncoding: 'MP3' }
        })
      });
      const data = await response.json();
      if (data.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        audio.play().catch(() => {});
      }
    };

    if (prompt && prompt.text) speakWithGoogleTTS();

    if (prompt.timer && prompt.timer.duration_seconds) {
      setTimerSeconds(prompt.timer.duration_seconds);
      setCountdown(prompt.timer.duration_seconds);
    } else {
      setCountdown(null);
    }
  }, [index]);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const next = prev > 0 ? prev - 1 : 0;
        if (next === 0) {
          const audio = new Audio('/bell.mp3');
          audio.play().catch(() => {});
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const next = () => {
    if (countdown > 0) return;
    if (index < total - 1) setIndex(index + 1);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>{deck.name}</span>
        <span>Step {index + 1} of {total}</span>
      </div>

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <p className="text-lg leading-relaxed">{prompt.text}</p>
      </div>

      {countdown !== null && (
        <div className="mb-4">
          <p className="text-sm italic text-gray-500">⏱ {countdown} second{countdown !== 1 ? 's' : ''} remaining</p>
        </div>
      )}

      {prompt.expect_user_speech && (
        <div className="mb-4">
          <p className="text-sm text-blue-600">🎤 Say something aloud to continue...</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <button onClick={onExit} className="text-sm text-gray-500 underline">← Back</button>
        <button
          onClick={next}
          disabled={countdown !== null && countdown > 0 || index >= total - 1}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}