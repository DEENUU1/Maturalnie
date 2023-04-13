import React, { useState } from "react";
import { useQuestionData } from "../hooks/RandomQuestionHook";
import EquationComponent  from "../components/mathFormularFormater";
import NavigationBar from "../components/NavigationBar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import { BsFillSendCheckFill } from "react-icons/bs";
import Alert from "react-bootstrap/Alert";


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
    
    const handleButtonClick = (value) => {
      setAnswer(answer + value);
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
          
          <div className="mb-5 text-center"> 
            <Row>
              <Col>  
                <Button style={{ width: "60px", height: "75px" }} variant="outline-dark" onClick={() => handleButtonClick("\sqrt")}><EquationComponent equation="√" /></Button >
              </Col>
              <Col>
                <Button style={{ width: "60px", height: "75px" }} variant="outline-dark" onClick={() => handleButtonClick("\\frac{x}{y}")}><EquationComponent equation="\frac{x}{y}"/></Button > 
              </Col>
              <Col>         
                <Button style={{ width: "60px", height: "75px" }} variant="outline-dark" onClick={() => handleButtonClick("+")}><EquationComponent equation="+" /></Button >
              </Col>
              <Col>
                <Button style={{ width: "60px", height: "75px" }} variant="outline-dark" onClick={() => handleButtonClick("-")}><EquationComponent equation="-" /></Button >
              </Col>
            </Row>
            </div>

            <div className="mb-5 text-center">
            <Row>
              <Col>
                <Button style={{ width: "60px", height: "75px" }} variant="outline-dark" onClick={() => handleButtonClick("/")}><EquationComponent equation="/" /></Button >
              </Col>
              <Col>
                <Button style={{ width: "60px", height: "75px" }} variant="outline-dark" onClick={() => handleButtonClick("*")}><EquationComponent equation="*" /></Button >
              </Col>
              <Col>
                <Button style={{ width: "60px", height: "75px" }} variant="outline-dark" onClick={() => handleButtonClick("^2")}><EquationComponent equation="^2" /></Button >
              </Col>
              <Col>
                <Button style={{ width: "60px", height: "75px" }} variant="outline-dark" onClick={() => handleButtonClick("^3")}><EquationComponent equation="^3" /></Button >
              </Col>
            </Row>
            </div>
        </Container>
        </>
    )   
}

export default QuestionPage;