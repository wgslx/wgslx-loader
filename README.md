# WGSLX Loader (wgslx-loader)

Webpack loader for wgsl, wgslx, and wgsli files. Load, validate, and minify WebGPU
shaders with ease. Planned support for including other shader files.

```ts
import { code } from './shader.wgsl';

//...

const shaderModule = device.createShaderModule({ code });
```

```ts
/** Shader module. */
export interface WgslxShader {
    /** Shader source. */
    readonly code: string;

    /** Shader label derived from the file name. */
    readonly label?: string;

    /** Shader source map if configured to be generated. */
    readonly sourceMap?: string;
}
```

## Installation

```sh
npm install --save-dev wgslx-loader
```

## Usage

## Install webpack loader for \*.wgsl, \*.wgslx, and \*.wgslxi files

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(wgsl[ix]?)$/,
                use: 'wgslx-loader',
            },
        ],
    },
};
```

### Install types for \*.wgsl, \*.wgslx, and \*.wgslxi files

```json
{
    "compilerOptions": {
        "types": ["@wgslx/wgslx-loader"]
    }
}
```