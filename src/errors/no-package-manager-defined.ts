export class NoPackageManagerDefinedError extends Error {
	constructor() {
		super("No package manager defined in the root package.json");
	}
}
