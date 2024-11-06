export class PackageNotFoundError extends Error {
	constructor(packageName: string) {
		super(`Package "${packageName}" not found`);
	}
}
