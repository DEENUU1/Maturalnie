import React, { useState } from "react";
import { useQuestionData } from "../hooks/RandomQuestionHook";
import EquationComponent  from "../components/MathFormularFormater";
import NavigationBar from "../components/NavigationBar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import { BiSend } from "react-icons/bi";
import Alert from "react-bootstrap/Alert";
import MathButtons from "../components/MathButtons";
import useAnswerSubmit from "../hooks/userAnswerSubmit";
import Countdown from "../components/CountDown";
import Footer from "../components/Footer";

const QuestionPage = () => {
    const questionData = useQuestionData();
    const [answer, setAnswer] = useState(null);
    const { response, showAlert, submitAnswer } = useAnswerSubmit();

    const handleSubmit = (event) => {
      event.preventDefault();
      submitAnswer(answer);
    };
    
    return (
        <>
        <NavigationBar/>

        {showAlert && (
          <Alert variant={response === "Correct answer" ? "success" : "danger"} dismissible="true">
            <Alert.Heading className="text-center">{response}</Alert.Heading>
          </Alert>
        )}

        <div className="mb-5 mt-5 text-center">
          <h2>Następne pytanie za <Countdown/></h2>
        </div>

        <Container className="w-60 px-3 mx-auto" style={{ maxWidth: "500px", backgroundColor: "white", marginTop: "75px"}}>
        
          <Card className="mb-5 mt-5 text-center" border="dark">
            <Card.Header>{questionData.description}</Card.Header>
            <Card.Body><EquationComponent equation={questionData.question} /></Card.Body>
          </Card>

          <Form className="mb-5" onSubmit={handleSubmit}>
            <Form.Label></Form.Label>
            <InputGroup>
              <Form.Control style={{textAlign: "center"}} type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
              <Button variant="dark" type="submit"><BiSend/></Button>
            </InputGroup>  
          </Form>
          
          <MathButtons answer={answer} setAnswer={setAnswer}/>

        </Container>
        <Footer/>
        </>
    )   
}

export default QuestionPage;