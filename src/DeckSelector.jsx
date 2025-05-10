import React, { useState } from 'react';
import SessionPlayer from './SessionPlayer';

const decks = [
  {
    name: 'Muse Sample Deck',
    prompts: [
      { text: 'Welcome to your Muse session.' },
      { text: 'Take a breath in. And out.', timer: { duration_seconds: 5 } },
      { text: 'Say “next” when you are ready to continue.', expect_user_speech: true }
    ]
  },
  {
    name: 'Gentle Yoga: Restore and Reset',
    prompts: [
      { text: 'Lie down comfortably and let go of tension.' },
      { text: 'Breathe slowly. Feel the support beneath you.', timer: { duration_seconds: 10 } },
      { text: 'Gently move your fingers and toes to close.' }
    ]
  },
  {
    name: 'Centering Prayer',
    prompts: [
      { text: 'Sit in stillness. Gently close your eyes. Begin to slow your breath.' },
      { text: 'Choose a sacred word. A single word that anchors your intention.' },
      { text: 'We will now rest in silence together for two minutes.', timer: { duration_seconds: 120 } }
    ]
  },
  {
    name: 'Loving-Kindness Meditation',
    prompts: [
      { text: 'Sit quietly. Take a few deep breaths. Feel the breath enter and leave your body.' },
      { text: 'Say: “May I be safe. May I be happy. May I be free.”', expect_user_speech: true },
      { text: 'Now think of someone you love. Say the same blessing for them.', expect_user_speech: true }
    ]
  },
  {
    name: 'Jewish Bedtime Shema',
    prompts: [
      { text: 'Bring your attention to this moment. Let your day begin to settle behind you.' },
      { text: 'Silently offer forgiveness for anything unsettled today.' },
      { text: 'Whisper: “Shema Yisrael…”', expect_user_speech: true }
    ]
  },
  {
    name: 'Sufi Zikr (Remembrance)',
    prompts: [
      { text: 'Begin to breathe evenly and gently. Feel the rhythm.' },
      { text: 'Say softly: “La ilaha illa Allah.” Repeat it three times.', expect_user_speech: true },
      { text: 'Whisper: “Ya Nur” — The Light.', expect_user_speech: true }
    ]
  },
  {
    name: 'Morning Intention Prayer',
    prompts: [
      { text: 'Take three breaths. Let the breath be your invitation to wake into this day.' },
      { text: 'Say: “This day is a gift. I meet it with presence.”', expect_user_speech: true },
      { text: 'Bring to mind one thing you are grateful for.' }
    ]
  },
  {
    name: 'Eye Gazing',
    prompts: [
      { text: 'Sit facing your partner or mirror. Let your spine rise tall and your shoulders drop.' },
      { text: 'Begin to gaze gently into the eyes of the person in front of you — or your own eyes if using a mirror.' },
      { text: 'Breathe slowly. With each breath, feel more connected.', timer: { duration_seconds: 60 } },
      { text: 'If you feel discomfort, notice it without judgment. Return to the gaze when ready.' },
      { text: 'To close, offer a nod, smile, or the words “thank you.”', expect_user_speech: true }
    ]
  }
];


export default function DeckSelector() {
  const [selectedDeck, setSelectedDeck] = useState(null);

  if (selectedDeck) {
    return <SessionPlayer deck={selectedDeck} onExit={() => setSelectedDeck(null)} />;
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">Choose a Muse Experience</h1>
      <ul className="space-y-4">
        {decks.map((deck, idx) => (
          <li key={idx} className="border rounded p-4 shadow cursor-pointer hover:bg-gray-50" onClick={() => setSelectedDeck(deck)}>
            <h2 className="text-lg font-semibold">{deck.name}</h2>
            <p className="text-sm text-gray-600">{deck.prompts.length} steps</p>
          </li>
        ))}
      </ul>
    </div>
  );
}