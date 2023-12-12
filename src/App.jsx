import { useState } from "react";
import { preTrain } from "./assets/util";
import TypeWriter from "typewriter-effect";
import "./App.css";

const OPENAI_API_KEY = "ADD_YOUR_OWN_API_KEY";

function App() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLodaing] = useState(false);

  const APIBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: preTrain + prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
  };

  const callOpenAIAPI = async () => {
    setLodaing(true);
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENAI_API_KEY,
      },
      body: JSON.stringify(APIBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setLodaing(false);
        setOutput(data.choices[0].message.content);
      });
  };

  const onHandlSubmit = (e) => {
    setOutput("");
    e.preventDefault();
    console.log(prompt);
    callOpenAIAPI();
    // output in form of one by one text
  };

  const onHandlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <>
      <div className="text-xl">
        <div className="my-10">
          <form onSubmit={onHandlSubmit}>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              type="text"
              placeholder="Provide instructions..."
              value={prompt}
              onChange={onHandlePrompt}
              className="text-xl w-full p-8 outline rounded-md border-black"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-500 px-8 py-4 rounded-lg text-white m-2"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>

        {!loading && output && (
          <div className="shadow-md p-8 text-left my-10 rounded outline">
            <pre>
              <TypeWriter
                options={{
                  autoStart: true,
                  delay: 25,
                }}
                onInit={(typewriter) => {
                  typewriter.typeString(output).start();
                }}
              ></TypeWriter>
            </pre>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
