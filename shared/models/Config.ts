import {
  type Static,
  Object,
  String,
  Uint8Array as Uint8ArrayType,
} from "@sinclair/typebox";
import { Default, Parse } from "@sinclair/typebox/value";
import "goblinai/typebox-formats";

export const ConfigSchema = Object({
  story_dir: String({ default: "./stories" }),
  openai_base_url: String({
    pattern: "",
    default: "https://api.openai.com/v1",
  }),
  openai_api_key: String({ required: true }),
});

export type Config = Static<typeof ConfigSchema>;

export function parseConfig(config: any): Config {
  const values = Default(ConfigSchema, config);
  return Parse(ConfigSchema, values);
}

export const defaultConfig = Default(ConfigSchema, {});
