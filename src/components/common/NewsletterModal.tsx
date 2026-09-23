import React, { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { Toast } from './Toast';

export const NewsletterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000);

    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY < 0) {
        setIsOpen(true);
        window.removeEventListener('mouseout', handleMouseOut);
      }
    };
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setShowToast(true);
    setIsOpen(false);
    setEmail('');
  };

  if (!showToast) return null;

  return (
    <>
      {showToast && (
        <Toast message="Terima kasih telah berlangganan!" type="success" onClose={() => setShowToast(false)} />
      )}
    </>
  );
};
