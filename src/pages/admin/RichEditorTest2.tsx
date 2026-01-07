import React, { useRef, useState } from "react";
import {
  FaBold, FaItalic, FaUnderline,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,
  FaListUl, FaListOl,
  FaUndo, FaRedo,
  FaImage, FaLink, FaTable
} from "react-icons/fa";

const RichEditorTest2: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"home" | "insert" | "layout">("home");
  const [fontSize, setFontSize] = useState("16px");
  const [fontFamily, setFontFamily] = useState("Arial");

  // --- Core helpers ---
  const getSelectionRange = (): Range | null => {
    const sel = window.getSelection();
    return sel && sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
  };

  // --- Inline formatting ---
const applyInlineStyle = (
  command: "bold" | "italic" | "underline"
) => {
  editorRef.current?.focus();

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (range.collapsed) return;

  let wrapper: HTMLElement;

  switch (command) {
    case "bold":
      wrapper = document.createElement("strong");
      break;
    case "italic":
      wrapper = document.createElement("em");
      break;
    case "underline":
      wrapper = document.createElement("u");
      break;
    default:
      return; // TS is now satisfied
  }

  const content = range.extractContents();
  wrapper.appendChild(content);
  range.insertNode(wrapper);

  // move caret after wrapper
  selection.removeAllRanges();
  const newRange = document.createRange();
  newRange.setStartAfter(wrapper);
  newRange.collapse(true);
  selection.addRange(newRange);
};




  // --- Alignment ---
  const applyAlignment = (align: "left" | "center" | "right" | "justify") => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  
  const range = sel.getRangeAt(0);

  let node = range.startContainer as HTMLElement;
  while (node && node !== editorRef.current && node.nodeType === Node.TEXT_NODE) {
    node = node.parentElement!;
  }
  if (node && node !== editorRef.current) {
    (node as HTMLElement).style.textAlign = align;
  }
};

  // --- Lists ---
 const insertList = (ordered: boolean) => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);

  const list = document.createElement(ordered ? "ol" : "ul");
  const li = document.createElement("li");

  if (range.collapsed) {
    li.textContent = "List item";
  } else {
    li.appendChild(range.extractContents());
  }
  list.appendChild(li);
  range.insertNode(list);
};


  // --- Insert image ---
  const insertImageFromUrl = (url?: string, width = 300, height: string | number = "auto") => {
    if (!url) {
      url = prompt("Enter image URL") || "";
      if (!url) return;
    }
    const range = getSelectionRange();
    if (!range) return;
    const wrapper = document.createElement("div");
    wrapper.className = "resizable-image";
    wrapper.contentEditable = "false";
    const img = document.createElement("img");
    img.src = url;
    img.style.width = typeof width === "number" ? `${width}px` : width;
    img.style.height = typeof height === "number" ? `${height}px` : height;
    wrapper.appendChild(img);
    range.insertNode(wrapper);
  };

  // --- Insert link ---
  const insertLink = () => {
    const range = getSelectionRange();
    if (!range) return;
    const url = prompt("Enter link URL");
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.textContent = range.toString() || url;
    range.deleteContents();
    range.insertNode(a);
  };

  // --- Insert table ---
  const insertTable = (rows = 2, cols = 2) => {
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    for (let r = 0; r < rows; r++) {
      const tr = document.createElement("tr");
      for (let c = 0; c < cols; c++) {
        const td = document.createElement("td");
        td.textContent = `Row ${r+1}, Col ${c+1}`;
        td.style.border = "1px solid #000";
        td.style.padding = "4px";
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    const range = getSelectionRange();
    if (!range) return;
    range.insertNode(table);
  };

  // --- Font size & family ---
  const applyFontSize = (size: string) => {
    const range = getSelectionRange();
    if (!range) return;
    const span = document.createElement("span");
    span.style.fontSize = size;
    range.surroundContents(span);
  };

  const applyFontFamily = (family: string) => {
    const range = getSelectionRange();
    if (!range) return;
    const span = document.createElement("span");
    span.style.fontFamily = family;
    range.surroundContents(span);
  };

  // --- Undo/Redo (basic) ---
  const undo = () => document.execCommand("undo");
  const redo = () => document.execCommand("redo");

  // --- Save content to backend ---
  const saveContent = () => {
    const content = editorRef.current?.innerHTML || "";
    console.log("Send to backend:", content);
    // sendToBackend(content)
  };

  return (
    <div  className='rich-editor'>

        <div className="toolbarcon">
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          {["home", "insert", "layout"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                padding: "8px 16px",
                backgroundColor: activeTab === tab ? "#007bff" : "#eee",
                color: activeTab === tab ? "#fff" : "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ marginBottom: "10px",  display: "flex", gap: "8px", flexWrap: "wrap" }}>

        {activeTab === "home" && (
          <>
          <div onMouseDown={() => applyInlineStyle("bold")}>b</div>
            <FaBold  onMouseDown={() => applyInlineStyle("bold")}/>
            <FaItalic onMouseDown={() => applyInlineStyle("italic")} />
            <FaUnderline onMouseDown={() => applyInlineStyle("underline")} />

            <FaAlignLeft onMouseDown={() => applyAlignment("left")} />
            <FaAlignCenter onMouseDown={() => applyAlignment("center")} />
            <FaAlignRight onMouseDown={() => applyAlignment("right")} />
            <FaAlignJustify onMouseDown={() => applyAlignment("justify")} />

            <FaListUl onClick={() => insertList(false)} />
            <FaListOl onClick={() => insertList(true)} />

            <FaUndo onClick={undo} />
            <FaRedo onClick={redo} />
          </>
        )}

        {activeTab === "insert" && (
          <>
            <FaImage onClick={() => insertImageFromUrl()} />
            <FaLink onClick={insertLink} />
            <FaTable onClick={() => insertTable()} />
            <button onClick={() => fileInputRef.current?.click()}>Upload Image</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    insertImageFromUrl(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </>
        )}

        {activeTab === "layout" && (
          <>
            <select
              value={fontSize}
              onChange={(e) => {
                setFontSize(e.target.value);
                applyFontSize(e.target.value);
              }}
            >
              {["12px","14px","16px","18px","20px","24px"].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>

            <select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
                applyFontFamily(e.target.value);
              }}
            >
              {["Arial","Georgia","Times New Roman","Courier New","Verdana"].map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </>
        )}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        suppressContentEditableWarning
        style={{ minHeight: "200px", border: "1px solid #ccc", padding: "8px" }}
      />

      {/* <button onClick={saveContent}>Save Blog</button> */}
    </div>
  );
};

export default RichEditorTest2;
