const Footer = () => {
    const year = new Date().getFullYear();
  
    return <footer style={{
            position: "fixed", backgroundColor: "#f7f7f7", bottom:"0", left: "0", right: "0", padding: "8", textAlign: "center", fontWeight: "600", height: "60px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <p style={{margin: 0, color:"black"}}>Copyright © Kacper Włodarczyk {year}</p> 
           </footer>;
  };
  
  export default Footer;