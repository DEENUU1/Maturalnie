import { useState } from "react";


export const usePostAnswer = () => {
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    async function postAnswer(answer) {
      const response = await fetch('http://127.0.0.1:8000/answer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer }),
      });
      if (response.ok) {
        setError(null);
        const data = await response.json();
        setResponse(data.message);
      } else {
        const data = await response.json();
        setError(data);
      }
    }
  
    return [error, response, postAnswer ];
  }