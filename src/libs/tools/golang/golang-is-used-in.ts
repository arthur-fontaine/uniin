import path from "node:path";
import fs from "node:fs";
import { Tool } from "../tool.js";

export const golangIsUsedIn: Tool.IsUsedIn = (options) => {
	return fs.existsSync(path.join(options.path, "go.mod"));
};
