require("dotenv").config();

const TRELLO_KEY = process.env.TRELLO_KEY; // Trello API Key
const TRELLO_TOKEN = process.env.TRELLO_TOKEN; // Trello Token
const LIST_ID = process.env.LIST_ID; // Trello List ID
const CALLBACK_URL = process.env.CALLBACK_URL; // Vercel endpoint URL

async function createTrelloWebhook() {
  const url = `https://api.trello.com/1/tokens/${TRELLO_TOKEN}/webhooks/?key=${TRELLO_KEY}`;
  const body = JSON.stringify({
    description: "Trello + Remotion Webhook",
    callbackURL: CALLBACK_URL,
    idModel: LIST_ID,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Webhook created successfully:", data);
  } catch (error) {
    console.error("Error creating webhook:", error.message);
  }
}

createTrelloWebhook();
