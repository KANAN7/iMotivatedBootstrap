document.getElementById("send-btn").addEventListener("click", async function () {
    const userInput = document.getElementById("user-input").value.trim();
  
    if (!userInput) return; // Don't send if input is empty
  
    // Display user input in the chat window
    const chatWindow = document.getElementById("chat-window");
    const userMessage = document.createElement("div");
    userMessage.className = "chat-message user";
    userMessage.innerHTML = `<span>${userInput}</span>`;
    chatWindow.appendChild(userMessage);
  
    // Clear the input field
    document.getElementById("user-input").value = "";
  
    // Display a "typing..." message while waiting for a response
    const botTyping = document.createElement("div");
    botTyping.className = "chat-message bot";
    botTyping.innerHTML = `<span>Typing...</span>`;
    chatWindow.appendChild(botTyping);
  
    try {
      // Fetch response from the backend API
      const response = await fetch("http://127.0.0.1:5000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: userInput }), // Sending the correct key as expected by Flask
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Remove the "typing..." message
        chatWindow.removeChild(botTyping);
  
        // Display the chatbot's response
        const botMessage = document.createElement("div");
        botMessage.className = "chat-message bot";
        botMessage.innerHTML = `<span>${data.response}</span>`;
        chatWindow.appendChild(botMessage);
      } else {
        throw new Error("Failed to fetch response from backend");
      }
    } catch (error) {
      // Remove the "typing..." message
      chatWindow.removeChild(botTyping);
  
      // Display error message
      const errorMessage = document.createElement("div");
      errorMessage.className = "chat-message bot";
      errorMessage.innerHTML = `<span>Oops! Something went wrong. Please try again later.</span>`;
      chatWindow.appendChild(errorMessage);
  
      console.error("Error:", error);
    }
  
    // Scroll to the bottom of the chat window
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });
  