import path from "node:path";
import toml from "smol-toml";
import { mkdir } from "node:fs/promises";
import {
  ConfigSchema,
  defaultConfig,
  parseConfig,
  type Config,
} from "goblinai/models/Config";

const CONFIG_FILE = path.join(".", "goblinai.toml");

function getConfigFile() {
  return Bun.file(CONFIG_FILE);
}

async function tryGenerateDefaultConfig() {
  const file = getConfigFile();
  if (await file.exists()) return;

  await mkdir(path.dirname(CONFIG_FILE), { recursive: true });

  const text = toml.stringify(defaultConfig);
  file.write(text);
}

let configCache: Config | undefined;
export async function loadConfig() {
  if (configCache != null) {
    return configCache;
  }

  const file = getConfigFile();
  await tryGenerateDefaultConfig();
  return parseConfig(toml.parse(await file.text()));
}

export function clearConfigCache() {
  configCache = undefined;
}
