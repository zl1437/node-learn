import { log } from 'console'
import { dirname, join, resolve, basename, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const joined = join(__dirname, 'logs', 'example.js')
const resolved = resolve('logs', 'example.js');
console.log(joined);   // 拼接路径（不会解析绝对路径）
console.log(resolved); // 解析为绝对路径

console.log(basename('/foo/bar.txt'))
console.log(extname('/foo/bar.txt'))