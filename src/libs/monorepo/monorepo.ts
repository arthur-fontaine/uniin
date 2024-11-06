import { findPackageManager } from "./find-package-manager.js";
import { findRootDirectory } from "./find-root-directory.js";
import { getMonorepoTool } from "./get-monorepo-tool.js";
import { getPackage } from "./get-package.js";
import { getPackages } from "./get-packages.js";
import { isPackageInWorkspace } from "./is-package-in-workspace.js";

export class Monorepo {
	static findPackageManager = findPackageManager;
	static findRootDirectory = findRootDirectory;
	static getPackages = getPackages;
	static getPackage = getPackage;
	static getMonorepoTool = getMonorepoTool;
	static isPackageInWorkspace = isPackageInWorkspace;
}
