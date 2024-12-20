import path from "node:path";
import fs from "node:fs";
import { Tool } from "../tool.js";

export const poetryIsUsedIn: Tool.IsUsedIn = (options) => {
	return (
		fs.existsSync(path.join(options.path, "pyproject.toml")) &&
		fs
			.readFileSync(path.join(options.path, "pyproject.toml"), "utf8")
			.includes("[tool.poetry]")
	);
};
