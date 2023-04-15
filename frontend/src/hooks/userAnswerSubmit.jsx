import { useState } from "react";

const useAnswerSubmit = () => {
  const [response, setResponse] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const submitAnswer = async (answer) => {
    try {
      const response = await fetch('http://localhost:80/answer/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({answer}),
      });

      const data = await response.json();
      setResponse(data.success || data.error);
      setShowAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  return { response, showAlert, submitAnswer };
};

export default useAnswerSubmit;
