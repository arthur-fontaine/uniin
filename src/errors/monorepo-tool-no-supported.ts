export class MonorepoToolNotSupportedError extends Error {
	constructor(packageManager: string, supportedPackageManagers: string[]) {
		super(
			`Monorepo tool not supported for package manager: ${packageManager}. Supported package managers: ${supportedPackageManagers.join(", ")}`,
		);
	}
}
