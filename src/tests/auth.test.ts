import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";

describe("getAPIKey", () => {
  test("returns the API key when header is valid", () => {
    const headers = { authorization: "ApiKey my-secret-key" };
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

  test("returns null when authorization header is missing", () => {
    expect(getAPIKey({})).toBeNull();
  });

  test("returns null when authorization header has wrong scheme", () => {
    const headers = { authorization: "Bearer my-secret-key" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization header has no value after scheme", () => {
    const headers = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null for empty authorization header", () => {
    const headers = { authorization: "" };
    expect(getAPIKey(headers)).toBeNull();
  });
});
