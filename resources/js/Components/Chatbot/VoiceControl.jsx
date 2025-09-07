import { useChatManager } from "@/hooks/useChatManager";
import ChatArea from "./ChatArea";
import InputForm from "./InputForm";
import Header from "./Header";

export default function VoiceControl({ className, onClick, defaultQuestions = [], onMessageSend }) {
  const {
    chats, questions, isAnswerPending, inputDisabled,
    handleInput, addQuestion, handleNewAnswer
  } = useChatManager(defaultQuestions);

  return (
    <div className={`transition-opacity ${className}`}>
      <div className="relative flex flex-col rounded-xl">
        <Header onClick={onClick} />
        <ChatArea
          chats={chats}
          defaultQuestions={questions}
          addQuestion={addQuestion}
          isAnswerPending={isAnswerPending}
          onNewAnswer={handleNewAnswer}
          className={'chat-area overflow-y-auto w-inherit max-w-96 h-60 min-h-60'}
        />
        <InputForm onSubmit={handleInput} disabled={inputDisabled} />
      </div>
    </div>
  );
}