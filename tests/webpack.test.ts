import { resolve } from 'path';
import { default as webpack, Compiler, Stats } from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';

// Promisify the webpack compiler.
function compileAsync(compiler: Compiler) {
    return new Promise((resolve, reject) => {
        compiler.run((error: Error | null, stats?: Stats) => {
            if (error || stats?.hasErrors()) {
                const resolvedError = error || stats?.toJson('errors-only')[0]
                reject(resolvedError.message)
            }

            resolve(stats)
        })
    })
}

describe('wgslx-loader', () => {
    it('compiles', async () => {
        // Configure a webpack compiler.
        const compiler = webpack({
            mode: 'development',
            entry: resolve(__dirname, './data/basic.wgsl'),
            output: { filename: 'basic.wgsl' },
            module: {
                rules: [
                    {
                        test: /\.wgsl$/,
                        use: [require.resolve('../src/index.ts')],
                    },
                ],
            },
        });

        // Create an in-memory file system so that the build assets
        // are not emitted to disk during test runs.
        const memoryFs = createFsFromVolume(new Volume());
        compiler.outputFileSystem = memoryFs as any;

        // Compile the bundle.
        await compileAsync(compiler);

        // Expect the compiled code to create an "audio" element in React.
        const compiledCode = memoryFs.readFileSync('dist/basic.wgsl', 'utf8');
        expect(compiledCode).toContain('hello world');
    }, 10000);
});