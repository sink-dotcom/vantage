import { useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { Compass, Send, Sparkles, TrendingDown } from "lucide-react";

import { startCoachTour } from "@/lib/coach-tour";

type Reply = { question: string; answer: string };

const insights = [
  "Tomas has slipped two sessions in a row — a sponsor check-in usually recovers momentum faster than a reschedule.",
  "Your Thursday block is your heaviest at 4 hours. Moving one session to Wednesday would even out the week.",
  "Aisha is at 88%. Start shaping the closing session and a sustain plan so the gains hold after the programme.",
  "Daniel's engagement has fallen 29 points since intake. A shorter, more frequent cadence tends to reverse that pattern.",
];

export function CoachingNudge() {
  const [question, setQuestion] = useState("");
  const [replies, setReplies] = useState<Reply[]>([]);

  function ask(text: string) {
    const q = text.trim();
    if (!q) return;
    const answer = insights[replies.length % insights.length]!;
    setReplies((prev) => [...prev, { question: q, answer }]);
    setQuestion("");
  }

  return (
    <div id="tour-nudge" className="panel bg-lemon/55 p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4" />
        <h2 className="text-sm font-bold">Make the most out of Vantage</h2>
      </div>

      <div className="mt-3 grid gap-2">
        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={startCoachTour}
          className="flex items-center gap-2.5 rounded-md border border-foreground/15 bg-card/70 px-3 py-2.5 text-left"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-foreground/10">
            <Compass className="size-3.5" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-bold">Get a tour</span>
            <span className="block truncate text-[10px] text-muted-foreground">See what each panel does in 60 seconds</span>
          </span>
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => ask("Who needs my attention this week?")}
          className="flex items-center gap-2.5 rounded-md border border-foreground/15 bg-card/70 px-3 py-2.5 text-left"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-foreground/10">
            <TrendingDown className="size-3.5" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-bold">Review at-risk coachees</span>
            <span className="block truncate text-[10px] text-muted-foreground">2 clients are drifting off track</span>
          </span>
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {replies.map((reply, index) => (
          <motion.div
            key={`${reply.question}-${index}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-md border border-foreground/12 bg-card/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{reply.question}</p>
              <p className="mt-1 text-[11px] leading-relaxed">{reply.answer}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <form
        className="mt-3 flex items-center gap-2 rounded-md border border-foreground/15 bg-card/70 px-2.5 py-1.5"
        onSubmit={(event) => {
          event.preventDefault();
          ask(question);
        }}
      >
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask for an insight…"
          aria-label="Ask Vantage for an insight"
          className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
        />
        <button type="submit" aria-label="Send question" className="grid size-6 place-items-center rounded-full bg-foreground/10">
          <Send className="size-3" />
        </button>
      </form>
    </div>
  );
}
