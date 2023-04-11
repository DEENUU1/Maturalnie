import React from "react";
import { useQuestionData } from "../hooks/RandomQuestionHook";


const QuestionPage = () => {
    const questionData = useQuestionData();

    return (
        <div>
        <h2>{questionData.question}</h2>

        </div>
    )   
}

export default QuestionPage;