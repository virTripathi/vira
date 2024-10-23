import { useState } from "react";
import Header from "./Header";
import ChatArea from "./ChatArea";
import InputForm from "./InputForm";
import axios from 'axios';

export default function VoiceControl({ className, onClick }) {
    const [chats, setChats] = useState([
        {
            user: 'system',
            message: 'Hey, how may I help you today?'
        }
    ]);
    const [isAnswerPending, setIsAnswerPending] = useState(false)
    const handleInput = (inputString)=> {
        setChats((prevChats) => [
            ...prevChats,
            { user: 'user', message: inputString }
        ]);
        axios.post('api/v1/chats',{data:inputString}).then(()=>{'a'}).catch((e)=>{console.log('error:'+e)});
        setDefaultQuestions([]);
        setInputDisabled(true);
        setIsAnswerPending(true);
    }
    const [defaultQuestions, setDefaultQuestions] = useState([
        {
            id: 1,
            question: "Tell me about today's weather"
        },
        {
            id: 2,
            question: "Create a new Task"
        }
    ]);
    const [inputDisabled, setInputDisabled] = useState(false);

    const addQuestion = (id) => {
        const question = defaultQuestions.find((q) => q.id === id);
        if(question) {
            handleInput(question.question);
        }
    }
  return (
    <div className={`transition-opacity ${className}`}>
      <div className="relative flex flex-col rounded-xl bg-white">
        <Header onClick={onClick} />
        <ChatArea chats={chats} defaultQuestions={defaultQuestions} addQuestion={addQuestion} isAnswerPending={isAnswerPending}/>
        <InputForm onSubmit={handleInput} disabled={inputDisabled}/>
      </div>
    </div>
  );
}
