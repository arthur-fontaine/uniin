import { Monorepo } from "../../monorepo/monorepo.js";
import { Tool } from "../tool.js";

export const pnpmIsUsedIn: Tool.IsUsedIn = (options) => {
	return Monorepo.findPackageManager({ cwd: options.path }) === "pnpm";
};
