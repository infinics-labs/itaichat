import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string | any;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  // Function to make URLs clickable
  const renderMessageWithLinks = (content: any) => {
    // Ensure content is a string
    const contentStr = String(content || '');
    
    const urlRegex = /(https?:\/\/[^\s\)]+|(?:www\.)?[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+(?:\/[^\s\)]*)?)/g;
    const parts = contentStr.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part && part.match(urlRegex)) {
        const href = part.startsWith('http') ? part : `https://${part}`;
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline cursor-pointer break-all font-medium ${
              isUser ? "text-white hover:text-blue-200" : "text-blue-600 hover:text-blue-800"
            }`}
            onClick={(e) => {
              e.preventDefault();
              window.open(href, '_blank');
            }}
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-900">
          <AvatarFallback className="text-white text-xs font-bold">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-xs rounded-2xl p-4 shadow-sm ${
        isUser
          ? "bg-gradient-to-r from-orange-500 to-blue-900 text-white rounded-tr-md"
          : "bg-white border rounded-tl-md"
      }`}>
        <div className={`text-sm whitespace-pre-wrap ${
          isUser ? "text-white" : "text-gray-800"
        }`}>
          {renderMessageWithLinks(message.content)}
        </div>
      </div>
      
      {isUser && (
        <Avatar className="w-8 h-8 bg-gray-200">
          <AvatarFallback>
            <User className="w-4 h-4 text-gray-600" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
