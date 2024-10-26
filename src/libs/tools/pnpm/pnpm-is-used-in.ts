import { Monorepo } from "../../monorepo/monorepo.js";
import { Tool } from "../tool.js";

export const pnpmIsUsedIn = (options: Tool.IsUsedInOptions) => {
	return Monorepo.findPackageManager({ cwd: options.path }) === "pnpm";
};
