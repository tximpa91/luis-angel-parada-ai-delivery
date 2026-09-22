import { spawn } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const configPath = new URL('../wrangler.jsonc', import.meta.url)
const contactEmail = process.env.VITE_CONTACT_EMAIL?.trim()

if (contactEmail) {
  const config = JSON.parse(readFileSync(configPath, 'utf8'))
  config.containers[0].image_vars = {
    ...config.containers[0].image_vars,
    VITE_CONTACT_EMAIL: contactEmail,
  }
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`)
}

const deployment = spawn('npm', ['run', 'deploy'], {
  env: process.env,
  stdio: 'inherit',
})

deployment.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 1)
})

deployment.on('error', (error) => {
  console.error(error)
  process.exit(1)
})
