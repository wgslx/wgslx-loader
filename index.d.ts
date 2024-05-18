export * from './dist/index.d';
import { WgslxShader } from './dist/index.d';

declare module "\*.wgsl" {
    const shader: WgslxShader;
    export default shader;
}

declare module "\*.wgslx" {
    const shader: WgslxShader;
    export default shader;
}

declare module "\*.wgsli" {
    const shader: WgslxShader;
    export default shader;
}