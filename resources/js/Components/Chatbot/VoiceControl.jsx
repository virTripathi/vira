import { useState } from "react";
import { usePage } from '@inertiajs/react';
import Header from "./Header";
import ChatArea from "./ChatArea";
import InputForm from "./InputForm";
import axios from "axios";

export default function VoiceControl({ className, onClick }) {
    const [chats, setChats] = useState([
        {
            user: "system",
            message: "Hey, how may I help you today?",
        },
    ]);
    const [isAnswerPending, setIsAnswerPending] = useState(false);
    const [defaultQuestions, setDefaultQuestions] = useState([
        {
            id: 1,
            question: "Tell me about today's weather",
        },
        {
            id: 2,
            question: "Create a new Task",
        },
    ]);
    const [inputDisabled, setInputDisabled] = useState(false);

    const handleInput = (inputString) => {
        setChats((prevChats) => [
            ...prevChats,
            { user: "user", message: inputString },
        ]);

        axios
            .post("api/v1/chats", { data: inputString })
            .then(() => {
                // request sent, answer will come via Echo
            })
            .catch((e) => {
                console.log("error:" + e);
            });

        setDefaultQuestions([]);
        setInputDisabled(true);
        setIsAnswerPending(true);
    };

    const addQuestion = (id) => {
        const question = defaultQuestions.find((q) => q.id === id);
        if (question) {
            handleInput(question.question);
        }
    };

    const handleNewAnswer = (data) => {
        console.log(data.answer);
        setChats((prev) => [...prev, { user: "system", message: data.answer.answer }]);
        setIsAnswerPending(false);
        setInputDisabled(false);
    };

    const { auth } = usePage().props;
    const userId = auth?.user?.id;

    return (
        <div className={`transition-opacity ${className}`}>
            <div className="relative flex flex-col rounded-xl bg-white">
                <Header onClick={onClick} />

                <ChatArea
                    chats={chats}
                    defaultQuestions={defaultQuestions}
                    addQuestion={addQuestion}
                    isAnswerPending={isAnswerPending}
                    userId={userId}
                    onNewAnswer={handleNewAnswer}
                />

                <InputForm onSubmit={handleInput} disabled={inputDisabled} />
            </div>
        </div>
    );
}