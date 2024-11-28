import process from "node:process";
import { InitAction } from "../types/cli-commands/init.d.js";
import { mapTools } from "../libs/tools/map-tools.js";

export const initAction: InitAction = async (toolStrs, options) => {
	const tools = mapTools(toolStrs);

	for (const Tool of tools) {
		const tool = new Tool();
		await tool.init({
			...options,
			cwd: process.cwd(),
		});
	}

	return;
};
