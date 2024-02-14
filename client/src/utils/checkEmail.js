
const checkEmail = (e) => {
    e.preventDefault();
    const emailCheck = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e.target.value);
    console.log(emailCheck);
    if (!emailCheck) {
      setEmail(true);
    } else {
      setEmail(false);
    }
  };
  
export default checkEmail;
  