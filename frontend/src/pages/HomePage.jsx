import React, { useState } from "react";
import { useQuestionData } from "../hooks/RandomQuestionHook";
import { usePostAnswer } from "../hooks/UsersAnswerHook";


const QuestionPage = () => {
    const questionData = useQuestionData();
    const [answer, setAnswer] = useState('');
    const [response, setResponse] = useState(null);
    // const [answer, setAnswer] = useState("");
    // const [error, response, postAnswer] = usePostAnswer();

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     postAnswer(answer);
    // };
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const res = await fetch('http://127.0.0.1:8000/answer/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({answer}),
          });
    
          const data = await res.json();
          setResponse(data.message);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div>
        <h2>{questionData.question}</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Answer:
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
      {response && <p>{response}</p>}
    </form>
        </div>
    )   
}

export default QuestionPage;