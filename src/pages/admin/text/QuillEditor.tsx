import React, { useEffect, useRef } from "react";
import Quill from "quill";
import ImageResize from "quill-image-resize-module--fix-imports-error";
import "quill/dist/quill.snow.css";

Quill.register("modules/imageResize", ImageResize);

interface QuillEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ header: [1, 2, 3, false] }],
            ["image"]
          ],
          imageResize: {
            displaySize: true
          }
        }
      });

      quillRef.current.on("text-change", () => {
        const html = quillRef.current!.root.innerHTML;
        onChange(html);
      });
    }
  }, [onChange]);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return <div ref={editorRef} style={{ height: "400px" }} />;
};

export default QuillEditor;
