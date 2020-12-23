import React, {useState} from "react";
import {motion, transform, useAnimation} from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100vw;
   height: 100vh;

   form {
     display: flex;
     flex-direction: column;
     width: 100%;
     max-width: 350px;
     
     section {
       position: relative;
       width: 100%;
       margin-bottom: 10px;
       
       input:placeholder-shown {
        font-size: 16px;
        font-weight: normal;
       }

       input {
         width: 100%;
         height: 50px;
         font-size: 18px;
         font-weight: bold;
         border-radius: 5px;
         border: 0;
         padding: 10px 80px 10px 15px;
       }
 
       div {
         color: black;
         background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 1) 20%
        );
         padding: 10px;
         padding-right: 20px;
         padding-left: 50px;

         position: absolute;
         top: 50%;
         transform: translateY(-50%);
         right: 2px;

         span {
           display: block;
           font-weight: bold;
         }
       } 
     }
     
     button {
      color: white;
      background: #5a2e93;
      border: 0;
      border-radius: 5px;
      height: 50px;
      padding: 10px 15px;
      cursor: pointer;
      transition: background 200ms ease-in-out;

      &:hover {
        background: #7543b6;
      }
     }
   }
`;

const maxLength = 25;
const mapRemainingToColor = transform([2, 25], ["#ff008c", "#ccc"]);
const mapRemainingToVelocity = transform([0, 25], [50, 0]);

const App = () => {
 const [text, setText] = useState("");
 const [password, setPassword] = useState("");
 const textControls = useAnimation();
 const passControls = useAnimation();

 const textCharsRemaining = maxLength - text.length;
 const passCharsRemaining = maxLength - password.length;
 
 const handleChange = (e) => {
   if(e.target.id === "username"){
    setText(e.target.value);

     if(e.target.value.length > maxLength) {
       textControls.start({
         scale: 1,
         transition: {
          type: "spring", 
          velocity: mapRemainingToVelocity(textCharsRemaining),
          stiffness: 1000,
          damping: 100,
         }
       })
     }
   } else {
    setPassword(e.target.value);

    if(e.target.value.length > maxLength) {
      passControls.start({
        scale: 1,
        transition: {
         type: "spring", 
         velocity: mapRemainingToVelocity(passCharsRemaining),
         stiffness: 1000,
         damping: 100,
        }
      })
    }
   }

   console.log(maxLength - e.target.value.length);
 }

 const handleSubmit = (e) => {
   e.preventDefault();
   console.log(textCharsRemaining);
   if(textCharsRemaining < 0) {
     alert("Username cannot be greater than 30 characters");
     return;
   }

   if(passCharsRemaining < 0) {
    alert("Password cannot be greater than 30 characters");
    return;
   }

   alert("Form Successfully Submitted");
   setText("");
   setPassword("");
 }

 return(
      <Container>
       <form action="/" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <section>
            <input id="username" name="username" value={text} type="text" onChange={handleChange}  placeholder="Type your username" />
            <div>
              <motion.span
                style={{color: mapRemainingToColor(textCharsRemaining)}}
                animate={textControls}
              >{textCharsRemaining}</motion.span>
            </div>
        </section>
        <section>
          <input id="password" name="pass" value={password} type="password" onChange={handleChange} placeholder="Type your password" />
          <div>
            <motion.span
              style={{color: mapRemainingToColor(passCharsRemaining)}}
              animate={passControls}
            >{passCharsRemaining}</motion.span>
          </div>
        </section>
        <button>Submit</button>
      </form>
    </Container>
  )
};

export default App;