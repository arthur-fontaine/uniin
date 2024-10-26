export class NoPackageJsonFoundError extends Error {
	constructor() {
		super("No package.json found in the current tree");
	}
}
