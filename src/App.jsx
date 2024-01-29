import { useState } from "react";

function App() {
  const [check, setcheck] = useState(false);
  return (
    <div
      className="min-h-screen flex flex-col gap-3"
      data-theme={check ? "cupcake" : "dark"}
    >
      <h1 className="text-3xl font-bold underline ">Hello world!</h1>
      <hr />
      <input
        type="checkbox"
        className="toggle"
        checked={check}
        onClick={() => setcheck(!check)}
      />
      <div>
        <button className="btn">Button</button>
        <button className="btn btn-neutral">Neutral</button>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
        <button className="btn btn-ghost">Ghost</button>
        <button className="btn btn-link">Link</button>
      </div>
    </div>
  );
}

export default App;
