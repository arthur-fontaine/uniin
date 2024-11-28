import { stripEndWord } from "../../utils/strip-end-word.js";
import * as tools from "./all-tools.js";

export function mapTools(toolStrs: string[]) {
	return Object.values(tools).filter((tool) => {
		const toolName = stripEndWord(tool.name, "Tool");
		return toolStrs.includes(toolName);
	});
}
