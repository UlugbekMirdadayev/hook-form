import "./App.css";
import { useForm } from "./utils/hook";

function App() {
  const loginForm = useForm({
    dafaultValues: { username: "loginForm", password: "" },
  });

  const registerForm = useForm({
    dafaultValues: { username: "registerForm", password: "" },
  });

  const handleSubmit = (e, values) => {
    e.preventDefault();
    console.log(values);
  };

  const errorsLength = Object.values(registerForm.errors).filter(
    Boolean
  ).length;

  return (
    <div className="App">
      <header className="App-header">Login Form</header>
      <form onSubmit={(e) => handleSubmit(e, loginForm.values)}>
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
      <form onSubmit={(e) => handleSubmit(e, registerForm.values)}>
        <label>
          <p>Username</p>
          <input
            type="text"
            placeholder="username"
            {...registerForm.register("username", { max: 10 })}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            {...registerForm.register("password", { max: 5 })}
          />
        </label>
        <button disabled={errorsLength}>Submit</button>
      </form>
    </div>
  );
}

export default App;
