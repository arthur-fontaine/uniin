export class ToolNotFoundError extends Error {
	constructor(toolStr: string, availableTools: string[]) {
		super(
			`Tool not found: ${toolStr}. Available tools: ${availableTools.join(", ")}`,
		);
	}
}
