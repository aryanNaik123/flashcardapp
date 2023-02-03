import React, { useState } from "react";

const Flashcard = ({ flashcard, onAnswer, onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">{flashcard.question}</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white p-2"
        onClick={onAnswer}
      >
        Show Answer
      </button>
      {flashcard.showAnswer && (
        <div className="text-xl font-bold mt-4">{flashcard.answer}</div>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 mt-4"
        onClick={onNext}
      >
        Next Card
      </button>
    </div>
  );
};

const FlashcardAddForm = ({ onAdd }) => {
  const [flashcard, setFlashcard] = useState({ question: "", answer: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd(flashcard);
    setFlashcard({ question: "", answer: "" });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="question"
            placeholder="Question"
            value={flashcard.question}
            onChange={(event) =>
              setFlashcard({ ...flashcard, question: event.target.value })
            }
            className="border border-gray-400 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="answer"
            placeholder="Answer"
            value={flashcard.answer}
            onChange={(event) =>
              setFlashcard({ ...flashcard, answer: event.target.value })
            }
            className="border border-gray-400 p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white p-2"
        >
          Add Flashcard
        </button>
      </form>
    </div>
  );
};

const FlashcardApp = () => {
  const [flashcards, setFlashcards] = useState([{ question: "", answer: "" }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAdd = (flashcard) => {
    setFlashcards([...flashcards, flashcard]);
  };

  const handleAnswer = () => {
    setFlashcards(
      flashcards.map((flashcard, index) => {
        if (index === currentIndex) {
          return { ...flashcard, showAnswer: !flashcard.showAnswer };
        }
        return flashcard;
      })
    );
  };

  const handleNext = () => {
    if (currentIndex === flashcards.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Flashcard
        flashcard={flashcards[currentIndex]}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
      <FlashcardAddForm onAdd={handleAdd} />
    </div>
  );
};

export default FlashcardApp;
