// Controller provisioning helper. The official Spline binary is not republished in Git.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import process from 'node:process'
import { Buffer } from 'node:buffer'
const source = {"url": "https://unpkg.com/@splinetool/modelling-wasm@1.12.98/build/process.wasm", "bytes": 504317, "sha256": "421e4f92df38c0c7776fe6cb8f591ce965a6af03cc170a5430dcf9ad32ff02a7"}
const target = new URL('../public/scenes/runtime-1.12.98/process.wasm', import.meta.url)
const valid = data => data.length === source.bytes && createHash('sha256').update(data).digest('hex') === source.sha256
try {
  const data = await readFile(target)
  if (valid(data)) process.exit(0)
  throw new Error('Existing Spline asset differs from the reviewed hash; refusing to overwrite')
} catch (error) { if (error.code !== 'ENOENT') throw error }
const response = await fetch(source.url, { redirect: 'error', signal: AbortSignal.timeout(45000) })
if (!response.ok || !response.body) throw new Error('Official Spline resource unavailable')
const chunks = []; let size = 0
for await (const chunk of response.body) {
  size += chunk.length
  if (size > source.bytes) throw new Error('Spline resource exceeded reviewed size')
  chunks.push(chunk)
}
const data = Buffer.concat(chunks)
if (!valid(data)) throw new Error('Spline resource hash differs; human review required')
await mkdir(new URL('.', target), { recursive: true })
await writeFile(target, data, { flag: 'wx' })
console.log('Official Spline resource verified and provisioned locally')
