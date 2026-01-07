import React, { useRef, useState } from "react";

type StyleKey = "fontWeight" | "fontStyle" | "textDecoration";

const TextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  /* -----------------------------
     ENTER → <p><br /></p>
  ------------------------------ */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const p =
      range.startContainer.nodeType === Node.ELEMENT_NODE
        ? (range.startContainer as Element).closest("p")
        : range.startContainer.parentElement?.closest("p");

    if (!p || !p.parentNode) return;

    const newP = document.createElement("p");
    newP.appendChild(document.createElement("br"));
    p.parentNode.insertBefore(newP, p.nextSibling);

    const r = document.createRange();
    r.setStart(newP, 0);
    r.collapse(true);
    selection.removeAllRanges();
    selection.addRange(r);
  };

  /* -----------------------------
     HELPERS
  ------------------------------ */

  const getSelectedParagraphs = (range: Range): HTMLParagraphElement[] => {
    const startP = range.startContainer.parentElement?.closest("p");
    const endP = range.endContainer.parentElement?.closest("p");
    if (!startP || !endP) return [];

    const list: HTMLParagraphElement[] = [];
    let current: Element | null = startP;

    while (current) {
      if (current instanceof HTMLParagraphElement) list.push(current);
      if (current === endP) break;
      current = current.nextElementSibling;
    }

    return list;
  };

  const getOrCreateSpan = (range: Range): HTMLSpanElement => {
    const existing = range.startContainer.parentElement?.closest("span");
    if (existing) return existing;

    const span = document.createElement("span");
    span.appendChild(range.extractContents());
    range.insertNode(span);
    return span;
  };

  /* -----------------------------
     INLINE STYLE TOGGLE (CORE)
  ------------------------------ */

  const toggleInlineStyle = (
    style: StyleKey,
    on: string,
    off: string,
    key: "bold" | "italic" | "underline"
  ) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const paragraphs = getSelectedParagraphs(range);

    /* ---- MULTI PARAGRAPH (BLOCK) ---- */
    if (paragraphs.length > 1) {
      const allOn = paragraphs.every(p => (p.style as any)[style] === on);
      const value = allOn ? off : on;

      paragraphs.forEach(p => {
        (p.style as any)[style] = value;
      });

      setActive(s => ({ ...s, [key]: !allOn }));
      selection.removeAllRanges();
      return;
    }

    /* ---- FULL PARAGRAPH SELECTED ---- */
    const p = paragraphs[0];
    if (p && p.textContent?.trim() === range.toString().trim()) {
      const value = (p.style as any)[style] === on ? off : on;
      (p.style as any)[style] = value;
      setActive(s => ({ ...s, [key]: value === on }));
      selection.removeAllRanges();
      return;
    }

    /* ---- INLINE ---- */
    const span = getOrCreateSpan(range);
    const current = (span.style as any)[style];
    const value = current === on ? off : on;
    (span.style as any)[style] = value;

    setActive(s => ({ ...s, [key]: value === on }));
    selection.removeAllRanges();
  };

  return (
    <div>
      <button
        onClick={() => toggleInlineStyle("fontWeight", "bold", "normal", "bold")}
        style={{ background: active.bold ? "blue" : "white", color: active.bold ? "white" : "black" }}
      >
        Bold
      </button>

      <button
        onClick={() => toggleInlineStyle("fontStyle", "italic", "normal", "italic")}
        style={{ background: active.italic ? "blue" : "white", color: active.italic ? "white" : "black" }}
      >
        Italic
      </button>

      <button
        onClick={() => toggleInlineStyle("textDecoration", "underline", "none", "underline")}
        style={{ background: active.underline ? "blue" : "white", color: active.underline ? "white" : "black" }}
      >
        Underline
      </button>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
        style={{
          border: "1px solid #ccc",
          minHeight: "200px",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        <p><br /></p>
      </div>
    </div>
  );
};

export default TextEditor;
