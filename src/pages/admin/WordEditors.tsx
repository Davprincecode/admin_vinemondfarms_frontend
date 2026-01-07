import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import Quill from "quill";
// import { Attributor } from "parchment";

import ImageResize from "quill-image-resize-module-react";

import "react-quill/dist/quill.snow.css";
import {
  FaBold, FaItalic, FaUnderline,
  FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaListUl, FaListOl, FaLink, FaImage,
  FaUndo, FaRedo, FaTable, FaChartBar,
  FaAlignJustify
} from "react-icons/fa";



// Register custom size and font whitelist
const SizeStyle = Quill.import("attributors/style/size") as any;
SizeStyle.whitelist = ["12px", "14px", "16px", "18px", "20px", "22px", "24px", "26px", "28px", "30px"];
Quill.register(SizeStyle, true);

const Font = Quill.import("formats/font") as any;
Font.whitelist = ["arial", "georgia", "times-new", "courier-new", "tahoma", "verdana"];
Quill.register(Font, true);

const AlignStyle = Quill.import("attributors/style/align") as any;
AlignStyle.whitelist = ["left", "center", "right", "justify"];
Quill.register(AlignStyle, true);

type Props = {
  editorContent: string;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
};


const WordEditor: React.FC<Props> = ({ editorContent, setEditorContent }) => {

  const quillRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [activeTab, setActiveTab] = useState<"home" | "insert" | "layout">("home");
  
  const [fontSize, setFontSize] = useState("16px");
  const [fontFamily, setFontFamily] = useState("arial");

  const getEditor = () => quillRef.current?.getEditor();
  

  const applyFormat = (format: string, value: any) => {
    const editor = getEditor();
    if (!editor) return;
    editor.format(format, value);
    editor.focus();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = () => {
      const editor = getEditor();
      if (!editor) return;
      const range = editor.getSelection() || { index: editor.getLength(), length: 0 };
      editor.insertEmbed(range.index, "image", reader.result);
      editor.insertText(range.index + 1, "\n");
      editor.setSelection(range.index + 2);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";

  };

  const insertImageFromUrl = () => {
    const url = prompt("Paste image URL");
    if (!url) return;
    const editor = getEditor();
    if (!editor) return;
    const range = editor.getSelection() || { index: editor.getLength(), length: 0 };
    editor.insertEmbed(range.index, "image", url);
    editor.insertText(range.index + 1, "\n");
    editor.setSelection(range.index + 2);
  };

  const insertLink = () => {
    const editor = getEditor();
    if (!editor) return;
    const url = prompt("Enter URL (https://...)");
    if (!url) return;
    const range = editor.getSelection();
    if (!range || range.length === 0) {
      editor.insertText(range ? range.index : editor.getLength(), url, "link", url);
    } else {
      editor.format("link", url);
    }
  };

  const insertTable = (rows = 2, cols = 2) => {
    const editor = getEditor();
    if (!editor) return;
    const range = editor.getSelection() || { index: editor.getLength(), length: 0 };
    let html = `<table class="ql-custom-table"><tbody>`;
    for (let r = 0; r < rows; r++) {
      html += "<tr>";
      for (let c = 0; c < cols; c++) {
        html += `<td>&nbsp;</td>`;
      }
      html += "</tr>";
    }
    html += `</tbody></table><p><br></p>`;
    editor.clipboard.dangerouslyPasteHTML(range.index, html);
    editor.setSelection(range.index + 1);
  };

  const insertChart = () => {
    const labelsInput = prompt("Chart labels (comma separated)");
    const valuesInput = prompt("Chart values (comma separated)");
    if (!labelsInput || !valuesInput) return;

    const labels = labelsInput.split(",").map(s => s.trim());
    const values = valuesInput.split(",").map(s => parseFloat(s.trim()) || 0);

    const canvas = document.createElement("canvas");
    canvas.width = 700;
    canvas.height = 380;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const padding = 60;
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
      ctx.fillStyle = "#333";
      ctx.font = "14px Arial";
      ctx.fillText(labels[i], x, canvas.height - padding + 18);
      ctx.fillText(String(values[i]), x, y - 6);
    }

    ctx.strokeStyle = "#333";
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    const dataUrl = canvas.toDataURL("image/png");
    const editor = getEditor();
    if (!editor) return;
    const range = editor.getSelection() || { index: editor.getLength(), length: 0 };
    editor.insertEmbed(range.index, "image", dataUrl);
    editor.insertText(range.index + 1, "\n");
    editor.setSelection(range.index + 2);
  };

  const undo = () => getEditor()?.history?.undo();
  const redo = () => getEditor()?.history?.redo();

  useEffect(() => {
    const editor = getEditor();
    if (!editor) return;
    editor.format("size", fontSize);
    editor.format("font", fontFamily);
  }, [fontSize, fontFamily]);

  return (
    <div className="word-edit" style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div className="admin-prod-title blog-title">Blog Bodyyy</div>

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

      <div style={{ marginBottom: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {activeTab === "home" && (
          <>
            <FaBold onClick={() => applyFormat("bold", true)} />
            <FaItalic onClick={() => applyFormat("italic", true)} />
            <FaUnderline onClick={() => applyFormat("underline", true)} />

            <FaAlignLeft onClick={() => applyFormat("align", "")} />
            <FaAlignCenter onClick={() => applyFormat("align", "center")} />
            <FaAlignRight onClick={() => applyFormat("align", "right")} />
            <FaAlignJustify  onClick={() => applyFormat("align", "justify")} />
              

            <FaListUl onClick={() => applyFormat("list", "bullet")} />
            <FaListOl onClick={() => applyFormat("list", "ordered")} />
            <FaUndo onClick={undo} />
            <FaRedo onClick={redo} />
          </>
        )}

                {activeTab === "insert" && (
          <>
            <FaImage onClick={insertImageFromUrl} />
            <FaLink onClick={insertLink} />
            <FaTable onClick={() => insertTable(3, 3)} />
            <FaChartBar onClick={insertChart} />
            <button onClick={() => fileInputRef.current?.click()}>Upload Image</button>
          </>
        )}

        {activeTab === "layout" && (
          <>
            <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
              {SizeStyle.whitelist.map((size: string) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>

            <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
              {Font.whitelist.map((font: string) => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </>
        )}
      </div>

      {/* Editor */}
      <ReactQuill
        ref={quillRef}
        value={editorContent}
        onChange={setEditorContent}
        theme="snow"
        // modules={modules}
        style={{ height: "400px", marginBottom: "20px" }}
      />

      {/* Hidden file input for image upload */}
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

export default WordEditor;
