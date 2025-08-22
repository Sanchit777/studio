'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, LoaderCircle } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !content.trim()) return;
    onSendMessage(content);
    setContent('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as unknown as React.FormEvent);
    }
  }

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="border-t bg-card p-4">
      <form onSubmit={handleSubmit} className="relative flex items-end gap-3">
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about creating an AppScript project..."
          className="max-h-48 min-h-[40px] flex-1 resize-none pr-12"
          rows={1}
          disabled={isLoading}
          aria-label="Chat input"
        />
        <Button type="submit" size="icon" className="absolute bottom-1.5 right-2" disabled={isLoading || !content.trim()}>
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Send />
          )}
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
