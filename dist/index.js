"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const wgslx_1 = require("@wgslx/wgslx");
__exportStar(require("./shader"), exports);
function wgslxLoader(source) {
    this.getOptions();
    const importResolver = {
        resolveFilePath: (baseFilePath, importPath) => {
            return (0, path_1.resolve)((0, path_1.dirname)(baseFilePath), importPath);
        },
        readSource: (filePath) => {
            if (!this.fs.readFileSync) {
                throw new Error('File system is not available.');
            }
            this.addDependency(filePath);
            return this.fs.readFileSync(filePath, 'utf8');
        },
    };
    const code = (0, wgslx_1.compileWgslx)(source, this.resourcePath, { mode: 'wgslx', importResolver });
    return [`const shader = {code:\`${code}\`};`, 'module.exports = shader;'].join('\n');
}
exports.default = wgslxLoader;
