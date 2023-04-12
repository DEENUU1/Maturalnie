import React, { useState } from "react";
import { useQuestionData } from "../hooks/RandomQuestionHook";
import EquationComponent  from "../components/mathFormularFormater";

const QuestionPage = () => {
    const questionData = useQuestionData();
    const [answer, setAnswer] = useState('');
    const [response, setResponse] = useState(null);

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
    
    const handleButtonClick = (value) => {
      setAnswer(answer + value);
    };

    return (
        <div>
        <h3>{questionData.description}</h3>
        <EquationComponent equation={questionData.question} />
        
    <form onSubmit={handleSubmit}>
      <label>Symbols </label>
      <button onClick={() => handleButtonClick("\sqrt")}><EquationComponent equation="√" /></button>
      <button onClick={() => handleButtonClick("\\frac{x}{y}")}><EquationComponent equation="\frac{x}{y}" /></button>
      <button onClick={() => handleButtonClick("+")}><EquationComponent equation="+" /></button>
      <button onClick={() => handleButtonClick("-")}><EquationComponent equation="-" /></button>
      <button onClick={() => handleButtonClick("/")}><EquationComponent equation="/" /></button>
      <button onClick={() => handleButtonClick("*")}><EquationComponent equation="*" /></button>
      <button onClick={() => handleButtonClick("^2")}><EquationComponent equation="^2" /></button>
      <button onClick={() => handleButtonClick("^3")}><EquationComponent equation="^3" /></button>

      <br></br>
      <br></br>
      <label>Answer:</label>
      <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button type="submit">Submit</button>
      {response && <p>{response}</p>}
    </form>
        </div>
    )   
}

export default QuestionPage;