import { Tool } from "../tool.js";
import { Monorepo } from "../../monorepo/monorepo.js";
import { execPromise } from "../../../utils/exec-promise.js";

export const pnpmInstallPackage = (options: Tool.InstallPackageOptions) => {
	if (
		Monorepo.isPackageInWorkspace({
			cwd: options.cwd,
			packageName: options.packageName,
		})
	) {
		return installWorkspacePackage(options);
	}

	return execPromise(`pnpm add ${options.packageName}`, { cwd: options.cwd });
};

const installWorkspacePackage = async (options: Tool.InstallPackageOptions) => {
	if (options.aliasIfSupported === undefined) {
		await execPromise(`pnpm add ${options.packageName}@workspace:*`, {
			cwd: options.cwd,
		});
		return;
	}

	await execPromise(
		`pnpm add ${options.aliasIfSupported}@workspace:${options.packageName}@*`,
		{ cwd: options.cwd },
	);
};
