# Chat2 - Simplified Conversation System

## Overview

Chat2 is a new implementation of the export assistant chat system with a simplified, deterministic conversation flow. It's designed to be more predictable, easier to debug, and more maintainable than the original system.

## Key Improvements

### 1. **Simplified State Management**
- Uses a simple `ConversationPhase` enum (1-12) instead of 20+ boolean flags
- Single source of truth for conversation state
- Clear phase progression logic

### 2. **Clean Prompt Architecture**
- Static system prompt (~120 lines vs 668 lines)
- No dynamic prompt injection
- Clear section separators
- No visual noise (minimal emojis)

### 3. **Better Error Handling**
- Detailed logging at each step
- Error messages include actual error details
- Development mode shows stack traces

### 4. **Visual Feedback**
- Progress bar showing completion percentage
- Real-time display of collected data
- Current phase indicator

## File Structure

```
/app/chat2/
  └── page.tsx                          # Chat2 page route

/components/chat2/
  ├── chat2-interface.tsx               # Main chat interface
  └── chat2-message.tsx                 # Message component

/app/api/chat2/turn_response/
  └── route.ts                          # API endpoint

/config/
  └── chat2-constants.ts                # System prompt & state management
```

## How It Works

### Conversation Flow (12 Steps)

1. **PRODUCT** - Ask for product name
2. **COUNTRY** - Ask for target country
3. **GTIP_CODE** - Ask for GTIP code
4. **SALES_CHANNELS** - Ask for sales channels
5. **WEBSITE** - Ask for company website
6. **NAME** - Ask for user's name
7. **EMAIL** - Ask for corporate email (validated)
8. **PHONE** - Ask for phone number
9. **KEYWORDS** - Generate and confirm keywords
10. **COMPETITORS** - Find and present 2 competitors
11. **CUSTOMERS** - Find and present 2 potential customers
12. **DEMO** - Offer demo call and provide summary

### State Management

```typescript
interface Chat2ConversationState {
  currentPhase: ConversationPhase;  // Current step (1-12)
  data: {                           // Collected information
    product?: string;
    country?: string;
    gtipCode?: string;
    salesChannels?: string[];
    website?: string;
    name?: string;
    email?: string;
    phone?: string;
    keywords?: string[];
    competitors?: Array<{ name: string; website: string }>;
    customers?: Array<{ name: string; website: string }>;
  };
  language: 'turkish' | 'english';  // Detected language
  phaseCompleted: {                 // Completion tracking
    [key in ConversationPhase]?: boolean;
  };
}
```

### Phase Validation

Each phase has its own validator function:

```typescript
phaseValidators = {
  [ConversationPhase.PRODUCT]: (response: string) => response.trim().length > 0,
  [ConversationPhase.COUNTRY]: (response: string) => /* validate country */,
  [ConversationPhase.EMAIL]: (response: string) => /* validate corporate email */,
  // ... etc
}
```

## Testing

1. Navigate to `/chat2` (or click "Chat v2 (Test)" button in header)
2. Follow the conversation flow
3. Check browser console for detailed logs
4. Monitor the progress bar and collected data indicators

## Debugging

The system includes extensive logging:

- 📥 Request received
- 📝 Messages count
- 🔄 Current state
- 💬 User input
- 📊 Data updates
- ✅ Validation results
- ⏭️ Phase advancement
- 🤖 OpenAI API calls
- 📤 Response sent

All logs are prefixed with emojis for easy identification in the console.

## Known Limitations

1. **Web Search Tool**: Currently disabled - needs proper integration with OpenAI's API
2. **Tool Calls**: Basic handling in place, needs enhancement for competitors/customers search
3. **Language Switching**: Not supported mid-conversation (by design)

## Future Enhancements

1. Integrate proper web search functionality for competitors/customers
2. Add conversation persistence (database storage)
3. Add admin dashboard for reviewing conversations
4. Implement A/B testing between chat and chat2
5. Add analytics tracking

## Comparison with Original System

| Feature | Original Chat | Chat2 |
|---------|--------------|-------|
| Prompt Size | 668 lines | 120 lines |
| State Flags | 20+ booleans | 1 enum |
| Error Messages | Generic | Detailed |
| Progress Tracking | None | Visual bar |
| Debugging | Limited logs | Extensive logs |
| Phase Control | Reactive | Proactive |

## Notes

- This is a **test system** running alongside the original chat
- No changes were made to the original `/chat` page or its logic
- The system uses the same OpenAI API key as the original
- Model: `gpt-4o` (can be changed in route.ts)

## Contact

For questions or issues with Chat2, check the console logs first. The detailed logging should help identify most problems quickly.

