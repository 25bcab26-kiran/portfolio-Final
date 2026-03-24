const express = require("express")
const router = express.Router()
const Contact = require("../models/Contact")

// POST API
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body

    const newContact = new Contact({ name, email, message })
    await newContact.save()

    res.status(201).json({ message: "Message saved ✅" })
  } catch (error) {
    res.status(500).json({ error: "Server Error" })
  }
})

module.exports = router

// GET all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" })
  }
})