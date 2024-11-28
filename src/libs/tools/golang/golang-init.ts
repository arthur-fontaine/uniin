import { execPromise } from "../../../utils/exec-promise.js";
import { Tool } from "../tool.js";

export const golangInit: Tool.Init = async (options) => {
	await execPromise(`go mod init ${options.name}`, { cwd: options.cwd });
};
