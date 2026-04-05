import { useState, useEffect, useRef, useCallback } from "react";

interface CookModeProps {
  steps: string[];
  stepTimers?: number[];
  stepTips?: string[];
  onClose: () => void;
}

const CookMode = ({ steps, stepTimers, stepTips, onClose }: CookModeProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [defaultTime] = useState(() =>
    steps.map((_, i) => (stepTimers && stepTimers[i] ? stepTimers[i] : 5 * 60))
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const isLastStep = currentStep === steps.length - 1;
  const isDone = completedSteps.size === steps.length;

  // Wake Lock
  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
        }
      } catch (e) {
        console.log("Wake Lock not supported or denied");
      }
    };
    requestWakeLock();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") requestWakeLock();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      wakeLockRef.current?.release();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Timer
  useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerRunning, timerSeconds]);

  // Reset timer when step changes
  useEffect(() => {
    setTimerRunning(false);
    setTimerSeconds(defaultTime[currentStep]);
  }, [currentStep, defaultTime]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const goNext = useCallback(() => {
    setCompletedSteps((prev) => new Set(prev).add(currentStep));
    if (isLastStep) {
      onClose();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, isLastStep, onClose]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  }, [currentStep]);

  const toggleTimer = () => {
    if (timerSeconds === 0) {
      setTimerSeconds(defaultTime[currentStep]);
    }
    setTimerRunning((prev) => !prev);
  };

  // Extract a short title from step text (first few words)
  const getStepTitle = (step: string) => {
    const words = step.split(" ").slice(0, 3).join(" ");
    return words.length < step.length ? words : step;
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-primary">
        <button
          onClick={onClose}
          className="flex items-center justify-center w-9 h-9 rounded-full text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
        <h2 className="text-base font-bold text-primary-foreground">রান্নার মোড</h2>
        <div className="w-9" />
      </div>

      {/* Progress Dots */}
      <div className="flex flex-col items-center pt-5 pb-2 gap-2">
        <div className="flex gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                completedSteps.has(idx)
                  ? "bg-primary border-primary"
                  : idx === currentStep
                  ? "bg-transparent border-primary"
                  : "bg-muted border-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          ধাপ {currentStep + 1} / {steps.length}
        </p>
      </div>

      {/* Step Card */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm mt-4" style={{ borderLeft: "3px solid hsl(var(--primary))" }}>
            <div className="p-5 sm:p-6">
              <h3 className="text-lg font-bold mb-3">{getStepTitle(steps[currentStep])}</h3>
              <p className="text-sm sm:text-base leading-relaxed text-foreground">
                {steps[currentStep]}
              </p>
            </div>
          </div>

          {/* Tip */}
          {stepTips && stepTips[currentStep] && (
            <div className="bg-accent/30 border border-accent rounded-xl p-4 mt-3 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl mt-0.5 shrink-0">lightbulb</span>
              <div>
                <p className="text-xs font-bold text-primary mb-0.5">টিপস</p>
                <p className="text-sm leading-relaxed text-foreground">{stepTips[currentStep]}</p>
              </div>
            </div>
          )}

          {/* Timer */}
          <div className="bg-card border border-border rounded-xl p-4 mt-4 flex items-center justify-between shadow-sm">
            <span className="text-sm font-medium text-muted-foreground">প্রস্তাবিত সময়</span>
            <span className={`text-3xl font-bold tabular-nums ${timerRunning && timerSeconds <= 10 ? "text-destructive" : "text-foreground"}`}>
              {formatTime(timerSeconds)}
            </span>
            <button
              onClick={toggleTimer}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                timerRunning
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              <span className="material-symbols-outlined filled-icon">
                {timerRunning ? "pause" : "skillet"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="px-4 sm:px-6 pb-6 pt-3 border-t border-border bg-background">
        <div className="max-w-lg mx-auto flex gap-3">
          <button
            onClick={goPrev}
            disabled={currentStep === 0}
            className="flex-1 py-3.5 rounded-xl border-2 border-primary text-primary font-bold text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/5"
          >
            ← আগের ধাপ
          </button>
          <button
            onClick={goNext}
            className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-colors hover:bg-primary/90"
          >
            {isLastStep ? "রান্না সম্পন্ন! ✓" : "পরের ধাপ →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookMode;
