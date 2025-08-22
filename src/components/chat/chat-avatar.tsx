import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

export function ChatAvatar({ role }: { role: 'user' | 'bot' }) {
    if (role === 'user') {
        return (
            <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                </AvatarFallback>
            </Avatar>
        );
    }
    return (
        <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-accent/20 text-accent-foreground">
                <Bot className="h-5 w-5" />
            </AvatarFallback>
        </Avatar>
    );
}
