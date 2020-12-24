import "../utils.js"

const style = `
.register-container {
    width: 100vw;
    height: 100vh;
    background: url("https://images.alphacoders.com/437/thumb-1920-437881.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: flex-end
}
#register-form {
    width: 30vw;
    height: 100vh;
    background: #fff
  }
h1{
    text-align: center;
    // color: #808080;
    font-family: 'Nunito', sans-serif;

  }
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
        <div class = "register-container">
            <form id = "register-form">
              <h1>CI Project</h1>
              <input-wrapper id = "first-name" type = "text" placeholder = "First name"></input-wrapper>
              <input-wrapper id = "last-name" type = "text" placeholder = "Last name"></input-wrapper>
              <input-wrapper id = "email" type = "text" placeholder = "Email"></input-wrapper>
              <input-wrapper id = "password" type = "password" placeholder = "Password"></input-wrapper>
              <input-wrapper id = "confirm-password" type = "password" placeholder = "Confirm password"></input-wrapper>
              <button>Register</button>
            </form>
        </div>
        `;
    const registerForm = this._shadowRoot.getElementById("register-form");
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const firstname = this._shadowRoot.getElementById("first-name").value;
      const lastname = this._shadowRoot.getElementById("last-name").value;
      const email = this._shadowRoot.getElementById("email").value;
      const pass = CryptoJS.MD5(this._shadowRoot.getElementById("password").value);
      const confirmpass = this._shadowRoot.getElementById("confirm-password").value;
      const myPassword = "myPassword";
      const encrypted = CryptoJS.AES.encrypt(pass, myPassword);
      console.log(encrypted);
      // add document
      function addDocument() {
        const data = {
          name: `${firstname} ${lastname}`,
          email: `${email}`,
          password: `${encrypted}`
        };
        firebase.firestore().collection("users").add(data);
      }
      addDocument();
    });
  }
}
window.customElements.define("register-screen", RegisterScreen);