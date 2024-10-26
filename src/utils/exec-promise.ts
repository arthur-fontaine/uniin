import { execSync } from "node:child_process";

export const execPromise = (command: string, options?: { cwd: string }) => {
	return new Promise<void>((resolve, reject) => {
		try {
			execSync(command, { stdio: "inherit", cwd: options?.cwd });
			resolve();
		} catch (error) {
			// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
			reject(error);
		}
	});
};
