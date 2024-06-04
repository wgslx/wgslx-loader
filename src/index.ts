import { resolve, dirname } from 'path';
import * as webpack from 'webpack';
import { ImportResolver, compileWgslx } from '@wgslx/wgslx';

export * from './shader';

interface LoaderOptions {
	// Add loader options here.
}

/** WGSLX-loader implementation. */
export default function wgslxLoader(this: webpack.LoaderContext<LoaderOptions>, source: string) {
	this.getOptions();

	const importResolver: ImportResolver = {
		resolveFilePath: (baseFilePath: string, importPath: string) => {
			return resolve(dirname(baseFilePath), importPath);
		},
		readSource: (filePath: string) => {
			if (!this.fs.readFileSync) {
				throw new Error('File system is not available.');
			}

			this.addDependency(filePath);
			return this.fs.readFileSync(filePath, 'utf8');
		},
	};

	const code = compileWgslx(source, this.resourcePath, { mode: 'wgslx', importResolver });
	return [`const shader = {code:\`${code}\`};`, 'module.exports = shader;'].join('\n');
}
