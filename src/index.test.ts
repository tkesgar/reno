import path from "path";
import { loadEnv, getEnv, isDevelopment, isProduction, getEnvValue } from ".";

beforeEach(() => {
  Object.keys(process.env)
    .filter((key) => key.startsWith("TEST_"))
    .forEach((key) => {
      delete process.env[key];
    });
});

afterEach(() => {
  process.env.NODE_ENV = "test";
});

describe("loadEnv", () => {
  beforeEach(() => {
    process.chdir(path.join(__dirname, "./test-fixtures/load-env"));
  });

  it("should load values from .env, test.env, test.local.env, and default.env", () => {
    loadEnv();

    expect(process.env.TEST_DOTENV).toBe("foo");
    expect(process.env.TEST_ENV).toBe("foo");
    expect(process.env.TEST_ENV_LOCAL).toBe("foo");
    expect(process.env.TEST_DEFAULT).toBe("foo");
  });

  it("should load from custom.env", () => {
    loadEnv({ env: "custom" });

    expect(process.env.TEST_CUSTOM).toBe("foo");
    expect(process.env.TEST_CUSTOM_LOCAL).toBe("foo");
  });

  it("should not load default.env if default is null", () => {
    loadEnv({ default: null });

    expect(process.env.TEST_DEFAULT).toBeUndefined();
  });

  it("should not load test.local.env if local is false", () => {
    loadEnv({ local: false });

    expect(process.env.TEST_ENV_LOCAL).toBeUndefined();
  });

  it("should not load test.env and test.local.env if app is null", () => {
    loadEnv({ env: null });

    expect(process.env.TEST_ENV).toBeUndefined();
    expect(process.env.TEST_ENV_LOCAL).toBeUndefined();
  });

  it("should have precedence as follows: .env > test.local.env > test.env > default.env", () => {
    loadEnv();

    expect(process.env.TEST_OVERRIDE_DOTENV).toBe("value from .env");
    expect(process.env.TEST_OVERRIDE_ENV_LOCAL).toBe(
      "value from test.local.env"
    );
    expect(process.env.TEST_OVERRIDE_ENV).toBe("value from test.env");
    expect(process.env.TEST_OVERRIDE_DEFAULT).toBe("value from default.env");
  });
});

describe("getEnv", () => {
  it("should return value of NODE_ENV", () => {
    expect(getEnv()).toBe(process.env.NODE_ENV);
  });

  it("should return 'development' if process.env.NODE_ENV is not provided", () => {
    delete process.env.NODE_ENV;

    expect(getEnv()).toBe("development");
  });
});

describe("isDevelopment", () => {
  it("should return false if getEnv() is not 'development'", () => {
    expect(isDevelopment()).toBe(false);
  });

  it("should return true if getEnv() is 'development'", () => {
    process.env.NODE_ENV = "development";

    expect(isDevelopment()).toBe(true);
  });

  it("should return true if NODE_ENV is not provided", () => {
    delete process.env.NODE_ENV;

    expect(isDevelopment()).toBe(true);
  });
});

describe("isProduction", () => {
  it("should return false if getEnv() is not 'production'", () => {
    expect(isProduction()).toBe(false);
  });

  it("should return true if getEnv() is 'production'", () => {
    process.env.NODE_ENV = "production";

    expect(isProduction()).toBe(true);
  });
});

describe("getEnvValue", () => {
  it("should return value from env variable parsed as JSON", () => {
    process.env.TEST_FOO = '{"foo": "bar"}';

    expect(getEnvValue<object>("TEST_FOO")).toEqual({ foo: "bar" });
  });

  it("should return default value if env variable does not exist and default value is provided", () => {
    expect(
      getEnvValue<object>("TEST_FOO", { foo: "bar" })
    ).toEqual({ foo: "bar" });
  });

  it("should accept falsy as default value", () => {
    expect(getEnvValue<object>("TEST_FOO", null)).toEqual(null);
  });

  it("should throw error if env variable does not exist and default value is not provided", () => {
    expect(() => getEnvValue<object>("TEST_FOO")).toThrowError(
      "Environment variable 'TEST_FOO' is not provided"
    );
  });

  it("should throw error if env variable is not a valid JSON", () => {
    process.env.TEST_FOO = '{foo: "bar"}';

    expect(() => getEnvValue<object>("TEST_FOO")).toThrowError(
      "Environment variable 'TEST_FOO' is not a valid value"
    );
  });
});
