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
        <>
        <NavigationBar/>
        <Container className="w-60 p-3" style={{ maxWidth: "500px"}}>
          <Card className="mb-5 mt-5 text-center" border="dark" >
            <Card.Header>{questionData.description}</Card.Header>
            <Card.Body><EquationComponent equation={questionData.question} /></Card.Body>
          </Card>

          <Form className="mb-5" onSubmit={handleSubmit}>
            <Form.Label>Answer:</Form.Label>
            <InputGroup>
              <Form.Control style={{textAlign: "center"}} type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
              <Button variant="dark" type="submit"><BsFillSendCheckFill/></Button>
            </InputGroup>
            {response && <p>{response}</p>}
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