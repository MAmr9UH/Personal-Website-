import { useState } from 'react';
import { Plus, Mic, Send } from 'lucide-react';

const ChatBox = () => {
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Handle message sending logic here
      console.log('Message sent:', inputValue);
      setInputValue('');
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <div className="relative">
        {/* Main Search Box */}
        <div 
          className={`bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg transition-all duration-300 ${
            isExpanded ? 'shadow-xl' : 'hover:shadow-xl'
          }`}
        >
          <div className="flex items-center px-6 py-4 gap-4">
            {/* Plus Icon */}
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Plus size={20} />
            </button>

            {/* Input Field */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => !inputValue && setIsExpanded(false)}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-lg"
            />

            {/* Character Icon */}
            <img 
              src="/lovable-uploads/386b4f5a-c83f-4d0f-bc82-3d13a2dd7830.png" 
              alt="Character" 
              className="w-8 h-8 rounded-full object-cover"
            />

            {/* Right Icons */}
            <div className="flex items-center gap-2">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Mic size={20} />
              </button>
              
              {inputValue && (
                <button
                  onClick={handleSendMessage}
                  className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-all duration-300 animate-fade-in"
                >
                  <Send size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Expanded Options */}
        {isExpanded && (
          <div className="absolute top-full mt-2 w-full bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-xl p-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <button className="p-3 text-left rounded-lg hover:bg-accent transition-colors">
                <div className="font-medium">Portfolio Projects</div>
                <div className="text-muted-foreground text-xs">View my latest work</div>
              </button>
              <button className="p-3 text-left rounded-lg hover:bg-accent transition-colors">
                <div className="font-medium">Technical Skills</div>
                <div className="text-muted-foreground text-xs">Explore my expertise</div>
              </button>
              <button className="p-3 text-left rounded-lg hover:bg-accent transition-colors">
                <div className="font-medium">Experience</div>
                <div className="text-muted-foreground text-xs">Professional background</div>
              </button>
              <button className="p-3 text-left rounded-lg hover:bg-accent transition-colors">
                <div className="font-medium">Contact Info</div>
                <div className="text-muted-foreground text-xs">Get in touch</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;