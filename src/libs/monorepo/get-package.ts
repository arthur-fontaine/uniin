import { PackageNotFoundError } from "../../errors/package-not-found.js";
import { getPackages, Package } from "./get-packages.js";

export interface GetPackageOptions {
	cwd: string;
	packageName: string;
}

export const getPackage = (options: GetPackageOptions): Package => {
	const packages = getPackages({ cwd: options.cwd });
	const package_ = packages.find((p) => p.name === options.packageName);
	if (package_ === undefined) {
		throw new PackageNotFoundError(options.packageName);
	}
	return package_;
};
