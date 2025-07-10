// backend/routes/formRoutes.js
const express = require("express");
const router = express.Router();

router.post("/submit", (req, res) => {
  const formData = req.body;
  console.log("Received Form Data:", formData);

  // Placeholder logic: In future, save to DB . For now, just return the received data
  res.status(200).json({ message: "Form submitted successfully", data: formData });
});

module.exports = router;
