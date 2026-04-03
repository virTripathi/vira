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
    <div className={`voice-widget transition-opacity mb-3 ${className ?? ""}`}>
      <div className="relative flex flex-col" style={{ width: "22rem", maxWidth: "90vw" }}>
        <Header onClick={onClick} />
        <ChatArea
          chats={chats}
          questions={questions}
          addQuestion={addQuestion}
          isAnswerPending={isAnswerPending}
          onNewAnswer={handleNewAnswer}
          className="overflow-y-auto"
          style={{ height: "240px" }}
        />
        <InputForm onSubmit={handleInput} disabled={inputDisabled} />
      </div>
    </div>
  );
}