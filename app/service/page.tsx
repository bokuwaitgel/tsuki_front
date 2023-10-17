"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

import test from "../../public/images/test.png";

export default function Services() {
  const [file, setFile] = useState<File>();
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [answerLoading, setAnswerLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("what year is it?");
  const [result, setResult] = useState<object>();

  useEffect(() => {
    fetch(test.src)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "test.png", { type: "image/png" });
        setFile(file);
      });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setId("loading");
    setResult({});
    e.preventDefault();
    if (!file) return;
    try {
      let formdata = new FormData();
      formdata.append("prompt", question);
      formdata.append("image", file);

      await fetch("https://tsuki-backend-a9d1d8e56400.herokuapp.com/question", {
        method: "POST",
        body: formdata,
      })
        .then((response) => response.json())
        .then((result) => setId(result?.id))
        .catch((error) => console.log("error", error));
    } catch (err) {
      setId("there was an error");
    }
  };
  return (
    <div>
      <div className="p-5">
        <div> ASK questions </div>
        <Image
          src={file ? URL.createObjectURL(file) : test}
          alt="Picture of the author"
          width={500}
          height={500}
        />
        <form onSubmit={onSubmit}>
          <div className="pt-5">
            <div>
              <label>Question</label>
            </div>
            <input
              type="text"
              className="text-black p-1"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            />
          </div>
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
      {id === "loading" && <div className="p-5">loading...</div>}
      {id !== "" && id !== "loading" && (
        <div className="p-5">
          <div>Get Result</div>
          <button
            className="mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={async () => {
              setAnswerLoading(true);
              try {
                const response = await axios.get(
                  `https://tsuki-backend-a9d1d8e56400.herokuapp.com//getResult?id=${id}`
                );
                setAnswerLoading(false);
                setResult(response.data);
              } catch (err) {
                console.log(err);
              }
            }}
          >
            answer
          </button>
          <div>
            <div>Answer: </div>
            {answerLoading ? (
              <div>loading...</div>
            ) : (
              <div className="text-white">
                {JSON.stringify(result, null, 2)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
