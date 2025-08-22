'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { askQuestion } from '@/app/actions';
import type { ChatMessage as ChatMessageType } from '@/lib/types';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatInput } from '@/components/chat/chat-input';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // This will only run on the client, after initial hydration
    setMessages([
      {
        id: crypto.randomUUID(),
        role: 'bot',
        content: 'Hello! How can I help you with DTable Analytics AppScript project creation today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, []);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);

    startTransition(async () => {
      try {
        const botResponse = await askQuestion(content);
        const botMessage: ChatMessageType = {
          id: crypto.randomUUID(),
          role: 'bot',
          content: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        const errorMessage: ChatMessageType = {
          id: crypto.randomUUID(),
          role: 'bot',
          content: 'Sorry, something went wrong. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    });
  };

  return (
    <div className="flex h-[calc(100svh-theme(spacing.14))] flex-col bg-background">
      <ChatMessages messages={messages} isLoading={isPending} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isPending} />
    </div>
  );
}
