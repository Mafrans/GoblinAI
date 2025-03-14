import { type Static, Object, Array, Literal } from "@sinclair/typebox";
import { YDocNodeSchema } from "./YDocNode";

export const YDocSchema = Object({
  type: Literal("doc"),
  content: Array(YDocNodeSchema),
});

export type YDoc = Static<typeof YDocSchema>;
