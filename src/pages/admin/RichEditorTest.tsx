import React, { useEffect, useRef, useState } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaUndo,
  FaRedo
} from "react-icons/fa";

const webSafeFonts: Record<string, string> = {
  arial: '"Arial", "Helvetica", sans-serif',
  helvetica: '"Helvetica", "Arial", sans-serif',
  verdana: '"Verdana", "Geneva", sans-serif',
  tahoma: '"Tahoma", "Geneva", sans-serif',
  trebuchet: '"Trebuchet MS", "Helvetica", sans-serif',
  times: '"Times New Roman", "Times", serif',
  georgia: '"Georgia", serif',
  courier: '"Courier New", "Courier", monospace',
  lucida: '"Lucida Console", "Monaco", monospace',
  comic: '"Comic Sans MS", cursive, sans-serif',
  impact: '"Impact", fantasy'
};

const RichEditorTest: React.FC = () => {

  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedRangeRef = useRef<Range | null>(null);

  const [activeTab, setActiveTab] = useState<"home" | "insert" | "layout">("home");
  const [fontSize, setFontSize] = useState("16px");
  const [fontFamily, setFontFamily] =  useState(webSafeFonts.arial);
  const sizeStyle = ["12px", "14px", "16px", "18px", "20px", "22px", "24px", "26px", "28px", "30px"];

  /* ===============================
     SELECTION HELPERS
  =============================== */
  const saveSelection = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (!editorRef.current?.contains(range.commonAncestorContainer)) return;
    savedRangeRef.current = range.cloneRange();
  };

  const restoreSelection = () => {
    if (!savedRangeRef.current) return;
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(savedRangeRef.current);
    editorRef.current?.focus();
  };

  const unwrapNodeTagInPlace = (node: Node, tag: string) => {
    if (!node.parentNode) return;
    if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName.toLowerCase() === tag) {
      const parent = node.parentNode;
      while (node.firstChild) parent.insertBefore(node.firstChild, node);
      parent.removeChild(node);
    } else {
      const children = Array.from(node.childNodes);
      for (const child of children) unwrapNodeTagInPlace(child, tag);
    }
  };

  const fragmentContainsTag = (frag: DocumentFragment, tag: string) => {
    const walker = document.createTreeWalker(frag, NodeFilter.SHOW_ELEMENT);
    let curr: Node | null;
    while ((curr = walker.nextNode())) {
      if ((curr as HTMLElement).tagName?.toLowerCase() === tag) return true;
    }
    return false;
  };

  const closestTagAncestor = (start: Node, tag: string): HTMLElement | null => {
    if (start.nodeType === Node.ELEMENT_NODE && (start as HTMLElement).tagName.toLowerCase() === tag)
      return start as HTMLElement;
    if (start.nodeType === Node.TEXT_NODE) start = (start.parentNode as Node) ?? start;
    return (start as HTMLElement).closest?.(tag) ?? null;
  };


  // Insert HTML at selection
  const insertHTML = (html: string) => {
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const frag = document.createDocumentFragment();
    while (temp.firstChild) frag.appendChild(temp.firstChild);
    range.insertNode(frag);
    saveSelection();
  };

  /* ===============================
     BLOCK ALIGNMENT
  =============================== */
  const applyAlignment = (align: "left" | "center" | "right" | "justify") => {
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    let node = sel.getRangeAt(0).commonAncestorContainer as HTMLElement;
    if (node.nodeType === Node.TEXT_NODE) node = node.parentElement!;
    const block = node.closest("p, div, li") as HTMLElement;
    if (!block) return;
    block.style.textAlign = align;
  };

  /* ===============================
     LISTS
  =============================== */
  const insertList = (type: "ul" | "ol") => {
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    const content = range.extractContents();
    const list = document.createElement(type);
    const li = document.createElement("li");
    li.appendChild(content);
    list.appendChild(li);
    range.insertNode(list);
    saveSelection();
  };

  /* ===============================
     LINKS, TABLES, IMAGES
  =============================== */
  const insertLink = () => {
    restoreSelection();
    const url = prompt("Enter URL");
    if (!url) return;
    const sel = window.getSelection();
    const text = sel?.toString() || url;
    insertHTML(`<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`);
  };

  const insertTable = () => {
    insertHTML(`
      <table border="1" style="border-collapse:collapse;width:100%">
        <tr><td>Cell</td><td>Cell</td></tr>
        <tr><td>Cell</td><td>Cell</td></tr>
      </table>
    `);
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
  insertHTML(html)
   
  
    // Refocus editor after insertion
    editorRef.current?.focus();
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
  /* ===============================
     GET HTML
  =============================== */
  const getHTML = () => {
    const html = editorRef.current?.innerHTML || "";
    console.log("SEND TO BACKEND:", html);
    return html;
  };

  

  // useEffect(() => {
  //   const editor = editorRef.current;
  //   if (!editor) return;

  //   editor.addEventListener("mouseup", saveSelection);
  //   editor.addEventListener("keyup", saveSelection);
  //   editor.addEventListener("input", handleInput);

  //   return () => {
  //     editor.removeEventListener("mouseup", saveSelection);
  //     editor.removeEventListener("keyup", saveSelection);
  //     editor.removeEventListener("input", handleInput);
  //   };
  // }, []);

 
// ---------------------------------------------------------------------------------------------------------------
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
  
   /* -----------------------
       UNDERLINE
    ------------------------ */
     const toggleUnderline = () => {
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
        const allBold = paragraphs.every(
            p => p.style.textDecoration === "underline"
        );

        const newTextDecoration = allBold ? "none" : "underline";

        paragraphs.forEach(p => {
            // 1️⃣ Remove all inline spans inside this paragraph
            p.querySelectorAll("span").forEach(span => {
            while (span.firstChild) {
                span.parentNode?.insertBefore(span.firstChild, span);
            }
            span.remove();
            });

            // 2️⃣ Toggle paragraph bold
            p.style.textDecoration = newTextDecoration;
            // p.style.display = "inline-block";
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
      const newTextDecoration =
        startP.style.textDecoration === "underline" ? "none" : "underline";

      // Toggle paragraph
      startP.style.textDecoration = newTextDecoration;

      // 🔥 Force ALL spans inside the paragraph to match
      startP.querySelectorAll("span").forEach(span => {
        span.style.textDecoration = newTextDecoration;
        span.style.display = "inline-block";
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
        startSpan.style.textDecoration === "underline";

      if(startP.style.textDecoration == "underline"){
                // CASE 1: fully bold → remove bold
                const fullyWrapped =
                    startSpan &&
                    endSpan &&
                    startSpan === endSpan &&
                    startSpan.style.textDecoration === "none";
                
            if (fullyWrapped) { 
                // unwrapSpan(startSpan);
                startSpan.style.textDecoration =
                startSpan.style.textDecoration == "none" ? "underline" : "none"
                startSpan.style.display = "inline-block"
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
                boldSpan.style.textDecoration = "none";
                boldSpan.style.display = "inline-block";
                boldSpan.appendChild(extracted);
                range.insertNode(boldSpan);
                selection.removeAllRanges();
                return;
            }

            // CASE 3: no span → apply bold
            const boldSpan = document.createElement("span");
            boldSpan.style.textDecoration = "none";
            boldSpan.style.display = "inline-block";
            range.surroundContents(boldSpan);
            selection.removeAllRanges();
          return;
      }

      // --------------------------------------------------------------- not bold -------------
      // CASE 1: fully bold → remove bold
      if (fullyWrapped) {
        // unwrapSpan(startSpan);
        // selection.removeAllRanges();

        startSpan.style.textDecoration =
                startSpan.style.textDecoration == "none" ? "underline" : "none"
                startSpan.style.display = "inline-block";
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
        boldSpan.style.textDecoration = "underline";
        boldSpan.style.display = "inline-block";
        boldSpan.appendChild(extracted);
        range.insertNode(boldSpan);
        selection.removeAllRanges();
        return;
      }

      // CASE 3: no span → apply bold
      const boldSpan = document.createElement("span");
      boldSpan.style.textDecoration = "underline";
      boldSpan.style.display = "inline-block";
      range.surroundContents(boldSpan);
      selection.removeAllRanges();
      };


       // --- Font size & family ---

  const applyFontSize = (size: string) => {
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
        MULTI-PARAGRAPH SET
      ------------------------------*/

      const paragraphs = getSelectedParagraphs(range);

      if (paragraphs.length > 1) {
        paragraphs.forEach(p => {
          // remove inline font-size spans
          p.querySelectorAll("span").forEach(span => unwrapSpan(span));

          // set paragraph font size
          p.style.fontSize = size;
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

      // FULL paragraph selected → set paragraph size
      if (startP && parentText === selectedText) {
        startP.style.fontSize = size;

        // 🔥 force ALL spans to match paragraph
        startP.querySelectorAll("span").forEach(span => {
          span.style.fontSize = size;
        });

        selection.removeAllRanges();
        return;
      }

      /* -----------------------------
        INLINE SET
      ------------------------------*/

      // CASE 1: fully wrapped → just change size
      if (startSpan && endSpan && startSpan === endSpan) {
        startSpan.style.fontSize = size;
        selection.removeAllRanges();
        return;
      }

      // CASE 2: mixed formatting → normalize then apply size
      if (hasSpan) {
        const extracted = range.extractContents();
        extracted.querySelectorAll("span").forEach(span => unwrapSpan(span));

        const sizeSpan = document.createElement("span");
        sizeSpan.style.fontSize = size;
        sizeSpan.appendChild(extracted);

        range.insertNode(sizeSpan);
        selection.removeAllRanges();
        return;
      }

      // CASE 3: no span → apply size
      const sizeSpan = document.createElement("span");
      sizeSpan.style.fontSize = size;
      range.surroundContents(sizeSpan);
      selection.removeAllRanges();
};

const applyFontFamily = (fontFamily: string) => {
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
     MULTI-PARAGRAPH SET
  ------------------------------*/

  const paragraphs = getSelectedParagraphs(range);

  if (paragraphs.length > 1) {
    paragraphs.forEach(p => {
      // remove inline font-family spans
      p.querySelectorAll("span").forEach(span => unwrapSpan(span));

      // set paragraph font family
      p.style.fontFamily = fontFamily;
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

  // FULL paragraph selected → set paragraph font family
  if (startP && parentText === selectedText) {
    startP.style.fontFamily = fontFamily;

    // 🔥 force ALL spans to match paragraph
    startP.querySelectorAll("span").forEach(span => {
      span.style.fontFamily = fontFamily;
    });

    selection.removeAllRanges();
    return;
  }

  /* -----------------------------
     INLINE SET
  ------------------------------*/

  // CASE 1: fully wrapped → just change family
  if (startSpan && endSpan && startSpan === endSpan) {
    startSpan.style.fontFamily = fontFamily;
    selection.removeAllRanges();
    return;
  }

  // CASE 2: mixed formatting → normalize then apply family
  if (hasSpan) {
    const extracted = range.extractContents();
    extracted.querySelectorAll("span").forEach(span => unwrapSpan(span));

    const familySpan = document.createElement("span");
    familySpan.style.fontFamily = fontFamily;
    familySpan.appendChild(extracted);

    range.insertNode(familySpan);
    selection.removeAllRanges();
    return;
  }

  // CASE 3: no span → apply family
  const familySpan = document.createElement("span");
  familySpan.style.fontFamily = fontFamily;
  range.surroundContents(familySpan);
  selection.removeAllRanges();
};

  return (
    <div className="rich-editor">
      {/* Tabs */}
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
      <div style={{ marginBottom: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {activeTab === "home" && (
          <>
          <button onClick={toggleBold}><FaBold /></button>
          <button><FaItalic onClick={toggleItalic}/></button>
           <button><FaUnderline onClick={toggleUnderline}/></button> 

            <FaAlignLeft onMouseDown={e => { e.preventDefault(); applyAlignment("left"); }} />
            <FaAlignCenter onMouseDown={e => { e.preventDefault(); applyAlignment("center"); }} />
            <FaAlignRight onMouseDown={e => { e.preventDefault(); applyAlignment("right"); }} />
            <FaAlignJustify onMouseDown={e => { e.preventDefault(); applyAlignment("justify"); }} />
            
            {/* <FaUndo onClick={restoreSelection} />
              <FaRedo onClick={restoreSelection} /> */}
          
          </>
        )}

        {activeTab === "insert" && (
          <>
            {/* <FaLink onMouseDown={e => { e.preventDefault(); insertLink(); }} />
            <FaTable onMouseDown={e => { e.preventDefault(); insertTable(); }} /> */}
            <button onMouseDown={e => e.preventDefault()} onClick={() => fileInputRef.current?.click()}>Upload Image</button>
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
              {
                sizeStyle.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))
              }
            </select>

          
        <select
            className="fontSelect"
            value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
                applyFontFamily(e.target.value);
              }}
          >
            {Object.entries(webSafeFonts).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
      </select>

          </>
        )}
      </div>

      {/* Editable area */}
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
      {/* ------- editable area end ----- */}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onFileChange}
      />

      <button onClick={getHTML} style={{ marginTop: 10 }}>
        Get HTML
      </button>
    </div>
  );
};

export default RichEditorTest;
