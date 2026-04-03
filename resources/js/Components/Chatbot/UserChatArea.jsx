import InputForm from "./InputForm";
import ChatArea from "./ChatArea";
import { useChatManager } from "@/hooks/useChatManager";

export default function UserChatArea({ chatId, userId, initialChats, defaultQuestions = [], className }) {
  const {
    chats, questions, isAnswerPending, inputDisabled, isQuotaExpired, quotaRecoveryMessage,
    handleInput, addQuestion, handleNewAnswer
  } = useChatManager(chatId, userId, initialChats, defaultQuestions);

  return (
    <div
      className={`${className ?? ""} flex flex-col mx-auto w-full md:max-w-[85%] lg:max-w-4xl xl:max-w-5xl px-2 lg:px-0`}
      style={{
        height: "calc(100vh - 64px)",
      }}
    >
      {/* Chat Title Bar */}
      <div className="px-4 pt-5 pb-2 flex-shrink-0">
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "inherit",
            opacity: 0.8,
            letterSpacing: "0.01em",
          }}
        >
          💬 Chat with VIRA
        </h2>
      </div>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto py-2">
        <ChatArea
          chats={chats}
          questions={questions}
          addQuestion={addQuestion}
          isAnswerPending={isAnswerPending}
          isQuotaExpired={isQuotaExpired}
        />
      </main>

      {/* Input */}
      <footer className="flex-shrink-0 pb-2">
        <InputForm onSubmit={handleInput} disabled={inputDisabled} isQuotaExpired={isQuotaExpired} quotaRecoveryMessage={quotaRecoveryMessage} />
      </footer>
    </div>
  );
}