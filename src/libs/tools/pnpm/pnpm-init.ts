import fs from "node:fs";
import path from "node:path";
import { Tool } from "../tool.js";

export const pnpmInit: Tool.Init = async (options) => {
	fs.writeFileSync(
		path.join(options.cwd, "package.json"),
		JSON.stringify(
			{
				name: options.name,
			},
			null,
			2,
		),
	);
};
