import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';
import ReactQuill from 'react-quill';
import { userAuth } from '../pages/context/AuthContext';
import EmailInput from './EmailInput';

interface authComponentInterface {
  authAction: boolean;
  setAuthAction: React.Dispatch<React.SetStateAction<boolean>>;
}

const ComposeMessage2 : React.FC<authComponentInterface> = ({ authAction, setAuthAction }) => {
  const { baseUrl } = userAuth();

  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [toEmails, setToEmails] = useState<string[]>([]);
  const [ccEmails, setCcEmails] = useState<string[]>([]);
  const [bccEmails, setBccEmails] = useState<string[]>([]);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    if (toEmails.length === 0) {
      toast.error("Please add at least one recipient in 'To'");
      return false;
    }
    if (!subject.trim()) {
      toast.error("Subject is required");
      return false;
    }
    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!address.trim()) {
      toast.error("Address is required");
      return false;
    }
    if (!phoneNumber.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (!message.trim()) {
      toast.error("Message body is required");
      return false;
    }
    return true;
  };

  const handleContact = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      subject,
      name,
      address,
      phoneNumber,
      message,
      to: toEmails,
      cc: ccEmails,
      bcc: bccEmails
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${baseUrl}/page-contact-us`, requestOptions);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      await response.json();
      setSubject('');
      setName('');
      setAddress('');
      setPhoneNumber('');
      setMessage('');
      setToEmails([]);
      setCcEmails([]);
      setBccEmails([]);
      toast.success("Message sent successfully");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ align: [] }],
      ['image'],
      ['clean']
    ]
  };

  const formats = ['header', 'bold', 'italic', 'underline', 'align', 'image'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="track-con" style={{ display: authAction ? "flex" : "none" }}>
      <div className="track-body">
        <div className="track-cancel-con flex-center justification-between">
          <h1>New Message</h1>
          <div className="cancel" onClick={() => setAuthAction(false)}>
            <RxCross2 />
          </div>
        </div>

        <div className="message-body">
          <EmailInput label="To:" emails={toEmails} setEmails={setToEmails} />
          <div className="toggle-fields">
            <button onClick={() => setShowCc(!showCc)}>Cc</button>
            <button onClick={() => setShowBcc(!showBcc)}>Bcc</button>
          </div>
          {showCc && <EmailInput label="Cc:" emails={ccEmails} setEmails={setCcEmails} />}
          {showBcc && <EmailInput label="Bcc:" emails={bccEmails} setEmails={setBccEmails} />}

          <div className="admin-input">
            <label>Subject:</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>

          <div className="admin-input">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="admin-input">
            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="admin-input">
            <label>Phone Number:</label>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>

          <div className="admin-input messageBody">
            <label>Message Body:</label>
            <ReactQuill
              value={message}
              onChange={setMessage}
              modules={modules}
              formats={formats}
              placeholder="Compose your message..."
              style={{ height: '200px' }}
            />
          </div>

          <div className="btn-flex-con messageBtn">
            <div className="enterBtn" onClick={handleContact}>
              {loading ? 'Sending...' : 'Send Message'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeMessage2;
