export class NoModuleFoundInGomod extends Error {
	constructor() {
		super(
			"No `module xxx` found in go.mod. Ensure that the go.mod file is in the correct format, otherwise open an issue on the repository.",
		);
	}
}
