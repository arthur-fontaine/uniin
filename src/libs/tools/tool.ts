export abstract class Tool {
	abstract installPackage(options: Tool.InstallPackageOptions): Promise<void>;
	abstract isUsedIn(options: Tool.IsUsedInOptions): boolean;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Tool {
	export interface InstallPackageOptions {
		packageName: string;
		cwd: string;
		aliasIfSupported?: string;
	}

	export interface IsUsedInOptions {
		path: string;
	}
}
