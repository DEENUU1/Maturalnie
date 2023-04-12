import React, { useEffect } from "react";

const EquationComponent = ({ equation }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.onload = () => {
          window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
        };
        script.src = 'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML';
        document.body.appendChild(script);
      }, [equation]);
      
  return <div>{`$$${equation}$$`}</div>;
};

export default EquationComponent;