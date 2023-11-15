import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Icon from "./components/Icon";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <Icon name="eye" className="h-5 w-5 bg-black" />
        </a>
        <a href="https://tauri.app" target="_blank">
        <Icon name="more" className="h-5 w-5 bg-black" />
        </a>
        <a href="https://reactjs.org" target="_blank">
        </a>
          <Icon name="x" className="h-5 w-5 text-red" />
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
