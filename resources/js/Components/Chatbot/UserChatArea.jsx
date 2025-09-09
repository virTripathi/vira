import InputForm from "./InputForm";
import ChatArea from "./ChatArea";
import { useChatManager } from "@/hooks/useChatManager";

export default function UserChatArea({ userId, initialChats, defaultQuestions = [], className }) {
  const {
    chats, questions, isAnswerPending, inputDisabled,
    handleInput, addQuestion, handleNewAnswer
  } = useChatManager(userId, initialChats, defaultQuestions);

  return (
    <div className={className}>
      <main className="flex-1 overflow-y-auto">
        <ChatArea
          chats={chats}
          questions={questions}
          addQuestion={addQuestion}
          isAnswerPending={isAnswerPending}
        />
      </main>
      <footer className="p-4">
        <InputForm onSubmit={handleInput} disabled={inputDisabled} />
      </footer>
    </div>
  );
}