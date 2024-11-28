export abstract class Tool {
	abstract init: Tool.Init;
	abstract installPackage: Tool.InstallPackage;
	abstract isUsedIn: Tool.IsUsedIn;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Tool {
	export interface Init {
		(options: Tool.InitOptions): Promise<void>;
	}

	export interface InitOptions {
		name: string;
		cwd: string;
	}

	export interface InstallPackage {
		(options: Tool.InstallPackageOptions): Promise<void>;
	}

	export interface InstallPackageOptions {
		packageName: string;
		cwd: string;
		aliasIfSupported?: string;
	}

	export interface IsUsedIn {
		(options: Tool.IsUsedInOptions): boolean;
	}

	export interface IsUsedInOptions {
		path: string;
	}
}
