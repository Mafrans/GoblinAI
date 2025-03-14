import {
  type Static,
  Object,
  String,
  Recursive,
  Array,
} from "@sinclair/typebox";

export const YDocNodeSchema = Recursive((Self) =>
  Object({
    type: String(),
    content: Array(Self),
  }),
);
export type YDocNode = Static<typeof YDocNodeSchema>;
