import { getDeveloperPrompt, MODEL } from "@/config/constants";
import { getTools } from "@/lib/tools/tools";
import OpenAI from "openai";

// Helper function to extract conversation state from messages
function extractConversationState(messages: any[]) {
  const state: any = {
    phase: "greeting",
    product: undefined,
    country: undefined,
    gtipCode: undefined,
    salesChannels: undefined,
    website: undefined,
    name: undefined,
    email: undefined,
    phone: undefined,
    keywords: undefined,
    competitors: [],
    customers: []
  };

  // Analyze messages to determine current state
  for (const message of messages) {
    if (message.role === "user" && message.content) {
      const content = message.content.toLowerCase();
      
      // Try to extract product information
      if (!state.product && (content.includes("ürün") || content.includes("product"))) {
        // Simple product extraction logic - can be enhanced
        const words = message.content.split(" ");
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          // Look for potential product names (this is a simple implementation)
          if (word.length > 3 && !["ürün", "product", "ihracat", "export", "satmak", "sell"].includes(word.toLowerCase())) {
            state.product = word;
            break;
          }
        }
      }
      
      // Try to extract country information
      if (!state.country) {
        const countries = ["almanya", "germany", "fransa", "france", "amerika", "usa", "ingiltere", "uk", "italy", "italya", "spain", "ispanya"];
        for (const country of countries) {
          if (content.includes(country)) {
            state.country = country;
            break;
          }
        }
      }
      
      // Try to extract email
      const emailMatch = message.content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (emailMatch && !state.email) {
        state.email = emailMatch[0];
      }
      
      // Try to extract phone
      const phoneMatch = message.content.match(/[\+]?[1-9][\d]{3,14}/);
      if (phoneMatch && !state.phone) {
        state.phone = phoneMatch[0];
      }
    }
  }

  return state;
}

export async function POST(request: Request) {
  try {
    const { messages, toolsState } = await request.json();

    const tools = await getTools(toolsState);

    console.log("Tools:", tools);
    console.log("Received messages:", messages);

    // Extract conversation state from messages
    const conversationState = extractConversationState(messages);
    console.log("Conversation state:", conversationState);

    const openai = new OpenAI();

    const events = await openai.responses.create({
      model: MODEL,
      input: messages,
      instructions: getDeveloperPrompt(conversationState),
      tools,
      stream: true,
      parallel_tool_calls: false,
    });

    // Create a ReadableStream that emits SSE data
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of events) {
            // Sending all events to the client
            const data = JSON.stringify({
              event: event.type,
              data: event,
            });
            controller.enqueue(`data: ${data}\n\n`);
          }
          // End of stream
          controller.close();
        } catch (error) {
          console.error("Error in streaming loop:", error);
          controller.error(error);
        }
      },
    });

    // Return the ReadableStream as SSE
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}
