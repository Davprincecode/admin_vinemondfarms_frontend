import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface EmailInputProps {
  label: string;
  emails: string[];
  setEmails: React.Dispatch<React.SetStateAction<string[]>>;
}

const EmailInput: React.FC<EmailInputProps> = ({ label, emails, setEmails }) => {
  const [input, setInput] = useState('');

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = input.trim();
      if (validateEmail(trimmed)) {
        setEmails([...emails, trimmed]);
        setInput('');
      } else {
        toast.error("Invalid email format");
      }
    }
  };

  const removeEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-input">
      <label>{label}</label>
      <div className="email-tags">
        {emails.map((email, index) => (
          <span key={index} className="email-tag">
            {email}
            <button onClick={() => removeEmail(index)}>×</button>
          </span>
        ))}
        <input
          type="text"
          placeholder="Enter email and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default EmailInput;
