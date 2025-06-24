import {
  type EditorOptions as TiptapEditorOptions,
  type Extensions,
  Editor as TiptapEditor,
  Node,
} from "@tiptap/core";
import DocumentExtension from "@tiptap/extension-document";
import ParagraphExtension from "@tiptap/extension-paragraph";
import TextExtension from "@tiptap/extension-text";
import Collaboration from "@tiptap/extension-collaboration";
import { Tiptap } from "@hocuspocus/transformer";
import type { Doc } from "yjs";
import * as JSDOM from "jsdom";

const defaultExtensions = [
  DocumentExtension,
  ParagraphExtension,
  TextExtension,
];

type EditorOptions = Partial<Omit<TiptapEditorOptions, "extensions">> & {
  document: Doc;
};

export class Editor extends TiptapEditor {
  constructor(options: EditorOptions) {
    super({
      ...options,
      extensions: [
        ...defaultExtensions,
        Collaboration.configure({ document: options.document }),
      ],
    });
  }
}

class TiptapTransformer extends Tiptap {
  defaultExtensions = defaultExtensions;
}

export const Transformer = new TiptapTransformer();
