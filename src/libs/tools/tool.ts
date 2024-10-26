export abstract class Tool {
	abstract installPackage(packageName: string): Promise<void>;
	abstract isUsedIn(path: string): boolean;
}
