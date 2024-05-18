export * from './dist/index.d';
import { WgslxShader } from './dist/index.d';

declare module "\*.wgsl" {
    const shader: WgslxShader;
    export default shader;
}