import { useEffect, useState } from "react";
import axios from 'axios';

export const useQuestionData = () => {
    const [question, setQuestion] = useState({});

    useEffect(() => {
      axios.get("http://127.0.0.1:8000/question/")
        .then(response => {
          setQuestion(response.data);
        });
    }, []);
  
    return question;
  };