import fs from "node:fs";
import path from "node:path";
import { globSync } from "glob";
import yaml from "js-yaml";
import { findRootDirectory } from "./find-root-directory.js";
import { readPackageJson } from "./read-package-json.js";
import { NoPackageJsonFoundError } from "../../errors/no-package-json-found.js";
import { NoPackagesFoundError } from "../../errors/no-packages-found.js";

export interface GetPackagesOptions {
	cwd: string;
}

export interface Package {
	name: string;
	path: string;
}

export const getPackages = (options: GetPackagesOptions): Package[] => {
	const rootDirectory = findRootDirectory({ cwd: options.cwd });
	const globPackages =
		readGlobPackagesFromPnpmWorkspaceYaml(rootDirectory) ||
		readGlobPackagesFromPackageJson(rootDirectory);

	if (globPackages === undefined) {
		throw new NoPackagesFoundError();
	}

	const packagePaths = expandAllGlobs(rootDirectory, globPackages);

	return packagePaths.map((packagePath) => ({
		name: readPackageJson(path.join(packagePath, "package.json"))
			.name as string,
		path: packagePath,
	}));
};

const readGlobPackagesFromPnpmWorkspaceYaml = (rootDirectory: string) => {
	const pnpmWorkspaceYamlPath = path.join(rootDirectory, "pnpm-workspace.yaml");
	if (!fs.existsSync(pnpmWorkspaceYamlPath)) {
		return undefined;
	}
	const pnpmWorkspaceYaml = fs.readFileSync(pnpmWorkspaceYamlPath, "utf8");
	const packages = (
		yaml.load(pnpmWorkspaceYaml) as Record<string, unknown> | undefined
	)?.packages;
	if (!validateStringArray(packages)) {
		return undefined;
	}
	return packages;
};

const readGlobPackagesFromPackageJson = (rootDirectory: string) => {
	const packageJsonPath = path.join(rootDirectory, "package.json");
	if (!fs.existsSync(packageJsonPath)) {
		throw new NoPackageJsonFoundError();
	}
	const packageJson = readPackageJson(packageJsonPath);
	const workspaces = packageJson.workspaces;
	if (!validateStringArray(workspaces)) {
		return undefined;
	}
	return workspaces;
};

const expandAllGlobs = (rootDirectory: string, globs: string[]) => {
	return globs.flatMap((glob) =>
		globSync(glob, {
			cwd: rootDirectory,
			fs,
			absolute: true,
		}),
	);
};

const validateStringArray = (value: unknown): value is string[] => {
	if (!Array.isArray(value)) {
		return false;
	}
	return value.every((item) => typeof item === "string");
};
