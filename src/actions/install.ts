import { InstallAction } from "../types/cli-commands/install.d.js";
import * as tools from "../libs/tools/all-tools.js";

export const installAction: InstallAction = async (packageName) => {
	for (const Tool of Object.values(tools)) {
		const tool = new Tool();
		if (!tool.isUsedIn({ path: process.cwd() })) {
			continue;
		}
		await tool.installPackage({
			packageName,
			cwd: process.cwd(),
		});
	}
	return;
};
