// src/pages/BlogEditor.tsx
import React, { useState } from "react";
import QuillEditor from "./QuillEditor";

const BlogTest: React.FC = () => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogText: content })
    });

    const data = await res.json();
    console.log("Saved:", data);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>Create Blog</h2>
      <QuillEditor value={content} onChange={setContent} />
      <button onClick={handleSubmit} style={{ marginTop: 20 }}>
        Save Blog
      </button>
    </div>
  );
};

export default BlogTest;
