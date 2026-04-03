import { useState, useEffect, useRef } from "react";
import SendIcon from "../Icons/SendIcon";
import Microphone from "../Icons/Microphone";
import CloseMicrophoneIcon from "../Icons/CloseMicrophoneIcon";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

export default function InputForm({ onSubmit, disabled, isQuotaExpired, quotaRecoveryMessage }) {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
        useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        console.log("Browser does not support speech recognition");
        return null;
    }

    const [isListening, setIsListening] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const silenceTimer = useRef(null);
    const inputRef = useRef(null);

    const submitAndClear = (value) => {
        if (value && value.trim() !== "") {
            onSubmit(value.trim());
            setInputValue("");
            SpeechRecognition.stopListening();
            setIsListening(false);
            resetTranscript();
        }
    };

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        setIsListening(false);
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
            setIsListening(true);
        }
    };

    const resetSilenceTimer = () => {
        if (silenceTimer.current) clearTimeout(silenceTimer.current);
        silenceTimer.current = setTimeout(() => {
            submitAndClear(transcript);
            stopListening();
        }, 2000);
    };

    useEffect(() => {
        setInputValue(transcript);
        if (transcript && isListening) resetSilenceTimer();
    }, [transcript, isListening]);

    useEffect(() => {
        return () => {
            if (silenceTimer.current) clearTimeout(silenceTimer.current);
        };
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submitAndClear(inputValue);
        }
    };

    return (
        <form
            className="px-4 pb-4 pt-2"
            onSubmit={(e) => { e.preventDefault(); submitAndClear(inputValue); }}
        >
            {isQuotaExpired && (
                <div className="text-center text-xs text-red-500 mb-2 font-medium tracking-wide">
                    {quotaRecoveryMessage || "The AI quota for today has been expired."}
                </div>
            )}
            <div className="chat-input-wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none border-none focus:ring-0 min-w-0"
                    placeholder="Ask me anything…"
                    readOnly={disabled}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button
                    className="chat-send-btn"
                    type="submit"
                    disabled={disabled ?? false}
                    aria-label="Send message"
                >
                    <SendIcon className="h-3.5 w-3.5" color="white" />
                </button>

                <button
                    className={`chat-mic-btn ${isListening ? "listening" : ""}`}
                    type="button"
                    onClick={toggleListening}
                    disabled={disabled ?? false}
                    aria-label={isListening ? "Stop listening" : "Start voice input"}
                >
                    {isListening ? (
                        <CloseMicrophoneIcon className="h-3.5 w-3.5" color="white" />
                    ) : (
                        <Microphone className="h-3.5 w-3.5" color="white" />
                    )}
                </button>
            </div>
        </form>
    );
}
