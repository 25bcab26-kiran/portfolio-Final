// Get button
const sendBtn = document.getElementById("sendBtn")

sendBtn.addEventListener("click", async () => {

  // Get input values
  const name = document.getElementById("name").value.trim()
  const email = document.getElementById("email").value.trim()
  const message = document.getElementById("message").value.trim()

  // Validation
  if (!name || !email || !message) {
    alert("Please fill all fields")
    return
  }

  // Email validation (basic)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    alert("Enter valid email ❌")
    return
  }

  try {
    // 🔥 IMPORTANT:
    // Change this URL after deploying to Render
    const API_URL = "https://portfolio-final-d5oe.onrender.com/api/contact"
    // Example after deploy:
    // const API_URL = "https://your-app.onrender.com/api/contact"

    // Disable button while sending
    sendBtn.innerText = "Sending..."
    sendBtn.disabled = true

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    })

    // Handle server response
    const data = await response.json()

    if (response.ok) {
      alert("Message sent successfully ✅")

      // Clear inputs
      document.getElementById("name").value = ""
      document.getElementById("email").value = ""
      document.getElementById("message").value = ""
    } else {
      alert(data.error || "Something went wrong ❌")
    }

  } catch (error) {
    console.error(error)
    alert("Server not reachable ❌ (Check backend / Render URL)")
  } finally {
    // Enable button again
    sendBtn.innerText = "Send Message"
    sendBtn.disabled = false
  }

})
// Fetch messages from backend
async function loadMessages() {
  try {
    const res = await fetch("https://portfolio-final-d5oe.onrender.com/api/contact")
    const data = await res.json()

    const container = document.getElementById("messages")
    container.innerHTML = ""

    data.forEach(msg => {
      const div = document.createElement("div")
      div.style.marginBottom = "15px"
      div.style.padding = "10px"
      div.style.border = "1px solid #ccc"

      div.innerHTML = `
        <strong>${msg.name}</strong> (${msg.email})<br>
        <p>${msg.message}</p>
      `

      container.appendChild(div)
    })

  } catch (error) {
    console.log(error)
  }
}

// Load messages on page load
loadMessages()