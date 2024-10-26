import { execSync } from "child_process";
import { Tool } from "../tool.js";
import { Monorepo } from "../../monorepo/monorepo.js";

export class PnpmTool extends Tool {
	installPackage(packageName: string): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				execSync(`pnpm add ${packageName}`);
				resolve();
			} catch (error) {
				// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
				reject(error);
			}
		});
	}

	isUsedIn(path: string): boolean {
		return Monorepo.findPackageManager({ cwd: path }) === "pnpm";
	}
}
