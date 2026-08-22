"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Square } from "lucide-react";
import { voiceKeywordVectors } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { DepthButton } from "@/components/ui/depth-button";

export function MicrophoneRoom({ leaderName }: { leaderName?: string }) {
  const { mode } = useMode();
  const [supported, setSupported] = useState(true);
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setSupported(false);
      return;
    }
    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-NG";

    recognition.onresult = (event: SpeechRecognitionResultEvent) => {
      let combined = "";
      for (let i = 0; i < event.results.length; i++) {
        combined += event.results[i][0].transcript + " ";
      }
      setTranscript(combined.trim());
    };

    recognition.onend = () => setRecording(false);
    recognitionRef.current = recognition;
  }, []);

  function toggleRecording() {
    if (!recognitionRef.current) return;
    if (recording) {
      recognitionRef.current.stop();
      setRecording(false);
    } else {
      recognitionRef.current.start();
      setRecording(true);
    }
  }

  const matchedKeywords = voiceKeywordVectors.filter((kw) =>
    transcript.toLowerCase().includes(kw)
  );

  return (
    <motion.section
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-14 overflow-hidden border-t border-white/20 pt-10"
    >
      <span className="ledger-index text-[12px] text-forest-500">{mode === "cruise" ? "Mic don open" : "Microphone unlocked"}</span>
      <h2 className="mt-3 font-display text-2xl font-medium text-white">
        {mode === "cruise" ? "You get more gist?" : "Have more to say?"}
      </h2>
      <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white/75">
        {mode === "cruise"
          ? `You get more gist about ${leaderName ?? "the person wey you drag"}? Talk am. Press the mic, we go turn am to text. No audio dey saved.`
          : `If you have more to say about ${leaderName ?? "the official you graded"}, talk it here. Speech is transcribed locally; no audio is stored.`}
      </p>

      {!supported ? (
        <p className="mt-6 text-[13px] text-white/65">
{mode === "cruise" ? "Your browser no support voice. Try Chrome or Edge." : "Voice transcription is not supported in this browser. Try Chrome or Edge."}
        </p>
      ) : (
        <div className="mt-6">
          <DepthButton onClick={toggleRecording} className={recording ? "!bg-[linear-gradient(180deg,#d97462_0%,#9c3b30_100%)]" : ""}>
            {recording ? <Square size={14} /> : <Mic size={14} />}
            {recording ? (mode === "cruise" ? "Stop" : "Stop recording") : (mode === "cruise" ? "Talk am" : "Start recording")}
          </DepthButton>

          <div className="mt-6 min-h-24 border border-line bg-paper-raised px-4 py-4">
            <p className="text-[14px] leading-relaxed text-ink">
              {transcript || (
                <span className="text-ink-muted">{mode === "cruise" ? "Wetin you talk go show here." : "Your words will appear here as you speak."}</span>
              )}
            </p>
          </div>

          {matchedKeywords.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {matchedKeywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full border border-forest-500 px-3 py-1 text-[12px] text-forest-700"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.section>
  );
}
