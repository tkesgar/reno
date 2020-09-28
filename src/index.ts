import dotenv from "dotenv";

interface LoadEnvOpts {
  env?: string;
  local?: boolean;
  default?: string;
}

export function loadEnv(opts: LoadEnvOpts = {}): void {
  const {
    env: currentEnv = process.env.NODE_ENV,
    local: loadLocalEnv = true,
    default: defaultEnvName = "default.env",
  } = opts;

  dotenv.config();

  if (currentEnv) {
    if (loadLocalEnv) {
      dotenv.config({ path: `${currentEnv}.local.env` });
    }

    dotenv.config({ path: `${currentEnv}.env` });
  }

  dotenv.config({ path: defaultEnvName });
}

export function getEnv(): string {
  return process.env.NODE_ENV || "development";
}

export function isDevelopment(): boolean {
  return getEnv() === "development";
}

export function isProduction(): boolean {
  return getEnv() === "production";
}
