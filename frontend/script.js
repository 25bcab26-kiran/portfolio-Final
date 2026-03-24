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
    const API_URL = "http://localhost:5000/api/contact"
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