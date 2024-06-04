/** Shader module. */
export interface WgslxShader {
	/** Shader source. */
	readonly code: string;

	/** Shader label derived from the file name. */
	readonly label?: string;

	/** Shader source map if configured to be generated. */
	readonly sourceMap?: string;
}
