"use client";

import { useState, useCallback, useRef, useEffect, ChangeEvent } from "react";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const [passLength, setPassLength] = useState<number>(8); //store password length
  const [numberAllowed, setNumberAllowed] = useState<boolean>(false);
  const [charAllowed, setCharAllowed] = useState<boolean>(false);
  let [password, setPassword] = useState<string>(""); //store password
  //"Once this input is rendered to the DOM, store a reference to the DOM node (the real <input>) in passwordRef.current."
  const passwordRef = useRef<HTMLInputElement>(null);

  const passWordGenerator: Function = useCallback(() => {
    let tempPassword: string = "";
    let chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) chars += "0123456789";
    if (charAllowed) chars += "!@#$%^&*()_+";

    for (let i = 0; i < passLength; i++) {
      let randomChar = Math.floor(Math.random() * chars.length + 1);
      tempPassword += chars.charAt(randomChar);
    }
    password = tempPassword; //set password to tempPassword
    setPassword(password); //next time the component renders, password will be set to tempPassword
  }, [passLength, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard: VoidFunction = useCallback(() => {
    console.log(window.navigator.clipboard);

    if (!passwordRef.current) {
      alert("Password not generated yet");
      return;
    }

    if (!navigator.clipboard) {
      alert("Clipboard API not supported in Next");
      return;
    }

    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 999);

    navigator.clipboard
      .writeText(passwordRef.current.value)
      .then(() => alert("Password copied to clipboard"))
      .catch((err) => {
        console.error("Failed to copy:", err);
        alert("Failed to copy password");
      });
  }, []);

  useEffect(() => {
    setHasMounted(true); // only runs on client
  }, []);

  useEffect(() => {
    if (hasMounted) {
      passWordGenerator(); // now this is safe
    }
  }, [hasMounted, passLength, numberAllowed, charAllowed, passWordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        {/* Input and button container */}
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Generated password"
          readOnly
          ref={passwordRef}
        />
        <button
          type="button"
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      {/* Input slider with check box */}
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={passLength}
            className="cursor-pointer"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassLength(parseInt(e.target.value));
            }}
          />
          <label>Length: {passLength}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}
