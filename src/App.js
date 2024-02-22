import "./App.css";
import { useForm, useMousePosition } from "./utils/hook";

function App() {
  const loginForm = useForm({
    dafaultValues: { username: "loginForm", password: "" },
    onSubmit: (values) => console.log(values, "loginForm values"),
  });

  const registerForm = useForm({
    dafaultValues: { username: "registerForm", password: "" },
    onSubmit: (values) => console.log(values, "registerForm values"),
  });

  const errorsLength = Object.values(registerForm.errors).filter(
    Boolean
  ).length;

  const { position } = useMousePosition();

  return (
    <div className="App">
      <div style={position} className="cursor-custome">
        <img src="https://uxwing.com/wp-content/themes/uxwing/download/hand-gestures/mouse-hand-cursor-color-icon.png" alt="gestures" />
      </div>
      <header className="App-header">Login Form</header>
      <form onSubmit={loginForm.handleSubmit}>
        <label>
          <p>Username</p>
          <input
            type="text"
            placeholder="username"
            {...loginForm.register("username")}
          />
        </label>
        <label>
          <p>Password</p>
          <input type="password" {...loginForm.register("password")} />
        </label>
        <button>Submit</button>
      </form>

      <header className="App-header">Register Form</header>
      <form onSubmit={registerForm.handleSubmit}>
        <label>
          <p>Username</p>
          <input
            type="text"
            placeholder="username"
            {...registerForm.register("username", { max: 10, required: true })}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            {...registerForm.register("password", { max: 5, required: true })}
          />
        </label>
        <button disabled={errorsLength}>Submit</button>
      </form>
    </div>
  );
}

export default App;
