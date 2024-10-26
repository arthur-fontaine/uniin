import fs from "node:fs";
import path from "node:path";
import { NoPackageJsonFoundError } from "../../errors/no-package-json-found.js";

interface FindPackageManagerOptions {
	cwd: string;
}

export const findPackageManager = (options: FindPackageManagerOptions) => {
	let currentPath = path.join(options.cwd, "_");
	do {
		currentPath = path.dirname(currentPath);
		const packageJsonPath = path.join(currentPath, "package.json");
		const packageManager = readPackageManagerFromPackageJson(packageJsonPath);
		if (packageManager) {
			return packageManager;
		}
	} while (currentPath !== "/");
	throw new NoPackageJsonFoundError();
};

export const readPackageManagerFromPackageJson = (
	packageJsonPath: string,
): string | undefined => {
	if (!fs.existsSync(packageJsonPath)) {
		return undefined;
	}
	const packageJson = JSON.parse(
		fs.readFileSync(packageJsonPath, "utf-8"),
	) as Record<string, unknown>;
	const packageManagerField: unknown = packageJson["packageManager"];
	if (typeof packageManagerField !== "string") {
		return undefined;
	}
	return packageManagerField.split("@")[0];
};
