import {
  type Static,
  Object,
  String,
  Uint8Array as Uint8ArrayType,
} from "@sinclair/typebox";

export const StorySchema = Object({
  id: String(),
  title: String(),
  content: Uint8ArrayType({ default: new Uint8Array() }),
});

export type Story = Static<typeof StorySchema>;
