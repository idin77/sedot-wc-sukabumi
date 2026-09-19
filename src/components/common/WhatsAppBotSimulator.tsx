import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const DEFAULT_RESPONSES: Record<string, string> = {
  'harga': 'Harga layanan sedot WC kami dimulai dari Rp 700.000, tergantung pada jarak dan tingkat kesulitan pengerjaan. Untuk detail lebih lanjut, silakan konsultasikan dengan tim kami.',
  'lokasi': 'Kami melayani seluruh wilayah Sukabumi dan sekitarnya. Silakan beri tahu lokasi spesifik Anda agar kami bisa segera meluncur.',
  'jadwal': 'Kami beroperasi 24 jam setiap hari. Kami bisa meluncur ke lokasi Anda kapan saja, bahkan untuk layanan darurat.',
  'default': 'Halo! Ada yang bisa kami bantu? Anda bisa bertanya tentang: "harga", "lokasi", atau "jadwal".'
};

export const WhatsAppBotSimulator: React.FC = () => {
  const [responses, setResponses] = useState(DEFAULT_RESPONSES);

  useEffect(() => {
    const saved = localStorage.getItem('whatsapp_bot_responses');
    if (saved) {
      setResponses(JSON.parse(saved));
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user', text: string }[]>([
    { sender: 'bot', text: responses.default }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    
    const lowerInput = userMessage.toLowerCase();
    const foundKey = Object.keys(responses).find(key => key !== 'default' && lowerInput.includes(key));
    
    if (foundKey) {
      const stats = JSON.parse(localStorage.getItem('whatsapp_bot_stats') || '{}');
      stats[foundKey] = (stats[foundKey] || 0) + 1;
      localStorage.setItem('whatsapp_bot_stats', JSON.stringify(stats));
    }

    const botResponse = foundKey 
      ? responses[foundKey] 
      : 'Maaf, kami kurang mengerti. Coba tanyakan "harga", "lokasi", atau "jadwal".';
      
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 500);
    
    setInput('');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
      >
        <MessageCircle size={28} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-96">
      <div className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h4 className="font-bold">Chat Bantuan (Simulasi)</h4>
        <button onClick={() => setIsOpen(false)}><X size={20} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`text-sm p-2 rounded-lg ${m.sender === 'bot' ? 'bg-gray-100 dark:bg-gray-700' : 'bg-blue-100 dark:bg-blue-900 text-right'}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ketik pesan..."
          className="flex-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
        />
        <button onClick={handleSend} className="text-green-600"><Send size={20} /></button>
      </div>
    </div>
  );
};
