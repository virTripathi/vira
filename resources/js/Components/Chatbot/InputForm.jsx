import { useState, useEffect, useRef } from "react";
import SendIcon from "../Icons/SendIcon";
import Microphone from "../Icons/Microphone";
import CloseMicrophoneIcon from "../Icons/CloseMicrophoneIcon";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

export default function InputForm({ onSubmit, disabled }) {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
        useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        console.log("Browser does not support speech recognition");
        return null;
    }

    const [isListening, setIsListening] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const silenceTimer = useRef(null);

    const submitAndClear = (inputValue) => {
        if (inputValue && inputValue !== "") {
            onSubmit(inputValue);
            setInputValue("");
            SpeechRecognition.stopListening();
            setIsListening(false);
            resetTranscript();
        }
    };

    const startListening = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: "en-IN",
        });
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
        if (silenceTimer.current) {
            clearTimeout(silenceTimer.current);
        }  
        silenceTimer.current = setTimeout(() => {
        
            submitAndClear(transcript);
            stopListening();
        }, 2000);
    };

    useEffect(() => {
        setInputValue(transcript);
        if (transcript && isListening) {
            resetSilenceTimer();
        }
    }, [transcript, isListening]);

    useEffect(() => {
        return () => {
            if (silenceTimer.current) {
                clearTimeout(silenceTimer.current);
            }
        };
    }, []);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 p-4">
            <div className="mb-1 flex gap-2 justify-center items-center">
                <div className="w-full max-w-sm min-w-[200px]">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border border-gray-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-300 shadow-sm focus:shadow"
                            placeholder="Enter your text"
                            readOnly={disabled}
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <button
                            className="bg-gray-800 absolute right-1 top-1 rounded bg-black p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-gray-700 focus:shadow-none active:bg-gray-700 hover:bg-gray-700 active:shadow-none disabled:cursor-not-allowed"
                            type="button"
                            disabled={disabled ?? false}
                            onClick={() => submitAndClear(inputValue)}
                        >
                            <SendIcon
                                className="h-4 w-4"
                                color="white"
                            />
                        </button>
                    </div>
                </div>
                <button
                    className="bg-gray-800 rounded bg-black p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-gray-700 focus:shadow-none active:bg-gray-700 hover:bg-gray-700 active:shadow-none disabled:cursor-not-allowed"
                    type="button"
                    onClick={toggleListening}
                    disabled={disabled ?? false}
                >
                    {isListening ? (
                        <CloseMicrophoneIcon
                            className="h-4 w-4"
                            color="white"
                        />
                    ) : (
                        <Microphone
                            className="h-4 w-4"
                            color="white"
                        />
                    )}
                </button>
            </div>
        </form>
    );
}
