const Footer = () => {
    const year = new Date().getFullYear();
  
    return <footer style={{
            position: "fixed", backgroundColor: "#292b2c", bottom:"0", left: "0", right: "0", padding: "8", textAlign: "center", fontWeight: "700", height: "60px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <p style={{margin: 0, color:"white"}}>Copyright © Kacper Włodarczyk {year}</p> 
           </footer>;
  };
  
  export default Footer;