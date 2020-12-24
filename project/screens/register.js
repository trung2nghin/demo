import "../utils.js";

const style = `
.register-container {
    width: 100vw;
    height: 100vh;
    // background: url("https://images.alphacoders.com/437/thumb-1920-437881.jpg");
    background-color: pink;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
}
// #register-form {
//     width: 30vw;
//     height: 100vh;
//   }
.header {
  width: 100%;
  height: 10%;
  display: flex;
  // border: 1px solid black;
  justify-content: space-between;
}
.row {
  width: 96%;
}

.header1 {
  height: 10%
  border: 1px solid black;
  display:flex;
  align-items: center;
}

.btn:hover {
  background-color: #ff8585;
}
.btn1{
  border-radius: 5px;
  width: 120px;
  height: 50%;
  font-weight: bold;
  font-family: 'Titillium Web', sans-serif;
}
.btn2 {
  border-radius: 80px;
  width: 220px;
  height: 80%;
  font-weight: bold;
  font-family: 'Titillium Web', sans-serif;
}
.main {
  height: 90%;
  // border: 1px solid black;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 50px;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%; 
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
`;

class RegisterScreen extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this._shadowRoot.innerHTML = `
        <style>
          ${style}
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200&display=swap" rel="stylesheet">
        <div class = "register-container"> 
          <div class="header row">
            <h1 style="font-size: 35px;font-family: 'JetBrains Mono', monospace;"><i class="fa fa-venus-mars" aria-hidden="true"></i>tinher</h1>
            <div class="header1"><button class="btn btn1" style="font-family: 'JetBrains Mono', monospace;">SIGN-IN</button></div>
          </div>
          <div class="main row">
            <h1 style="font-size: 130px; margin: 0; font-family: 'JetBrains Mono', monospace;";>Swipe Right</h1>
            <div>
              <button class="btn btn2" id="myBtn" style="letter-spacing: 1px;font-size: 20px;font-family: 'JetBrains Mono', monospace;" >REGISTER</button>
            </div>  
            
            <div>
              <div id="myModal" class="modal">

            <!-- Modal content -->
                <div class="modal-content">
                  <span class="close">&times;</span>
                  <form id = "register-form">
                    <div class="header"></div>
                      <input-wrapper id = "first-name" type = "text" placeholder = "First name"></input-wrapper>
                      <input-wrapper id = "last-name" type = "text" placeholder = "Last name"></input-wrapper>
                      <input-wrapper id = "email" type = "text" placeholder = "Email"></input-wrapper>
                      <input-wrapper id = "password" type = "password" placeholder = "Password"></input-wrapper>
                      <input-wrapper id = "confirm-password" type = "password" placeholder = "Confirm password"></input-wrapper>
                      <button>Register</button>
                  </form>
                </div>
              </div>
            </div>
            

        </div>
        `;
    // <form id = "register-form">
    //       <div class="header"></div>
    //       <input-wrapper id = "first-name" type = "text" placeholder = "First name"></input-wrapper>
    //       <input-wrapper id = "last-name" type = "text" placeholder = "Last name"></input-wrapper>
    //       <input-wrapper id = "email" type = "text" placeholder = "Email"></input-wrapper>
    //       <input-wrapper id = "password" type = "password" placeholder = "Password"></input-wrapper>
    //       <input-wrapper id = "confirm-password" type = "password" placeholder = "Confirm password"></input-wrapper>
    //       <button>Register</button>
    //     </form>


    const registerForm = this._shadowRoot.getElementById("register-form");
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const firstname = this._shadowRoot.getElementById("first-name").value;
      const lastname = this._shadowRoot.getElementById("last-name").value;
      const email = this._shadowRoot.getElementById("email").value;
      const pass = CryptoJS.MD5(this._shadowRoot.getElementById("password").value);
      const confirmpass = this._shadowRoot.getElementById("confirm-password").value;
      const myPassword = "myPassword";
      const encrypted = CryptoJS.AES.encrypt(pass, myPassword);
      // add document
      function addDocument() {
        const data = {
          name: `${firstname} ${lastname}`,
          email: `${email}`,
          password: `${encrypted}`,
        };
        firebase.firestore().collection("users").add(data);
      }
      addDocument();
      //modal
      const modal = this._shadowRoot.getElementById("myModal");
      const btn = this._shadowRoot.getElementById("myBtn");
      const span = this._shadowRoot.getElementsByClassName("close")[0];
      btn.onclick = function () {
        modal.style.display = "block";
      };
      span.onclick = function () {
        modal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    });
  }
}
window.customElements.define("register-screen", RegisterScreen);
