import * as webpack from 'webpack';
import { Context, Cursor, Syntax } from '@wgslx/wgslx';

export * from './shader';

interface LoaderOptions {
    // Add loader options here.

}

/** WGSLX-loader implementation. */
export default function wgslxLoader(this: webpack.LoaderContext<LoaderOptions>, source: string) {
    this.getOptions();

    const token = Syntax.translationUnitExtended.matchAll(source, this.resourcePath);

    if (token === null) {
        throw new Error('Failed to parse the shader source.');
    }

    return [
        `const shader = {code:\`${token.toString(true)}\`};`,
        'module.exports = shader;'
    ].join('\n');
}