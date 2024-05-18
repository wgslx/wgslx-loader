import * as webpack from 'webpack';
export * from './shader';
interface LoaderOptions {
}
export default function wgslxLoader(this: webpack.LoaderContext<LoaderOptions>, source: string): string;
