import React, { useRef } from "react";

  const TextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  /* -----------------------
     ENTER → <p><br /></p>
  ------------------------ */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    // Current paragraph
    const currentP =
      range.startContainer.nodeType === Node.ELEMENT_NODE
        ? (range.startContainer as Element).closest("p")
        : range.startContainer.parentElement?.closest("p");
    if (!currentP || !currentP.parentNode) return;
    const newP = document.createElement("p");
    newP.appendChild(document.createElement("br"));
    // Insert AFTER current <p>
    currentP.parentNode.insertBefore(newP, currentP.nextSibling);
    // Move cursor into new paragraph
    const newRange = document.createRange();
    newRange.setStart(newP, 0);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
   };

  /* -----------------------
     SANITIZE SPANS
  ------------------------ */
  const sanitizeSpans = (root: HTMLElement) => {
    root.querySelectorAll("span").forEach((span) => {
      const style = span.style;
      const hasAllowedStyle =
        style.fontWeight ||
        style.fontStyle ||
        style.textDecoration ||
        style.color;
      // Remove spans without allowed styles
      if (!hasAllowedStyle) {
        span.replaceWith(...Array.from(span.childNodes));
        return;
      }

      // Remove noisy browser styles
      style.removeProperty("font-family");
      style.removeProperty("font-size");
      style.removeProperty("background-color");
      style.removeProperty("text-align");
    });
  };

  /* -----------------------
     INPUT CLEANUP
  ------------------------ */
  const handleInput = () => {
    const editor = editorRef.current;
    if (!editor) return;

    sanitizeSpans(editor);
  };

  /* -----------------------
     BOLD TOGGLE
  ------------------------ */
  const toggleBold = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (range.collapsed) return;

  /* -----------------------------
     HELPERS
  ------------------------------*/

  const unwrapSpan = (span: HTMLElement) => {
    // console.log("unwrapp");
     
    //  console.log(span.style.fontWeight);
    //  span.style.fontWeight == "normal" ? "bold" : "normal"
    while (span.firstChild) {
      span.parentNode?.insertBefore(span.firstChild, span);
    }
    span.remove();
  };

  const getSelectedParagraphs = (range: Range): HTMLParagraphElement[] => {
    const startP = range.startContainer.parentElement?.closest("p");
    const endP = range.endContainer.parentElement?.closest("p");
    if (!startP || !endP) return [];

    const paragraphs: HTMLParagraphElement[] = [];
    let current: Element | null = startP;

    while (current) {
      if (current.tagName === "P") {
        paragraphs.push(current as HTMLParagraphElement);
      }
      if (current === endP) break;
      current = current.nextElementSibling;
    }

    return paragraphs;
  };

  /* -----------------------------
     MULTI-PARAGRAPH TOGGLE
  ------------------------------*/

  const paragraphs = getSelectedParagraphs(range);

    if (paragraphs.length > 1) {
    const allBold = paragraphs.every(
        p => p.style.fontWeight === "bold"
    );

    const newWeight = allBold ? "normal" : "bold";

    paragraphs.forEach(p => {
        // 1️⃣ Remove all inline spans inside this paragraph
        p.querySelectorAll("span").forEach(span => {
        while (span.firstChild) {
            span.parentNode?.insertBefore(span.firstChild, span);
        }
        span.remove();
        });

        // 2️⃣ Toggle paragraph bold
        p.style.fontWeight = newWeight;
    });

    selection.removeAllRanges();
    return;
    }

  /* -----------------------------
     SINGLE PARAGRAPH CHECK
  ------------------------------*/

  const startP = paragraphs[0];
  const parentText = startP?.textContent?.trim();
  const selectedText = range.toString().trim();
  const fragment = range.cloneContents();
  const hasSpan = fragment.querySelector("span") !== null;
   
  const startSpan = range.startContainer.parentElement?.closest("span");
  const endSpan = range.endContainer.parentElement?.closest("span");
  
  // FULL paragraph selected → toggle paragraph bold
 if (startP && parentText === selectedText) {
  const newWeight =
    startP.style.fontWeight === "bold" ? "normal" : "bold";

  // Toggle paragraph
  startP.style.fontWeight = newWeight;

  // 🔥 Force ALL spans inside the paragraph to match
  startP.querySelectorAll("span").forEach(span => {
    span.style.fontWeight = newWeight;
  });

  selection.removeAllRanges();
  return;
}

  /* -----------------------------
     INLINE TOGGLE
  ------------------------------*/

  

  const fullyWrapped =
    startSpan &&
    endSpan &&
    startSpan === endSpan &&
    startSpan.style.fontWeight === "bold";

  if(startP.style.fontWeight == "bold"){
            // CASE 1: fully bold → remove bold
            const fullyWrapped =
                startSpan &&
                endSpan &&
                startSpan === endSpan &&
                startSpan.style.fontWeight === "normal";
            
        if (fullyWrapped) { 
            // unwrapSpan(startSpan);
            startSpan.style.fontWeight =
            startSpan.style.fontWeight == "normal" ? "bold" : "normal"
            selection.removeAllRanges();
            return;
        }
        // CASE 2: mixed formatting → normalize then bold
        if (hasSpan) {
            const extracted = range.extractContents();
            extracted.querySelectorAll("span").forEach(span => {
            unwrapSpan(span);
            });
            const boldSpan = document.createElement("span");
            boldSpan.style.fontWeight = "normal";
            boldSpan.appendChild(extracted);
            range.insertNode(boldSpan);
            selection.removeAllRanges();
            return;
        }

        // CASE 3: no span → apply bold
        const boldSpan = document.createElement("span");
        boldSpan.style.fontWeight = "normal";
        range.surroundContents(boldSpan);
        selection.removeAllRanges();
     return;
  }

// --------------------------------------------------------------- not bold -------------
  // CASE 1: fully bold → remove bold
  if (fullyWrapped) {
    // unwrapSpan(startSpan);
    // selection.removeAllRanges();

    startSpan.style.fontWeight =
            startSpan.style.fontWeight == "normal" ? "bold" : "normal"
            selection.removeAllRanges();
    return;
  }

  // CASE 2: mixed formatting → normalize then bold
  if (hasSpan) {
    const extracted = range.extractContents();
    extracted.querySelectorAll("span").forEach(span => {
      unwrapSpan(span);
    });
    const boldSpan = document.createElement("span");
    boldSpan.style.fontWeight = "bold";
    boldSpan.appendChild(extracted);
    range.insertNode(boldSpan);
    selection.removeAllRanges();
    return;
  }

  // CASE 3: no span → apply bold
  const boldSpan = document.createElement("span");
  boldSpan.style.fontWeight = "bold";
  range.surroundContents(boldSpan);
  selection.removeAllRanges();


 };

  /* -----------------------
     ITALIC
  ------------------------ */
const toggleItalic = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (range.collapsed) return;

  /* -----------------------------
     HELPERS
  ------------------------------*/

  const unwrapSpan = (span: HTMLElement) => {
    while (span.firstChild) {
      span.parentNode?.insertBefore(span.firstChild, span);
    }
    span.remove();
  };

  const getSelectedParagraphs = (range: Range): HTMLParagraphElement[] => {
    const startP = range.startContainer.parentElement?.closest("p");
    const endP = range.endContainer.parentElement?.closest("p");
    if (!startP || !endP) return [];

    const paragraphs: HTMLParagraphElement[] = [];
    let current: Element | null = startP;

    while (current) {
      if (current.tagName === "P") {
        paragraphs.push(current as HTMLParagraphElement);
      }
      if (current === endP) break;
      current = current.nextElementSibling;
    }

    return paragraphs;
  };

  /* -----------------------------
     MULTI-PARAGRAPH TOGGLE
  ------------------------------*/

  const paragraphs = getSelectedParagraphs(range);

  if (paragraphs.length > 1) {
    const allItalic = paragraphs.every(
      p => p.style.fontStyle === "italic"
    );

    const newStyle = allItalic ? "normal" : "italic";

    paragraphs.forEach(p => {
      p.querySelectorAll("span").forEach(span => unwrapSpan(span));
      p.style.fontStyle = newStyle;
    });

    selection.removeAllRanges();
    return;
  }

  /* -----------------------------
     SINGLE PARAGRAPH CHECK
  ------------------------------*/

  const startP = paragraphs[0];
  const parentText = startP?.textContent?.trim();
  const selectedText = range.toString().trim();
  const fragment = range.cloneContents();
  const hasSpan = fragment.querySelector("span") !== null;

  const startSpan = range.startContainer.parentElement?.closest("span");
  const endSpan = range.endContainer.parentElement?.closest("span");

  // FULL paragraph selected → toggle paragraph italic
  if (startP && parentText === selectedText) {
    const newStyle =
      startP.style.fontStyle === "italic" ? "normal" : "italic";

    startP.style.fontStyle = newStyle;

    // 🔥 force ALL spans to match paragraph
    startP.querySelectorAll("span").forEach(span => {
      span.style.fontStyle = newStyle;
    });

    selection.removeAllRanges();
    return;
  }

  /* -----------------------------
     INLINE TOGGLE
  ------------------------------*/

  const fullyWrapped =
    startSpan &&
    endSpan &&
    startSpan === endSpan &&
    startSpan.style.fontStyle === "italic";

  // paragraph already italic
  if (startP.style.fontStyle === "italic") {
    if (startSpan) {
      startSpan.style.fontStyle =
        startSpan.style.fontStyle === "italic" ? "normal" : "italic";

      selection.removeAllRanges();
      return;
    }
  }

  // CASE 1: fully italic → remove italic
  if (fullyWrapped && startSpan) {
    startSpan.style.fontStyle =
      startSpan.style.fontStyle === "italic" ? "normal" : "italic";

    selection.removeAllRanges();
    return;
  }

  // CASE 2: mixed formatting → normalize then italic
  if (hasSpan) {
    const extracted = range.extractContents();
    extracted.querySelectorAll("span").forEach(span => unwrapSpan(span));

    const italicSpan = document.createElement("span");
    italicSpan.style.fontStyle = "italic";
    italicSpan.appendChild(extracted);

    range.insertNode(italicSpan);
    selection.removeAllRanges();
    return;
  }

  // CASE 3: no span → apply italic
  const italicSpan = document.createElement("span");
  italicSpan.style.fontStyle = "italic";
  range.surroundContents(italicSpan);
  selection.removeAllRanges();
};

  
  return (
    <div>
      <button onClick={toggleBold}>Bold</button>
       <button onClick={toggleItalic}>italic</button>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        style={{
          border: "1px solid #ccc",
          minHeight: "200px",
          padding: "10px",
        }}
      >
        <p><br /></p>
      </div>
    </div>
  );
};

export default TextEditor;
