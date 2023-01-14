import * as esbuild from "esbuild-wasm";
import React, { useEffect, useState, useRef, Ref } from "react";

import { createRoot } from "react-dom/client";

const App = () => {
  const ref = useRef<any>();
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");

  const handleClick = async () => {
    await startService();
    if (!ref.current) {
      return;
    }
    const res = await ref.current.transform(value, {
      loader: "jsx",
      target: "es2015",
    });
    setCode(res.code);
  };

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  return (
    <>
      <textarea
        onChange={(e) => setValue(e.target.value)}
        id="userInput"
        name="userInput"
        value={value}
      />
      <div>
        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </div>
      <pre>{code}</pre>
    </>
  );
};
const domNode = document.getElementById("root");
const root = createRoot(domNode!);
root.render(<App />);
