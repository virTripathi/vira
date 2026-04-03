import { useState, useEffect } from "react";
import useChatListener from "./useChatListener";
import axios from "axios";

function getNextMidnightPT() {
    const now = new Date();
    const tzString = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const localOfPt = new Date(tzString);
    const nextMidnight = new Date(localOfPt);
    nextMidnight.setHours(24, 0, 0, 0);
    const diffMs = nextMidnight.getTime() - localOfPt.getTime();
    return now.getTime() + diffMs;
}

export function useChatManager(chatId, userId, initialChats = null, defaultQuestions = []) {
  const [chats, setChats] = useState(
    initialChats?.length
      ? initialChats
      : [{ user: "system", message: "Hey, how may I help you today?" }]
  );
  const [questions, setQuestions] = useState(defaultQuestions);
  const [isAnswerPending, setIsAnswerPending] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [quotaRecoveryMessage, setQuotaRecoveryMessage] = useState(null);

  useEffect(() => {
    const lastMsg = chats.length > 0 ? chats[chats.length - 1].message : "";
    if (lastMsg === "The AI quota for today has been expired.") {
      if (!localStorage.getItem("ai_quota_reset_time")) {
        const resetTime = getNextMidnightPT();
        localStorage.setItem("ai_quota_reset_time", resetTime.toString());
      }
    }

    const checkQuota = () => {
      const resetTimeStr = localStorage.getItem("ai_quota_reset_time");
      if (resetTimeStr) {
        const resetTime = parseInt(resetTimeStr, 10);
        const now = Date.now();
        if (now >= resetTime) {
          localStorage.removeItem("ai_quota_reset_time");
          setQuotaRecoveryMessage(null);
        } else {
          const diffMs = resetTime - now;
          const hours = Math.floor(diffMs / (1000 * 60 * 60));
          const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
          setQuotaRecoveryMessage(
              `The AI quota is expired. It will recover in ${hours}h ${mins}m.`
          );
        }
      } else {
        setQuotaRecoveryMessage(null);
      }
    };

    checkQuota();
    const interval = setInterval(checkQuota, 10000); // Check every 10 seconds to keep display active
    return () => clearInterval(interval);
  }, [chats]);

  const onQuestionSend = async (inputString, { setChats, setIsAnswerPending, setInputDisabled }) => {
    var route = `/api/v1/chats`
    if(chatId) {
      route = `/api/v1/chats/${chatId}/question`;
    }
    try {
      await axios.post(route, {
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
    setChats((prev) => [...prev, { user: "user", message: inputString, id: `u_${Date.now()}` }]);

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
    console.log(answer);
    console.log(chats);
    setChats((prev) => [...prev, { user: "system", message: answer, id: `s_${Date.now()}` }]);
    console.log("chats updated:",chats);
    setIsAnswerPending(false);
    setInputDisabled(false);
  };

  useChatListener(userId, (data) => {
    handleNewAnswer(data.answer ?? data);
  });

  const isQuotaExpired = quotaRecoveryMessage !== null;

  return {
    chats,
    questions,
    isAnswerPending,
    inputDisabled: inputDisabled || isQuotaExpired,
    isQuotaExpired,
    quotaRecoveryMessage,
    handleInput,
    addQuestion,
    handleNewAnswer,
  };
}