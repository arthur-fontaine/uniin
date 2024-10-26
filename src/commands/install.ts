import { createCommand } from "commander";
import { installAction } from "../actions/install.js";

export const installCommand = createCommand("install")
	.description("install a package")
	.argument("<package>", "package to install")
	.option("-D, --dev", "install as dev dependency", false)
	.action(installAction);
