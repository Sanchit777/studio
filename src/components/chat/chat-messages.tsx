'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import type { ChatMessage as ChatMessageType } from '@/lib/types';
import { ChatMessage } from './chat-message';
import { useEffect, useRef } from 'react';
import { LoaderCircle } from 'lucide-react';
import { ChatAvatar } from './chat-avatar';
import { Card, CardContent } from '../ui/card';

export function ChatMessages({
  messages,
  isLoading,
}: {
  messages: ChatMessageType[];
  isLoading: boolean;
}) {
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollViewportRef.current) {
        scrollViewportRef.current.scrollTo({
            top: scrollViewportRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-1" viewportRef={scrollViewportRef}>
      <div className="p-4 md:p-6 space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
            <div className="flex items-start gap-3 animate-fade-in">
                <ChatAvatar role="bot" />
                <Card className="rounded-xl bg-card shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <LoaderCircle className="animate-spin h-4 w-4 text-primary" />
                      <span className="text-muted-foreground italic text-sm">DTable Assist is thinking...</span>
                    </div>
                  </CardContent>
                </Card>
            </div>
        )}
      </div>
    </ScrollArea>
  );
}
