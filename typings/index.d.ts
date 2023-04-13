declare namespace HomePage {
  type ModalProps = {
    type: "login" | "register" | "forget";
    visible: boolean;
  };
}

declare namespace Context {
  type LoginModalProps = {
    modal: HomePage.ModalProps;
    setModal: React.Dispatch<React.SetStateAction<HomePage.ModalProps>>;
  };

  type TokenProps = {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
  };
}

export type Question = {
  question: string;
  answer: Record<"A" | "B" | "C" | "D", string>;
  id: string;
  correctAnswer: string;
};

export type SubmitQuestion = Pick<Question, "id" | "answer">;

export type CheckAnswerParams = {
  quesionLists: SubmitQuestion[];
  userId: string;
};

export type CheckedResult = {
  id: string;
  isCorrect: boolean;
};
