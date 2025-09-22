# ITAI Export Assistant

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![NextJS](https://img.shields.io/badge/Built_with-NextJS-blue)
![OpenAI API](https://img.shields.io/badge/Powered_by-OpenAI_API-orange)

ITAI Export Assistant is an AI-powered chatbot designed to help Turkish companies increase their exports. The assistant guides users through a structured conversation to collect export-related information and provides valuable insights about target markets, competitors, and potential customers.

## Features

- **Structured Conversation Flow**: 12-phase information collection process
- **Bilingual Support**: Supports both Turkish and English
- **Web Search Integration**: Finds real competitors and customers in target markets
- **Smart Validation**: Validates corporate emails and required information
- **Export Expertise**: Specialized in Turkish export processes
- **Real-time Progress Tracking**: Shows completion status for each phase

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **AI Integration**: OpenAI GPT-4
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd itai-export-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env.local

# Add your OpenAI API key to .env.local
OPENAI_API_KEY=your_openai_api_key_here
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm run start
```

## Deployment on Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

### Manual Deployment

1. **Connect to Vercel**:
   - Push your code to GitHub
   - Connect your GitHub repository to Vercel
   - Vercel will automatically deploy your application

2. **Set Environment Variables** in your Vercel dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `GOOGLE_CLIENT_ID`: (Optional) For Google integration
   - `GOOGLE_CLIENT_SECRET`: (Optional) For Google integration  
   - `NEXTAUTH_SECRET`: Random secret for NextAuth

3. **Deploy**:
```bash
npm run build
npx vercel --prod
```

## Conversation Flow

The assistant follows a 12-phase conversation flow:

1. **Product Information** - What product to export
2. **Target Country** - Which country to target  
3. **GTIP Code** - Product classification code
4. **Sales Channels** - Current distribution channels
5. **Website** - Company website
6. **Name** - Contact person name
7. **Email** - Corporate email (validated)
8. **Phone** - Contact phone number
9. **Keywords** - B2B search terms
10. **Competitors** - Market competitors (web search)
11. **Customers** - Potential customers (web search)
12. **Demo** - Meeting scheduling and summary

## Example Usage

### Turkish Conversation
```
User: Merhaba
Assistant: Merhaba! Ben ITAI Export Assistant'ım. Türk şirketlerinin ihracatında uzman bir danışmanım. 
          Hangi ürününüzün ihracatını artırmak istiyorsunuz?

User: Karpuz
Assistant: Harika! Karpuz ihracatını artırmak istiyorsunuz. 
          Hangi ülkeye bu ürünü satmak istiyorsunuz?
```

### English Conversation
```
User: Hello
Assistant: Hello! I'm ITAI Export Assistant. I'm an expert consultant in Turkish companies' exports.
          Which product's export do you want to increase?

User: Watermelon
Assistant: Great! You want to increase watermelon exports.
          Which country do you want to sell this product to?
```

## Configuration

### Web Search

Web search is enabled by default to find competitors and customers. The assistant uses this to provide real, up-to-date market information.

### Language Detection

The assistant automatically detects the user's language (Turkish/English) and responds accordingly throughout the conversation.

### Corporate Email Validation

The system only accepts corporate email addresses and rejects personal email services (Gmail, Hotmail, Yahoo, Outlook).

## API Endpoints

- `/api/turn_response` - Main conversation endpoint with state tracking
- `/api/functions/*` - Function calling endpoints
- `/api/google/*` - Google integration endpoints (optional)
- `/api/vector_stores/*` - File search endpoints (optional)

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Optional - Google Integration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/google/callback

# Optional - Authentication
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Optional - Development
NODE_ENV=development
```

## Project Structure

```
├── app/
│   ├── api/                 # API routes
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── ui/                 # UI components
│   ├── chat.tsx            # Main chat interface
│   └── assistant.tsx       # Assistant logic
├── config/                 # Configuration files
│   ├── constants.ts        # App constants and prompts
│   └── tools-list.ts       # Available tools
├── lib/                    # Utility libraries
├── stores/                 # State management
│   ├── useConversationStore.ts     # Chat state
│   ├── useExportAssistantStore.ts  # Export flow state
│   └── useToolsStore.ts            # Tools configuration
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies
├── vercel.json           # Vercel configuration
└── README.md             # This file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the GitHub repository.

---

Built with ❤️ for Turkish exporters using OpenAI's Responses API and Next.js.