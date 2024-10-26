import { beforeEach, describe, expect, it, vi } from "vitest";
import { vol } from "memfs";

import {
	findPackageManager,
	readPackageManagerFromPackageJson,
} from "./find-package-manager.js";
import { NoPackageManagerDefinedError } from "../../errors/no-package-manager-defined.js";

vi.mock("node:fs");

beforeEach(() => {
	vol.reset();
});

describe("findPackageManager", () => {
	it("should return npm if package.json has packageManager field set to npm", () => {
		vol.fromJSON({
			"/dir/package.json": JSON.stringify({
				workspaces: [],
				packageManager: "npm",
			}),
		});

		expect(findPackageManager({ cwd: "/dir" })).toBe("npm");
	});

	it("should return npm if a parent package.json has packageManager field set to npm", () => {
		vol.fromJSON({
			"/dir/package.json": JSON.stringify({
				workspaces: [],
				packageManager: "npm",
			}),
			"/dir/sub/package.json": JSON.stringify({}),
		});

		expect(findPackageManager({ cwd: "/dir/sub" })).toBe("npm");
	});

	it("should throw NoPackageManagerDefinedError if package.json does not have packageManager field", () => {
		vol.fromJSON({
			"/dir/package.json": JSON.stringify({ workspaces: [] }),
		});

		expect(() => findPackageManager({ cwd: "/dir" })).toThrow(
			new NoPackageManagerDefinedError(),
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
