// src/TestEditor.tsx
import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";

import "../WCustomImageBlot";
import "../WImageResize";

const modules = {
  toolbar: [["image"]],
  imageResize: true
};

export default function TestEditor() {

  const [content, setContent] = useState("");
  const quillRef = useRef<ReactQuill>(null);

  const insertImage = () => {
    const url = prompt("Enter image URL");
    if (!url) return;
    const editor = quillRef.current?.getEditor();
    const range = editor?.getSelection() || { index: editor?.getLength() || 0, length: 0 };
    editor?.insertEmbed(range.index, "image", url);
    editor?.setSelection({ index: range.index + 1, length: 0 });
  };

  return (
    <div className="editor-wrapper" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", position: "relative" }}>
      {/* <button onClick={insertImage}>Insert Image</button> */}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        style={{ height: "400px" }}
      />
    </div>
  );
}
