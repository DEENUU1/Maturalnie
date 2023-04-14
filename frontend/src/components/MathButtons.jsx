import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import EquationComponent from "./MathFormularFormater";


function MathButtons(props) {
    const handleButtonClick = (value) => {
        props.setAnswer(props.answer + value)
    };
    
  return (
    <>  
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
    </>
  );
}

export default MathButtons;