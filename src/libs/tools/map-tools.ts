import { ToolNotFoundError } from "../../errors/tool-not-found.js";
import { stripEndWord } from "../../utils/strip-end-word.js";
import { uncapitalize } from "../../utils/uncapitalize.js";
import * as tools from "./all-tools.js";

export function mapTools(toolStrs: string[]) {
	return Array.from(mapToolsIterators(toolStrs));
}

function* mapToolsIterators(toolStrs: string[]) {
	for (const toolStr of toolStrs) {
		const tool = Object.values(tools).find((tool) => {
			const toolName = uncapitalize(stripEndWord(tool.name, "Tool"));
			return toolStr === toolName;
		});
		if (!tool) {
			throw new ToolNotFoundError(toolStr, Object.keys(tools));
		}
		yield tool;
	}
}
