export interface InitAction {
	(tools: string[], options: InitOptions): Promise<void>;
}

interface InitOptions {
	name: string;
}
