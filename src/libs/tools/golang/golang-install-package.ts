import fs from "node:fs";
import path from "node:path";
import { Monorepo } from "../../monorepo/monorepo.js";
import { Tool } from "../tool.js";
import { NoModuleFoundInGomod } from "../../../errors/no-module-found-in-gomod.js";
import { execPromise } from "../../../utils/exec-promise.js";
import { golangIsUsedIn } from "./golang-is-used-in.js";

export const golangInstallPackage = async (
	options: Tool.InstallPackageOptions,
) => {
	if (!isOtherPackageGolang(options)) {
		return;
	}

	const monorepoTool = Monorepo.getMonorepoTool({ cwd: options.cwd });
	const golangCompatibleJsPackageName = options.packageName.replace(
		/[/@_]/g,
		"-",
	);
	await monorepoTool.installPackage({
		cwd: options.cwd,
		packageName: options.packageName,
		aliasIfSupported: golangCompatibleJsPackageName,
	});

	const goModPath = path.join(options.cwd, "go.mod");
	const golangModuleName = getGolangPackageName({ goModPath });
	const golangPackageName = path.join(
		golangModuleName,
		golangCompatibleJsPackageName,
	);

	editGoMod({
		goModPath,
		require: golangPackageName,
		replace: golangCompatibleJsPackageName,
	});

	await execPromise(`go mod tidy`, { cwd: options.cwd });
};

const isOtherPackageGolang = (options: Tool.InstallPackageOptions) => {
	const packages = Monorepo.getPackages({ cwd: options.cwd });
	const otherPackage = packages.find((p) => p.name === options.packageName);
	if (otherPackage === undefined) {
		return false;
	}
	return golangIsUsedIn({ path: otherPackage.path });
};

interface GetGolangPackageNameOptions {
	goModPath: string;
}

const getGolangPackageName = (options: GetGolangPackageNameOptions) => {
	const goModContent = fs.readFileSync(options.goModPath, "utf-8");
	const goModLines = goModContent.split("\n");
	const moduleLine = goModLines.find((line) => line.startsWith("module "));
	if (moduleLine === undefined) {
		throw new NoModuleFoundInGomod();
	}
	const moduleName = moduleLine.split(" ")[1];
	if (moduleName === undefined) {
		throw new NoModuleFoundInGomod();
	}
	return moduleName;
};

interface EditGoModOptions {
	goModPath: string;
	require: string;
	replace?: string;
}

const editGoMod = (options: EditGoModOptions) => {
	const goModContent = fs.readFileSync(options.goModPath, "utf-8");
	const goModLines = goModContent.split("\n");

	const requireLine = formatRequireLine(options);
	if (!goModLines.includes(requireLine)) {
		goModLines.push(requireLine);
	}

	const replaceLine = formatReplaceLine(options);
	if (!goModLines.includes(replaceLine)) {
		const requireLineIndex = goModLines.indexOf(requireLine);
		goModLines.splice(requireLineIndex + 1, 0, replaceLine);
	}

	const newGoModContent = goModLines.join("\n");
	fs.writeFileSync(options.goModPath, newGoModContent);
};

const formatRequireLine = (options: EditGoModOptions) => {
	return `require ${options.require} v0.0.0`;
};

const formatReplaceLine = (options: EditGoModOptions) => {
	return `replace ${options.require} v0.0.0 => ${options.replace}`;
};
