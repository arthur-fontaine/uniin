import { Tool } from "../tool.js";
import { poetryInstallPackage } from "./poetry-install-package.js";
import { poetryIsUsedIn } from "./poetry-is-used-in.js";

export class PoetryTool extends Tool {
	installPackage = poetryInstallPackage;
	isUsedIn = poetryIsUsedIn;
}
