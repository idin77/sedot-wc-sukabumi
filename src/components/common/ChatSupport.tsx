import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export const ChatSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: 'Halo! Ada yang bisa kami bantu terkait layanan sedot WC?' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessages([...messages, { sender: 'user', text: message }]);
    setMessage('');
    // Simulate a response
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Terima kasih atas pesannya. Tim kami akan segera merespons Anda.' }]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 p-4 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 transition"
        aria-label="Open Chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-36 right-4 z-50 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
          <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
            <span className="font-semibold">Layanan Pelanggan</span>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
          </div>
          <div className="h-64 p-4 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`p-2 rounded-lg text-sm ${m.sender === 'user' ? 'bg-blue-100 dark:bg-blue-900 ml-auto' : 'bg-gray-100 dark:bg-gray-700'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-3 border-t dark:border-gray-700 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pesan..."
              className="flex-grow p-2 text-sm border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
            <button type="submit" className="text-blue-600"><Send className="w-5 h-5" /></button>
          </form>
        </div>
      )}
    </>
  );
};
