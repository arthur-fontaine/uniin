import path from "node:path";
import fs from "node:fs";
import { NoPackageJsonFoundError } from "../../errors/no-package-json-found.js";
import { readPackageJson } from "./read-package-json.js";

export interface FindRootDirectoryOptions {
	cwd: string;
}

export const findRootDirectory = (options: FindRootDirectoryOptions) => {
	let currentPath = path.join(options.cwd, "_");
	do {
		currentPath = path.dirname(currentPath);
		const packageJsonPath = path.join(currentPath, "package.json");
		if (!fs.existsSync(packageJsonPath)) {
			continue;
		}
		const packageJson = readPackageJson(packageJsonPath);
		if (
			isRootPackageJson(packageJson) ||
			fs.existsSync(path.join(currentPath, "pnpm-workspace.yaml"))
		) {
			return currentPath;
		}
	} while (currentPath !== "/");
	throw new NoPackageJsonFoundError();
};

const isRootPackageJson = (packageJson: Record<string, unknown>) => {
	return packageJson["workspaces"] !== undefined;
};
