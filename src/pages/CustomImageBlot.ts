// // src/CustomImageBlot.ts
// import Quill from "quill";

// const ImageBlot = Quill.import("formats/image");

// class CustomImageBlot extends ImageBlot {
//   static formats(domNode: HTMLImageElement) {
//     return {
//       width: domNode.style.width || undefined
//     };
//   }

//   format(name: string, value: any) {
//     if (name === "width") {
//       this.domNode.style.width = value;
//     } else {
//       super.format(name, value);
//     }
//   }
// }

// Quill.register(CustomImageBlot, true);
