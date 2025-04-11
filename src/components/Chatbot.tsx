
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X, MessageSquare } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{type: 'user' | 'bot', content: string}[]>([
    {type: 'bot', content: 'Hello! Welcome to HealthFact. How can I help you today?'}
  ]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, {type: 'user', content: message}]);
    
    // Clear input
    setMessage("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      let response = "I'm here to help with your health questions. Could you please provide more details?";
      
      // Simple keyword matching for demo purposes
      if (message.toLowerCase().includes("appointment")) {
        response = "You can book an appointment by navigating to the 'Appoint a Doctor' section in the menu.";
      } else if (message.toLowerCase().includes("symptom")) {
        response = "Please describe your symptoms in detail, and I can try to provide some general information. Remember to consult a healthcare professional for medical advice.";
      } else if (message.toLowerCase().includes("news")) {
        response = "You can check the latest health news in our News section. We update it regularly with the latest medical research and health tips.";
      }
      
      setChatHistory(prev => [...prev, {type: 'bot', content: response}]);
    }, 1000);
  };
  
  return (
    <>
      {/* Chat toggle button */}
      <Button 
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg bg-primary"
        onClick={toggleChat}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>
      
      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 sm:w-96 h-96 shadow-lg">
          <CardHeader className="bg-primary text-primary-foreground py-3">
            <CardTitle className="text-lg font-medium">HealthFact Support</CardTitle>
          </CardHeader>
          
          <ScrollArea className="h-64 p-4">
            <CardContent className="space-y-4">
              {chatHistory.map((chat, index) => (
                <div 
                  key={index} 
                  className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      chat.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary'
                    }`}
                  >
                    {chat.content}
                  </div>
                </div>
              ))}
            </CardContent>
          </ScrollArea>
          
          <CardFooter className="border-t p-2">
            <form onSubmit={handleSend} className="w-full flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send size={18} />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
