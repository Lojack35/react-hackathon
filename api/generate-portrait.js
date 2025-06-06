// ==============================
// Endpoint: /api/generate-portrait
// Purpose: Acts as a backend route handler to send a POST request to OpenAI's image generation API
// ==============================

export default async function handler(req, res) {
  // ==============================
  // METHOD CHECK
  // Ensure only POST requests are allowed
  // ==============================
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" }); // 405 = Method Not Allowed
  }

  // ==============================
  // REQUEST BODY VALIDATION
  // Destructure the prompt from request body and validate it
  // ==============================
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" }); // 400 = Bad Request
  }

  try {
    // ==============================
    // CALL OPENAI IMAGE GENERATION API
    // Use fetch to send a POST request to OpenAI's /images/generations endpoint
    // ==============================
    const openaiRes = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use API key from environment
        },
        body: JSON.stringify({
          model: "dall-e-3", // Use DALL·E 3 for higher-quality generations
          prompt, // The prompt describing the character
          n: 1, // Number of images to generate (1 image)
          size: "1024x1024", // Desired resolution
        }),
      }
    );

    // Parse JSON response
    const data = await openaiRes.json();

    // ==============================
    // HANDLE API ERRORS
    // If the response status is not OK, forward the error message
    // ==============================
    if (!openaiRes.ok) {
      return res
        .status(500)
        .json({ error: data?.error || "Image generation failed" });
    }

    // ==============================
    // SUCCESSFUL RESPONSE
    // Extract and return the image URL from OpenAI's response
    // ==============================
    const imageUrl = data.data?.[0]?.url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    // ==============================
    // INTERNAL SERVER ERROR HANDLER
    // Log the error and return a 500 status
    // ==============================
    console.error("Image generation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
