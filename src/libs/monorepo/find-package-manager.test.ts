import { beforeEach, describe, expect, it, vi } from "vitest";
import { vol } from "memfs";

import {
	findPackageManager,
	readPackageManagerFromPackageJson,
} from "./find-package-manager.js";

vi.mock("node:fs");

beforeEach(() => {
	vol.reset();
});

describe("findPackageManager", () => {
	it("should return npm if package.json has packageManager field set to npm", () => {
		vol.fromJSON({
			"/package.json": JSON.stringify({
				packageManager: "npm",
			}),
		});

		expect(findPackageManager({ cwd: "/" })).toBe("npm");
	});

	it("should return npm if a parent package.json has packageManager field set to npm", () => {
		vol.fromJSON({
			"/package.json": JSON.stringify({
				packageManager: "npm",
			}),
			"/sub/package.json": JSON.stringify({}),
		});

		expect(findPackageManager({ cwd: "/sub" })).toBe("npm");
	});

	it("should throw NoPackageJsonFoundError if no package.json is found", () => {
		expect(() => findPackageManager({ cwd: "/" })).toThrow(
			"No package.json found in the current tree",
		);
	});
});

describe("readPackageManagerFromPackageJson", () => {
	it("should return npm if package.json has packageManager field set to npm", () => {
		vol.fromJSON({
			"/package.json": JSON.stringify({
				packageManager: "npm",
			}),
		});

		expect(readPackageManagerFromPackageJson("/package.json")).toBe("npm");
	});

	it("should return undefined if package.json does not have packageManager field", () => {
		vol.fromJSON({
			"/package.json": JSON.stringify({}),
		});

		expect(readPackageManagerFromPackageJson("/package.json")).toBe(undefined);
	});

	it("should return undefined if package.json does not exist", () => {
		expect(readPackageManagerFromPackageJson("/package.json")).toBe(undefined);
	});
});
