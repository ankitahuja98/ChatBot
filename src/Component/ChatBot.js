import React, { useState } from "react";

const question = [
  {
    Name: "Candidate Name",
    Description: "Enter the Candidate Name",
    type: "text",
  },
  {
    Name: "Joining Date",
    Description: "Enter the Joining Date",
    type: "date",
  },
  {
    Name: "Current CTC",
    Description: "Enter the Current CTC",
    type: "number",
  },
  {
    Name: "Reason for Change",
    Description: "Brief Reason for Change",
    type: "text",
  },
  {
    Name: "Expected CTC",
    Description: "Enter the Expected CTC",
    type: "number",
  },
];

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessaage] = useState([
    {
      sender: "bot",
      text: question[0].Description,
    },
  ]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {};

  return (
    <div className="mainContainer border-2 w-6/12 h-130">
      <h3 className="text-center py-2 text-xl font-semibold">ChatBot</h3>
      <div className="chatBot h-107.5 bg-gray-100 overflow-y-scroll">
        {message?.map((val, ind) => {
          const { sender, text } = val;
          return (
            <div className="p-3">
              <p
                className={`${
                  sender === "bot" ? "bg-white" : "bg-green-100"
                } p-2 max-w-10/12 rounded-xl`}
              >
                {text}
              </p>
            </div>
          );
        })}
      </div>
      <div className="userInput">
        <input
          className="border-t-2 w-9/12 lg:w-10/12 p-2"
          type="text"
          placeholder="Enter your response"
          value={input}
          onChange={handleInputChange}
        />
        <button
          className="border-t-2 w-3/12 lg:w-2/12 bg-green-100 p-2"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
