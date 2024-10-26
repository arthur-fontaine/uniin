export interface InstallAction {
	(package: string, options: InstallOptions): Promise<void>;
}

interface InstallOptions {
	dev: boolean;
}
