import { Tool } from "../tool.js";
import { poetryInit } from "./poetry-init.js";
import { poetryInstallPackage } from "./poetry-install-package.js";
import { poetryIsUsedIn } from "./poetry-is-used-in.js";

export class PoetryTool extends Tool {
	init = poetryInit;
	installPackage = poetryInstallPackage;
	isUsedIn = poetryIsUsedIn;
}
