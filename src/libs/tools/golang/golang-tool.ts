import { Tool } from "../tool.js";
import { golangInit } from "./golang-init.js";
import { golangInstallPackage } from "./golang-install-package.js";
import { golangIsUsedIn } from "./golang-is-used-in.js";

export class GolangTool extends Tool {
	init = golangInit;
	installPackage = golangInstallPackage;
	isUsedIn = golangIsUsedIn;
}
