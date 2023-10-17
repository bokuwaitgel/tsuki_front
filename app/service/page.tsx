"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

import test from "../../public/images/test.png";

export default function Services() {
  const [file, setFile] = useState<File>();
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
    console.log("submit");
    setId("loading");
    e.preventDefault();
    if (!file) return;
    console.log(file);
    try {
      var formdata = new FormData();
      formdata.append("prompt", question);
      formdata.append("image", file);

      await fetch("https://dev.mazaal.ai/api/sdk/pre-trained-models/22", {
        mode: "no-cors",
        method: "POST",
        headers: {
          Authorization: "mz-787925a6-60b6-4e2d-9f9b-5fdc67fa4c9c",
        },
        body: formdata,
      })
        .then((response) => response.text())
        .then((result) => setId(result))
        .catch((error) => setId(error));
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
            <input
              type="file"
              onChange={(e) => setFile(e.target.files![0])}
              accept="image/*"
            />
          </div>
          <button className="mt-2" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="p-5">
        <div>Result</div>
        <div>{id}</div>
      </div>
    </div>
  );
}
