import fs from "node:fs";
import path from "node:path";
import { readPackageJson } from "./read-package-json.js";
import { findRootDirectory } from "./find-root-directory.js";
import { NoPackageManagerDefinedError } from "../../errors/no-package-manager-defined.js";

export interface FindPackageManagerOptions {
	cwd: string;
}

export const findPackageManager = (options: FindPackageManagerOptions) => {
	const rootDirectory = findRootDirectory({ cwd: options.cwd });
	const packageJsonPath = path.join(rootDirectory, "package.json");
	const packageManager = readPackageManagerFromPackageJson(packageJsonPath);
	if (packageManager === undefined) {
		throw new NoPackageManagerDefinedError();
	}
	return packageManager;
};

export const readPackageManagerFromPackageJson = (
	packageJsonPath: string,
): string | undefined => {
	if (!fs.existsSync(packageJsonPath)) {
		return undefined;
	}
	const packageJson = readPackageJson(packageJsonPath);
	const packageManagerField: unknown = packageJson["packageManager"];
	if (typeof packageManagerField !== "string") {
		return undefined;
	}
	return packageManagerField.split("@")[0];
};
