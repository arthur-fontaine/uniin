import { beforeEach, describe, expect, it, vi } from "vitest";
import { vol } from "memfs";
import { getPackages } from "./get-packages.js";
import { NoPackagesFoundError } from "../../errors/no-packages-found.js";

vi.mock("node:fs");

beforeEach(() => {
	vol.reset();
});

describe("getPackages", () => {
	it("should throw an error if no package is found", () => {
		vol.fromJSON({
			"/dir/package.json": JSON.stringify({}),
			"/dir/pnpm-workspace.yaml": "",
		});

		expect(() => getPackages({ cwd: "/dir" })).toThrow(
			new NoPackagesFoundError(),
		);
	});

	it("should return an object with one package if one package is found", () => {
		vol.fromJSON({
			"/dir/package.json": JSON.stringify({
				name: "dir",
				workspaces: ["packages/*"],
			}),
			"/dir/packages/package-a/package.json": JSON.stringify({
				name: "package-a",
			}),
		});

		expect(getPackages({ cwd: "/dir" })).toEqual([
			{
				name: "package-a",
				path: "/dir/packages/package-a",
			},
		]);
	});

	it("should return an object with multiple packages if multiple packages are found", () => {
		vol.fromJSON({
			"/dir/package.json": JSON.stringify({
				name: "dir",
				workspaces: ["packages/*"],
			}),
			"/dir/packages/package-a/package.json": JSON.stringify({
				name: "package-a",
			}),
			"/dir/packages/package-b/package.json": JSON.stringify({
				name: "package-b",
			}),
		});

		const packages = getPackages({ cwd: "/dir" });
		expect(packages).toContainEqual({
			name: "package-a",
			path: "/dir/packages/package-a",
		});
		expect(packages).toContainEqual({
			name: "package-b",
			path: "/dir/packages/package-b",
		});
		expect(packages).toHaveLength(2);
	});

	it("should return an object with all packages if the current directory is a package", () => {
		vol.fromJSON({
			"/dir/package.json": JSON.stringify({
				name: "dir",
				workspaces: ["packages/*"],
			}),
			"/dir/packages/package-a/package.json": JSON.stringify({
				name: "package-a",
			}),
			"/dir/packages/package-b/package.json": JSON.stringify({
				name: "package-b",
			}),
		});

		const packages = getPackages({ cwd: "/dir/packages/package-a" });
		expect(packages).toContainEqual({
			name: "package-a",
			path: "/dir/packages/package-a",
		});
		expect(packages).toContainEqual({
			name: "package-b",
			path: "/dir/packages/package-b",
		});
		expect(packages).toHaveLength(2);
	});
});
