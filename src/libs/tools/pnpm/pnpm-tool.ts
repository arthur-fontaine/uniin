import { Tool } from "../tool.js";
import { pnpmInit } from "./pnpm-init.js";
import { pnpmInstallPackage } from "./pnpm-install-package.js";
import { pnpmIsUsedIn } from "./pnpm-is-used-in.js";

export class PnpmTool extends Tool {
	init = pnpmInit;
	installPackage = pnpmInstallPackage;
	isUsedIn = pnpmIsUsedIn;
}
