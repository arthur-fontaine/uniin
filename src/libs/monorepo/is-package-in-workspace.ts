import { getPackages } from "./get-packages.js";

export interface IsPackageInWorkspaceOptions {
	cwd: string;
	packageName: string;
}

export const isPackageInWorkspace = (options: IsPackageInWorkspaceOptions) => {
	const packagesAvailable = getPackages({ cwd: options.cwd });
	return packagesAvailable.some((pkg) => pkg.name === options.packageName);
};
