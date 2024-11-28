import { createCommand } from "commander";
import { initAction } from "../actions/init.js";

export const initCommand = createCommand("init")
	.description("init all configuration files")
	.argument("<tools...>", "tools to init")
	.requiredOption("-n, --name <name>", "name of the project")
	.action(initAction);
