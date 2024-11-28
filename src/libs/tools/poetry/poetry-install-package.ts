import { execPromise } from "../../../utils/exec-promise.js";
import { Monorepo } from "../../monorepo/monorepo.js";
import { Tool } from "../tool.js";
import { poetryIsUsedIn } from "./poetry-is-used-in.js";

export const poetryInstallPackage: Tool.InstallPackage = async (options) => {
	if (!isOtherPackagePoetry(options)) {
		return;
	}

	const monorepoTool = Monorepo.getMonorepoTool({ cwd: options.cwd });
	await monorepoTool.installPackage({
		cwd: options.cwd,
		packageName: options.packageName,
		aliasIfSupported: options.packageName,
	});

	const packagePath = `./node_modules/${options.packageName}`;

	await execPromise(`poetry add --editable ${packagePath}`, {
		cwd: options.cwd,
	});
};

const isOtherPackagePoetry = (options: Tool.InstallPackageOptions) => {
	const otherPackage = Monorepo.getPackage({
		cwd: options.cwd,
		packageName: options.packageName,
	});
	return poetryIsUsedIn({ path: otherPackage.path });
};
