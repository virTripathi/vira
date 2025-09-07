import InputForm from "./InputForm";
import ChatArea from "./ChatArea";
import { useChatManager } from "@/hooks/useChatManager";

export default function UserChatPage({ userId, defaultQuestions = [], className }) {
  const {
    chats, questions, isAnswerPending, inputDisabled,
    handleInput, addQuestion, handleNewAnswer
  } = useChatManager(userId, defaultQuestions);

  return (
    <div className={className}>
      <main className="flex-1 overflow-y-auto">
        <ChatArea
          chats={chats}
          defaultQuestions={questions}
          addQuestion={addQuestion}
          isAnswerPending={isAnswerPending}
          onNewAnswer={handleNewAnswer}
        />
      </main>
      <footer className="p-4">
        <InputForm onSubmit={handleInput} disabled={inputDisabled} />
      </footer>
    </div>
  );
}