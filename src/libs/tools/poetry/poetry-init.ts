import fs from "node:fs";
import path from "node:path";
import { execPromise } from "../../../utils/exec-promise.js";
import { Tool } from "../tool.js";
import { Monorepo } from "../../monorepo/monorepo.js";

export const poetryInit: Tool.Init = async (options) => {
	await execPromise(`poetry init -n --name ${options.name}`, {
		cwd: options.cwd,
	});

	const pyprojectTomlPath = path.join(options.cwd, "pyproject.toml");
	const pyprojectToml = fs.readFileSync(pyprojectTomlPath, "utf8");
	fs.writeFileSync(
		pyprojectTomlPath,
		editReadmeInPyprojectToml(pyprojectToml, options.cwd),
	);
};

function editReadmeInPyprojectToml(pyprojectToml: string, cwd: string): string {
	const modifiedPyprojectToml = [];

	const rootPath = Monorepo.findRootDirectory({ cwd });
	const readmePath = path.relative(cwd, path.join(rootPath, "README.md"));
	const readmeLine = `readme = "${readmePath}"`;

	let inToolPoetryKey = false;
	for (const line of pyprojectToml.split("\n")) {
		modifiedPyprojectToml.push(line);

		if (line.includes("[tool.poetry]")) {
			inToolPoetryKey = true;
			continue;
		}

		if (line.trim().startsWith("[")) {
			inToolPoetryKey = false;
			continue;
		}

		if (!inToolPoetryKey) {
			continue;
		}

		if (/^\s*readme\s*=/i.test(line)) {
			modifiedPyprojectToml.splice(-1, 1, readmeLine);
		}
	}

	return modifiedPyprojectToml.join("\n");
}
