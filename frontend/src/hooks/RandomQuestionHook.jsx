import { useEffect, useState } from "react";
import axios from 'axios';


export const useQuestionData = () => {
    const [question, setQuestion] = useState({});
    useEffect(() => {
      axios.get('http://localhost:80/question/', {
        headers: {
          token: `${process.env.REACT_APP_TOKEN}`
        }
      })
        .then(response => {
          setQuestion(response.data);
        });
    }, []);
    
    return question;
  };