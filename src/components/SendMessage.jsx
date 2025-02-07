import { useState } from "react";

const SendMessage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [template, setTemplate] = useState("hello_world");

  const sendMessage = async () => {
    if (!phoneNumber) {
      alert("Please enter a phone number");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/m/sendwhatsapp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "Accept": "application/json",
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          template_name: template,
          language_code: "en_US",
        }),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        alert(`Failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending message.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Send WhatsApp Message</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-full p-2 border rounded-lg mb-2"
      />
      <button
        onClick={sendMessage}
        className="bg-green-500 text-white p-2 rounded-lg w-full hover:bg-green-600"
      >
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
