import { spawn } from 'node:child_process'

const requiredEnvironment = ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID', 'CLOUDFLARE_ZONE_ID']
const missingEnvironment = requiredEnvironment.filter((name) => !process.env[name]?.trim())

if (missingEnvironment.length > 0) {
  console.error(`Missing required deployment environment: ${missingEnvironment.join(', ')}`)
  process.exit(1)
}

const terraformEnvironment = {
  ...process.env,
  TF_IN_AUTOMATION: '1',
  TF_VAR_cloudflare_account_id: process.env.CLOUDFLARE_ACCOUNT_ID,
  TF_VAR_cloudflare_zone_id: process.env.CLOUDFLARE_ZONE_ID,
}

function run(command, args, env = process.env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { env, stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', (code, signal) => {
      if (signal) {
        reject(new Error(`${command} terminated with signal ${signal}`))
        return
      }

      if (code !== 0) {
        reject(new Error(`${command} exited with code ${code}`))
        return
      }

      resolve()
    })
  })
}

try {
  await run('npm', ['run', 'build'])
  await run('npm', ['run', 'deploy'])
  await run('terraform', ['-chdir=infra/terraform', 'init', '-input=false'], terraformEnvironment)
  await run(
    'terraform',
    ['-chdir=infra/terraform', 'plan', '-input=false', '-out=/tmp/portfolio.tfplan'],
    terraformEnvironment,
  )
  await run(
    'terraform',
    ['-chdir=infra/terraform', 'apply', '-input=false', '-auto-approve', '/tmp/portfolio.tfplan'],
    terraformEnvironment,
  )
} catch (error) {
  console.error(error)
  process.exit(1)
}
