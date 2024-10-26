import { MonorepoToolNotSupportedError } from "../../errors/monorepo-tool-no-supported.js";
import { PnpmTool } from "../tools/pnpm/pnpm-tool.js";
import { Tool } from "../tools/tool.js";
import { findPackageManager } from "./find-package-manager.js";

export interface GetMonorepoToolOptions {
	cwd: string;
}

const monorepoToolMapping = {
	pnpm: PnpmTool,
};

export const getMonorepoTool = (options: GetMonorepoToolOptions): Tool => {
	const packageManager = findPackageManager({ cwd: options.cwd });
	if (!isMonorepoToolAvailable(packageManager)) {
		throw new MonorepoToolNotSupportedError(
			packageManager,
			Object.keys(monorepoToolMapping),
		);
	}
	return new monorepoToolMapping[packageManager]();
};

const isMonorepoToolAvailable = (
	packageManager: string,
): packageManager is keyof typeof monorepoToolMapping => {
	return packageManager in monorepoToolMapping;
};
