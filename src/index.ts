import * as webpack from 'webpack';

interface LoaderOptions {
    // Add loader options here.

}

export default function wgslxLoader(this: webpack.LoaderContext<LoaderOptions>, source: string) {
    this.getOptions();
    // The loader's source code goes here.
    return `const a = "${source}"`;
}