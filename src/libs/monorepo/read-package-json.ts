import fs from "node:fs";

export const readPackageJson = (path: string) => {
	return JSON.parse(fs.readFileSync(path, "utf-8")) as Record<string, unknown>;
};
