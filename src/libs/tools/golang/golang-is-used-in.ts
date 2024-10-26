import path from "node:path";
import fs from "node:fs";
import { Tool } from "../tool.js";

export const golangIsUsedIn = (options: Tool.IsUsedInOptions) => {
	return fs.existsSync(path.join(options.path, "go.mod"));
};
