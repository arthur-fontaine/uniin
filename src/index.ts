#!/usr/bin/env node

import { program } from "commander";
import { installCommand } from "./commands/install.js";
import packageJson from "../package.json";

program
	.description(packageJson.description)
	.addCommand(installCommand)
	.allowExcessArguments(false)
	.allowUnknownOption(false)
	.helpOption(true)
	.showHelpAfterError(true);

program.parse();
