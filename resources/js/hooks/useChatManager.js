import { useState } from "react";
import useChatListener from "./useChatListener";
import axios from "axios";

export function useChatManager(chatId, userId, initialChats = null, defaultQuestions = []) {
  const [chats, setChats] = useState(
    initialChats?.length
      ? initialChats
      : [{ user: "system", message: "Hey, how may I help you today?" }]
  );
  const [questions, setQuestions] = useState(defaultQuestions);
  const [isAnswerPending, setIsAnswerPending] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const onQuestionSend = async (inputString, { setChats, setIsAnswerPending, setInputDisabled }) => {
    try {
      await axios.post(`/api/v1/chats/${chatId}/question`, {
        question: inputString,
      });
    } catch (error) {
      console.error("❌ Failed to send message:", error);
      setChats((prev) => [...prev, { user: "system", message: "⚠️ Failed to send message" }]);
      setIsAnswerPending(false);
      setInputDisabled(false);
    }
  };

  const handleInput = async (inputString) => {
    setChats((prev) => [...prev, { user: "user", message: inputString }]);

    setQuestions([]);
    setInputDisabled(true);
    setIsAnswerPending(true);
    await onQuestionSend(inputString, { setChats, setIsAnswerPending, setInputDisabled });
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