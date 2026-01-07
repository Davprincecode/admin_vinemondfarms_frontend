import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type CustomElement =
  | { type: "paragraph"; children: CustomText[] }
  | { type: "heading-one"; children: CustomText[] }
  | { type: "heading-two"; children: CustomText[] }
  | { type: "image"; url: string; children: CustomText[] };

export type CustomEditor = BaseEditor & ReactEditor;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
