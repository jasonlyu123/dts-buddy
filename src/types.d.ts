import { SourceMapMappings } from '@jridgewell/sourcemap-codec';
import { Location } from 'locate-character';
import { SourceFile } from 'typescript';

interface Reference {
	module: string;
	name: string;
}

interface Declaration {
	module: string;
	name: string;
	alias: string;
	external: boolean;
	included: boolean;
	dependencies: Reference[];
}

interface Binding {
	id: string;
	external: boolean;
	name: string;
}

interface ModuleReference {
	id: string;
	external: boolean;
}

export interface Module {
	file: string;
	dts: string;
	ast: SourceFile;
	locator: (pos: number) => Location | undefined;
	source: null | {
		code: string;
		map: any; // TODO
		mappings: SourceMapMappings;
	};
	dependencies: string[];
	declarations: Map<string, Declaration>;
	imports: Map<string, Binding>;
	import_all: Map<string, Binding>;
	export_from: Map<string, Binding>;
	export_all: ModuleReference[];
	ambient_imports: ModuleReference[];

	/** A map of <exported, local> exports */
	exports: Map<string, string>;
}

export interface Mapping {
	source: string;
	line: number;
	column: number;
}
