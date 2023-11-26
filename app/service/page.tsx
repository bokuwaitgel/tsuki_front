"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

import test from "../../public/images/test.png";

export default function Services() {
  const [file, setFile] = useState<File>();
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [tryAgain, setTryAgain] = useState<boolean>(false);
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
      <div className="p-5">idk</div>
    </div>
  );
}
