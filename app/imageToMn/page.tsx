"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

import test from "../../public/images/test.png";

export default function ExtractTable() {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [resultText, setResultText] = useState<string>("");

  useEffect(() => {
    fetch(test.src)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "test.png", { type: "image/png" });
        setFile(file);
      });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setResultText("loading...");
    e.preventDefault();
    if (!file) return;
    try {
      let formdata = new FormData();
      formdata.append("image", file);

      await fetch("http://127.0.0.1:5000/toMongolian", {
        method: "POST",
        body: formdata,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setResult(result.mon);
          setResultText(result.bicig);
        })
        .catch((error) => console.log("error", error));
    } catch (err) {
      setResultText("there was an error");
    }
  };
  return (
    <div>
      <div className="p-5">
        <div> extract Table </div>
        <Image
          src={file ? URL.createObjectURL(file) : test}
          alt="Picture of the author"
          width={500}
          height={500}
        />
        <form onSubmit={onSubmit}>
          <div>
            <div>
              <label>custom file</label>
            </div>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files![0])}
              accept="image/*"
            />
          </div>
          <button
            className="mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="p-5">
        <div className="text-lg">Result: </div>
        <div>
          {resultText === "loading..." ? (
            <div> loading... </div>
          ) : (
            <div>
              <div> {resultText} </div>
              <div> {result} </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
