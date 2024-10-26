import { Tool } from "../tool.js";
import { golangInstallPackage } from "./golang-install-package.js";
import { golangIsUsedIn } from "./golang-is-used-in.js";

export class GolangTool extends Tool {
	installPackage = golangInstallPackage;
	isUsedIn = golangIsUsedIn;
}
