import {
  type Static,
  Object,
  String,
  Uint8Array as Uint8ArrayType,
} from "@sinclair/typebox";
import { Default, Parse } from "@sinclair/typebox/value";

export const ConfigSchema = Object({
  story_dir: String({ default: "./stories" }),
});

export type Config = Static<typeof ConfigSchema>;

export function parseConfig(config: any): Config {
  const values = Default(ConfigSchema, config);
  return Parse(ConfigSchema, values);
}
export const defaultConfig = parseConfig({});
