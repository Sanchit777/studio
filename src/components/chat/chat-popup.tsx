'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, X, Send, LoaderCircle } from 'lucide-react';
import { askQuestion } from '@/app/actions';
import type { ChatMessage as ChatMessageType } from '@/lib/types';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatInput } from '@/components/chat/chat-input';
import { AnimatePresence, motion } from 'framer-motion';

export function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isPending, startTransition] = useTransition();
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setMessages([
        {
          id: 'initial-bot-message',
          role: 'bot',
          content: 'Hello! How can I help you with DTable Analytics AppScript project creation today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setHasOpened(true);
    }
  }, [isOpen, hasOpened]);

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
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="icon"
                className="rounded-full h-14 w-14 shadow-lg"
                onClick={() => setIsOpen(true)}
              >
                <Bot className="h-7 w-7" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Card className="w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] flex flex-col shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <Bot className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">DTable Assist</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <div className="flex-1 flex flex-col min-h-0">
                  <ChatMessages messages={messages} isLoading={isPending} />
                  <ChatInput onSendMessage={handleSendMessage} isLoading={isPending} />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
