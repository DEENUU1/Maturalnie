import React, { useState } from "react";
import { useQuestionData } from "../hooks/RandomQuestionHook";
import EquationComponent  from "../components/mathFormularFormater";
import NavigationBar from "../components/NavigationBar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import { BsFillSendCheckFill } from "react-icons/bs";
import Alert from "react-bootstrap/Alert";
import MathButtons from "../components/MathButtons";

const QuestionPage = () => {
    const questionData = useQuestionData();
    const [answer, setAnswer] = useState('');
    const [response, setResponse] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await fetch('http://127.0.0.1:8000/answer/', {
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
    


    return (
        <>
        <NavigationBar/>
        {showAlert && (
          <Alert variant={response === "Correct answer" ? "success" : "danger"} dismissible="true">
            <Alert.Heading className="text-center">{response}</Alert.Heading>
          </Alert>
        )}

        <Container className="w-60 px-3 mx-auto border border-dark" style={{ maxWidth: "500px", backgroundColor: "white", marginTop: "75px"}}>

          <Card className="mb-5 mt-5 text-center" border="dark" >
            <Card.Header>{questionData.description}</Card.Header>
            <Card.Body><EquationComponent equation={questionData.question} /></Card.Body>
          </Card>

          <Form className="mb-5" onSubmit={handleSubmit}>
            <Form.Label></Form.Label>
            <InputGroup>
              <Form.Control style={{textAlign: "center"}} type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
              <Button variant="dark" type="submit"><BsFillSendCheckFill/></Button>
            </InputGroup>  
          </Form>
          
          <MathButtons answer={answer} setAnswer={setAnswer}/>

        </Container>
        </>
    )   
}

export default QuestionPage;