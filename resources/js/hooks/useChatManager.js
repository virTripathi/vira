import { useState } from "react";
import useChatListener from "./useChatListener";

export function useChatManager(userId, initialChats = null, defaultQuestions = []) {
  const [chats, setChats] = useState(
    initialChats?.length
      ? initialChats
      : [{ user: "system", message: "Hey, how may I help you today?" }]
  );
  const [questions, setQuestions] = useState(defaultQuestions);
  const [isAnswerPending, setIsAnswerPending] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const handleInput = async (inputString, onMessageSend) => {
    setChats((prev) => [...prev, { user: "user", message: inputString }]);

    if (onMessageSend) {
      await onMessageSend(inputString, { setChats, setIsAnswerPending, setInputDisabled });
    }

    setQuestions([]);
    setInputDisabled(true);
    setIsAnswerPending(true);
  };

  const addQuestion = (id) => {
    const q = questions.find((q) => q.id === id);
    if (q) handleInput(q.question);
  };

  const handleNewAnswer = (answer) => {
    setChats((prev) => [...prev, { user: "system", message: answer }]);
    setIsAnswerPending(false);
    setInputDisabled(false);
  };

  useChatListener(userId, (data) => {
    handleNewAnswer(data.answer ?? data);
  });

  return {
    chats,
    questions,
    isAnswerPending,
    inputDisabled,
    handleInput,
    addQuestion,
    handleNewAnswer,
  };
}