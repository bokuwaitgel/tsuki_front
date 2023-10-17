"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

import test from "../../public/images/test.png";

export default function ExtractTable() {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tryAgain, setTryAgain] = useState<boolean>(false);
  const [answerLoading, setAnswerLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("what year is it?");
  const [result, setResult] = useState<Array<any>>([]);
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

      await fetch(
        "https://tsuki-backend-a9d1d8e56400.herokuapp.com/extractTable",
        {
          method: "POST",
          body: formdata,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setResult(result?.tables);
          setResultText(JSON.stringify(result, null, 2));
        })
        .catch((error) => console.log("error", error));
      console.log(result);
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
            <div> {resultText} </div>
          )}
        </div>

        {result && result.length > 0 ? (
          <div>
            <div className="text-lg pt-10">Table Result: </div>
            <div>
              {result.map((table, index) => (
                <div
                  className="relative overflow-x-auto shadow-md sm:rounded-lg p-5"
                  tabIndex={index}
                  key={index}
                >
                  <div className="p-10">{`Table number: ${index + 1}`}</div>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    {table.map((row: any, index: number) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        key={index}
                      >
                        {row.map((col: any, index: number) => (
                          <td className="px-6 py-4" key={index}>
                            {col}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </table>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-lg pt-10"> No result </div>
        )}
      </div>
    </div>
  );
}
