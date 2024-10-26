export class NoPackagesFoundError extends Error {
	constructor() {
		super("No packages found in the monorepo");
	}
}
