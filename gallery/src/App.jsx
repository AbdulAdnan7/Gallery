import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Gallery from "./components/Gallery";

function App() {

  return (
    <>
      <div className=" h-auto max-w-7xl">
        <div>
          <h1 className="text-4xl font-bold">Gallery App</h1>
          <p className="font-semibold text-1xl mt-4 text-gray-400">Discover and save your favourite photos</p>
        </div>
        <Gallery />
      </div>
    </>
  );
}

export default App;
