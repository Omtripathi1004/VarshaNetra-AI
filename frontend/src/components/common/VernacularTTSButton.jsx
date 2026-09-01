import React, { useState, useEffect, useCallback } from 'react';

/**
 * VernacularTTSButton
 * Single-tap Vernacular Text-to-Speech audio reader using browser Web Speech API.
 * Supports Hindi (hi-IN) and Indian English (en-IN / en-US) with visual pulse animation.
 */
export default function VernacularTTSButton({
  textHindi,
  textEnglish,
  lang = 'en',
  labelHi = 'आवाज़ में सुनें',
  labelEn = 'Listen Voice Advisory',
  size = 'md',
  className = '',
  style = {},
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speakText = useCallback(() => {
    if (!isSupported) return;

    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // cancel previous utterance

      const isHindi = lang === 'hi';
      const textToSpeak = isHindi ? (textHindi || textEnglish) : (textEnglish || textHindi);
      if (!textToSpeak) return;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = isHindi ? 'hi-IN' : 'en-IN';
      utterance.rate = isHindi ? 0.92 : 0.98; // slightly slower for rural clarity
      utterance.pitch = 1.0;

      // Select best voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        if (isHindi) {
          const hiVoice = voices.find(v => v.lang.includes('hi') || v.name.includes('Hindi') || v.name.includes('Lekha'));
          if (hiVoice) utterance.voice = hiVoice;
        } else {
          const inVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India') || v.name.includes('Rishi'));
          if (inVoice) utterance.voice = inVoice;
        }
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      setIsSpeaking(false);
    }
  }, [isSupported, isSpeaking, lang, textHindi, textEnglish, stopSpeaking]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [stopSpeaking]);

  if (!isSupported) return null;

  const isSmall = size === 'sm';

  return (
    <button
      type="button"
      onClick={speakText}
      className={`vernacular-tts-btn ${isSpeaking ? 'speaking' : ''} ${className}`}
      title={lang === 'hi' ? 'आवाज़ में सुनें' : 'Listen with Audio Voice-Over'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSmall ? '0.3rem' : '0.45rem',
        padding: isSmall ? '0.25rem 0.6rem' : '0.4rem 0.85rem',
        borderRadius: '999px',
        fontSize: isSmall ? '0.72rem' : '0.8rem',
        fontWeight: 700,
        cursor: 'pointer',
        border: isSpeaking ? '1px solid #10b981' : '1px solid rgba(16, 185, 129, 0.4)',
        background: isSpeaking ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.12)',
        color: '#34d399',
        transition: 'all 0.2s ease',
        boxShadow: isSpeaking ? '0 0 14px rgba(16, 185, 129, 0.5)' : 'none',
        ...style,
      }}
    >
      <span style={{ fontSize: isSmall ? '0.9rem' : '1.05rem', display: 'flex', alignItems: 'center' }}>
        {isSpeaking ? '🔊' : '🔈'}
      </span>
      <span>
        {isSpeaking
          ? (lang === 'hi' ? 'बोल रहा है...' : 'Speaking...')
          : (lang === 'hi' ? labelHi : labelEn)}
      </span>
      {isSpeaking && (
        <span className="audio-wave-anim" style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', height: '12px' }}>
          <span className="wave-bar bar1" />
          <span className="wave-bar bar2" />
          <span className="wave-bar bar3" />
        </span>
      )}
    </button>
  );
}
