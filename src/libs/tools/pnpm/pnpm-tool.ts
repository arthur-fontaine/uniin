import { Tool } from "../tool.js";
import { pnpmInstallPackage } from "./pnpm-install-package.js";
import { pnpmIsUsedIn } from "./pnpm-is-used-in.js";

export class PnpmTool extends Tool {
	installPackage = pnpmInstallPackage;
	isUsedIn = pnpmIsUsedIn;
}
