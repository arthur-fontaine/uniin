import { beforeEach, describe, expect, it, vi } from "vitest";
import { vol } from "memfs";

import { findRootDirectory } from "./find-root-directory.js";
import { NoPackageJsonFoundError } from "../../errors/no-package-json-found.js";

vi.mock("node:fs");

beforeEach(() => {
	vol.reset();
});

describe("findRootDirectory", () => {
	it("should return the root directory of the project if the root package.json has workspaces field", () => {
		vol.fromJSON({
			"/dir/package.json": JSON.stringify({ workspaces: [] }),
			"/dir/sub/package.json": JSON.stringify({}),
		});

		expect(findRootDirectory({ cwd: "/dir/sub" })).toBe("/dir");
	});

	it("should return the root directory of the project if the root package.json has workspaces field and the current directory is the root", () => {
		vol.fromJSON({
			"/dir/package.json": JSON.stringify({ workspaces: [] }),
		});

		expect(findRootDirectory({ cwd: "/dir" })).toBe("/dir");
	});

	it("should return the root directory of the project if the root package.json has pnpm-workspace.yaml", () => {
		vol.fromJSON({
			"/dir/package.json": JSON.stringify({}),
			"/dir/pnpm-workspace.yaml": "",
			"/dir/sub/package.json": JSON.stringify({}),
		});

		expect(findRootDirectory({ cwd: "/dir/sub" })).toBe("/dir");
	});

	it("should throw NoPackageJsonFoundError if no package.json is found", () => {
		expect(() => findRootDirectory({ cwd: "/" })).toThrow(
			new NoPackageJsonFoundError(),
		);
	});
});
