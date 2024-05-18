import * as webpack from 'webpack';
import { Context, Cursor, Syntax } from '@wgslx/wgslx';

export * from './shader';

interface LoaderOptions {
    // Add loader options here.

}

/** WGSLX-loader implementation. */
export default function wgslxLoader(this: webpack.LoaderContext<LoaderOptions>, source: string) {
    this.getOptions();

    const context = Context.from(source, this.resourcePath);
    const cursor = Cursor(0);

    const match = Syntax.translationUnitExtended.match(cursor, context);
    return [
        `const shader = {src:\`${match.token.toString(true)}\`};`,
        'module.exports = shader;'
    ].join('\n');
}