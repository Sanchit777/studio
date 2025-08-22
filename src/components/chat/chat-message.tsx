'use client';

import type { ChatMessage as ChatMessageType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChatAvatar } from './chat-avatar';
import { Card, CardContent } from '../ui/card';

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const { toast } = useToast();
  const isBot = message.role === 'bot';

  const handleFeedback = (feedback: 'good' | 'bad') => {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for helping us improve!",
    });
  };

  return (
    <div
      className={cn(
        'group flex w-full items-start gap-3',
        !isBot && 'flex-row-reverse'
      )}
    >
      <ChatAvatar role={message.role} />
      <div
        className={cn(
          'flex flex-col gap-1 w-full max-w-[85%]',
          !isBot && 'items-end'
        )}
      >
        <Card
          className={cn(
            'rounded-xl text-sm shadow-sm',
            isBot
              ? 'bg-card'
              : 'bg-primary text-primary-foreground'
          )}
        >
          <CardContent className="p-3">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </CardContent>
        </Card>
        <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
            {isBot && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleFeedback('good')}>
                        <ThumbsUp className="h-4 w-4" />
                        <span className="sr-only">Good response</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleFeedback('bad')}>
                        <ThumbsDown className="h-4 w-4" />
                        <span className="sr-only">Bad response</span>
                    </Button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
