import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, Send, Sparkles, User } from "lucide-react";
import { useState } from "react";

interface AIAssistantProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export function AIAssistant({ open, onOpenChange }: AIAssistantProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm your Planext AI Assistant. How can I help you today? I can assist with scheduling, property details, or market insights.",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue("");

        // Simulate AI response
        setTimeout(() => {
            const responseMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I've received your request. I'm processing that for you right now.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, responseMessage]);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                        Planext AI Assistant
                    </SheetTitle>
                    <SheetDescription>
                        Ask me anything about your properties or schedule.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-hidden py-4">
                    <ScrollArea className="h-full pr-4">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <Avatar className="h-8 w-8">
                                        {message.role === 'assistant' ? (
                                            <>
                                                <AvatarImage src="/bot-avatar.png" />
                                                <AvatarFallback className="bg-blue-100 text-blue-600">AI</AvatarFallback>
                                            </>
                                        ) : (
                                            <>
                                                <AvatarImage src="/user-avatar.png" />
                                                <AvatarFallback className="bg-slate-100 text-slate-600">ME</AvatarFallback>
                                            </>
                                        )}
                                    </Avatar>
                                    <div
                                        className={`rounded-lg px-3 py-2 text-sm max-w-[80%] ${
                                            message.role === 'user'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-muted text-foreground'
                                        }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                <div className="border-t pt-4 mt-auto">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="shrink-0 rounded-full text-muted-foreground hover:text-primary hover:bg-muted/50">
                            <Mic className="h-5 w-5" />
                        </Button>
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                            className="flex-1 rounded-full bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-all"
                        />
                        <Button 
                            onClick={handleSendMessage} 
                            size="icon" 
                            className="shrink-0 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                            disabled={!inputValue.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
