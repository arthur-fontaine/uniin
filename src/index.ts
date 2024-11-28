#!/usr/bin/env node

import { program } from "commander";
import { installCommand } from "./commands/install.js";
import packageJson from "../package.json";
import { initCommand } from "./commands/init.js";

program
	.description(packageJson.description)
	.addCommand(installCommand)
	.addCommand(initCommand)
	.allowExcessArguments(false)
	.allowUnknownOption(false)
	.helpOption(true)
	.showHelpAfterError(true);

program.parse();
