import { useState } from "react";
import "./App.css";

const OPENAI_API_KEY = "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";

function App() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

  // -H "Content-Type: application/json" \
  // -H "Authorization: Bearer $OPENAI_API_KEY" \

  const APIBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Write a Python function for " + prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
  };

  const callOpenAIAPI = async () => {
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
        setOutput(data.choices[0].message.content);
      });
  };

  const onHandlSubmit = (e) => {
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
      <div>
        <div className="shadow-md h-[200px] my-10 text-xl">
          <p>{output}</p>
        </div>
        <div className="shadow-md my-10">
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
              className="text-xl w-full border-2 rounded-md border-black p-2"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-500 p-2 rounded-sm text-white m-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
