import React, { useEffect, useRef, useState } from 'react';
import {
  FaBold, FaItalic, FaUnderline,
  FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaListUl, FaListOl, FaLink, FaImage,
  FaUndo, FaRedo, FaTable, FaChartBar,
  FaAlignJustify
} from "react-icons/fa";
import './RichEditor.css';

const RichEditor: React.FC = () => {

  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [activeTab, setActiveTab] = useState<"home" | "insert" | "layout">("home");
  const [fontSize, setFontSize] = useState("16px");
  const [fontFamily, setFontFamily] = useState("arial");

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: "",
    list: "",
  });

  const lastSelectionRef = useRef<Range | null>(null);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (!editorRef.current?.contains(range.startContainer)) return;
    lastSelectionRef.current = range.cloneRange();
  };

  const restoreSelection = () => {
    const range = lastSelectionRef.current;
    if (!range) return;
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    editorRef.current?.focus();
  };

  const execCommand = (command: string, value?: string) => {
    restoreSelection();
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateActiveFormats();
  };

  const toggleFormat = (format: keyof typeof activeFormats, command: string, value?: string) => {
    restoreSelection();
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateActiveFormats();
  };

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      align: document.queryCommandState("justifyCenter")
        ? "center"
        : document.queryCommandState("justifyRight")
        ? "right"
        : "left",
      list: document.queryCommandState("insertUnorderedList")
        ? "bullet"
        : document.queryCommandState("insertOrderedList")
        ? "ordered"
        : "",
    });
  };

  const insertTable = () => {
    restoreSelection();
    const tableHTML = `
      <table border="1" style="border-collapse: collapse;">
        <tr><td>Row 1 Col 1</td><td>Row 1 Col 2</td></tr>
        <tr><td>Row 2 Col 1</td><td>Row 2 Col 2</td></tr>
      </table>`;
    document.execCommand('insertHTML', false, tableHTML);
    editorRef.current?.focus();
  };


 const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      // Ensure editor is focused before inserting
      editorRef.current?.focus();
      insertImageFromUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};

const insertImageFromUrl = (url?: string) => {
  // Make sure selection is restored inside the editor
  restoreSelection();

  if (!url) {
    url = prompt("Enter image URL") || "";
    if (!url) return;
  }

  const id = `img-${Date.now()}`;
  const html = `
    <div class="resizable-image" contenteditable="false" data-id="${id}">
      <img src="${url}" style="width:300px; height:auto;" />
      <div class="resizer top-left"></div>
      <div class="resizer top-right"></div>
      <div class="resizer bottom-left"></div>
      <div class="resizer bottom-right"></div>
      <div class="resizer top"></div>
      <div class="resizer bottom"></div>
      <div class="resizer left"></div>
      <div class="resizer right"></div>
    </div>`;

  document.execCommand("insertHTML", false, html);

  // Refocus editor after insertion
  editorRef.current?.focus();
};


  const insertLink = () => {
    restoreSelection();
    const url = prompt("Enter URL (https://...)");
    if (!url) return;
    const selectionText = window.getSelection()?.toString();
    const html = `<a href="${url}" target="_blank">${selectionText && selectionText.length ? selectionText : url}</a>`;
    document.execCommand("insertHTML", false, html);
    editorRef.current?.focus();
  };

  const insertChart = () => {
    restoreSelection();
    const labelsInput = prompt("Chart labels (comma separated)");
    const valuesInput = prompt("Chart values (comma separated)");
    if (!labelsInput || !valuesInput) return;

    const labels = labelsInput.split(",").map(s => s.trim());
    const values = valuesInput.split(",").map(s => parseFloat(s.trim()) || 0);

    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const padding = 40;
    const chartW = canvas.width - padding * 2;
    const chartH = canvas.height - padding * 2;
    const maxVal = Math.max(...values, 1);
    const barW = chartW / values.length * 0.6;

    for (let i = 0; i < values.length; i++) {
      const x = padding + (i + 0.2) * (chartW / values.length);
      const h = (values[i] / maxVal) * chartH;
      const y = canvas.height - padding - h;
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(x, y, barW, h);
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.fillText(labels[i], x, canvas.height - padding + 15);
      ctx.fillText(String(values[i]), x, y - 5);
    }

    const dataUrl = canvas.toDataURL("image/png");
    const html = `<img src="${dataUrl}" style="width:100%; max-width:600px;" />`;
    document.execCommand("insertHTML", false, html);
    editorRef.current?.focus();
  };

  const undo = () => {
    restoreSelection();
    document.execCommand("undo");
    editorRef.current?.focus();
    updateActiveFormats();
  };

  const redo = () => {
    restoreSelection();
    document.execCommand("redo");
    editorRef.current?.focus();
    updateActiveFormats();
  };

 useEffect(() => {
  const editor = editorRef.current;
  if (!editor) return;

  const handleClick = (e: MouseEvent) => {
    editor.querySelectorAll('.resizable-image').forEach((el) =>
      el.classList.remove('selected')
    );
    const target = e.target as HTMLElement;
    if (target.classList.contains("resizer")) return;
    const container = target.closest('.resizable-image') as HTMLElement;
    if (container) container.classList.add('selected');
  };

  const handleResizeStart = (e: MouseEvent) => {
    const resizer = e.target as HTMLElement;
    const direction = Array.from(resizer.classList).find((cls) =>
      ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(cls)
    );

    const selected = editor.querySelector('.resizable-image.selected');
    if (!selected || !direction) return;

    const img = selected.querySelector('img') as HTMLImageElement;
    const rect = selected.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = rect.width;
    const startHeight = rect.height;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      if (direction.includes('right')) img.style.width = `${startWidth + dx}px`;
      if (direction.includes('left')) img.style.width = `${startWidth - dx}px`;
      if (direction.includes('bottom')) img.style.height = `${startHeight + dy}px`;
      if (direction.includes('top')) img.style.height = `${startHeight - dy}px`;
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  editor.addEventListener('click', handleClick);

  const observer = new MutationObserver(() => {
    editor.querySelectorAll('.resizer').forEach((resizer) => {
      resizer.removeEventListener('mousedown', handleResizeStart as EventListener);
      resizer.addEventListener('mousedown', handleResizeStart as EventListener);
    });
  });

  observer.observe(editor, { childList: true, subtree: true });

  return () => {
    editor.removeEventListener('click', handleClick);
    observer.disconnect();
  };
}, []);


  const SizeStyle = ["12px", "14px", "16px", "18px", "20px", "22px", "24px", "26px", "28px", "30px"];
  const Font = ["arial", "georgia", "times-new", "courier-new", "tahoma", "verdana"];

  return (
    <div className='rich-editor'>
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

      <div style={{ marginBottom: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {activeTab === "home" && (
          <>
            <FaBold
              onClick={() => toggleFormat("bold", "bold")}
              style={{ backgroundColor: activeFormats.bold ? "#91b3e0" : "transparent" }}
            />
            <FaItalic
              onClick={() => toggleFormat("italic", "italic")}
              style={{ backgroundColor: activeFormats.italic ? "#91b3e0" : "transparent" }}
            />
            <FaUnderline
              onClick={() => toggleFormat("underline", "underline")}
              style={{ backgroundColor: activeFormats.underline ? "#91b3e0" : "transparent" }}
            />

            <FaAlignLeft
              onClick={() => execCommand("justifyLeft")}
              style={{ backgroundColor: activeFormats.align === "left" ? "#91b3e0" : "transparent" }}
            />
            <FaAlignCenter
              onClick={() => execCommand("justifyCenter")}
              style={{ backgroundColor: activeFormats.align === "center" ? "#91b3e0" : "transparent" }}
            />
            <FaAlignRight
              onClick={() => execCommand("justifyRight")}
              style={{ backgroundColor: activeFormats.align === "right" ? "#91b3e0" : "transparent" }}
            />
             <FaAlignJustify 
             onClick={() => execCommand("justify")}
              style={{ backgroundColor: activeFormats.align === "justify" ? "#91b3e0" : "transparent" }}
             />

            <FaListUl
              onClick={() => toggleFormat("list", "insertUnorderedList")}
              style={{ backgroundColor: activeFormats.list === "bullet" ? "#91b3e0" : "transparent" }}
            />
            <FaListOl
              onClick={() => toggleFormat("list", "insertOrderedList")}
              style={{ backgroundColor: activeFormats.list === "ordered" ? "#91b3e0" : "transparent" }}
            />

            <FaUndo onClick={undo} />
            <FaRedo onClick={redo} />
          </>
        )}

        {activeTab === "insert" && (
          <>
            <FaImage onClick={() => insertImageFromUrl()} />
            <FaLink onClick={insertLink} />
            <FaTable onClick={() => insertTable()} />
            <FaChartBar onClick={insertChart} />

            <button onClick={() => fileInputRef.current?.click()}>Upload Image</button>

          </>
        )}

        {activeTab === "layout" && (
          <>
            <select
              value={fontSize}
              onChange={(e) => {
                setFontSize(e.target.value);
                execCommand("fontSize", "7");
                const fontElements = editorRef.current?.getElementsByTagName("font");
                if (fontElements && fontElements.length) {
                  const el = fontElements[0];
                  el.removeAttribute("size");
                  (el as HTMLElement).style.fontSize = e.target.value;
                }
              }}
            >
              {SizeStyle.map((size: string) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>

            <select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
                execCommand("fontName", e.target.value);
              }}
            >
              {Font.map((font: string) => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </>
        )}
      </div>

      <div
        ref={editorRef}
        className="editor"
        contentEditable
        suppressContentEditableWarning
      >
      </div>


      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={onFileChange}
      />

    </div>
  );
};

export default RichEditor;
