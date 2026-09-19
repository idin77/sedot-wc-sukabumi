import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnnouncementContextType {
  announce: (message: string) => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export const AnnouncementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');

  const announce = (msg: string) => {
    setMessage(msg);
    // Clear message after announcement to allow re-announcing same message if needed
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <AnnouncementContext.Provider value={{ announce }}>
      {children}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </div>
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => {
  const context = useContext(AnnouncementContext);
  if (!context) {
    throw new Error('useAnnouncement must be used within an AnnouncementProvider');
  }
  return context;
};
