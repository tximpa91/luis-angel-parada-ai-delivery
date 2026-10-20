// Require an explicit, acceptable Markdown media type. Wildcard-only browser
// requests must keep receiving HTML. Honor q=0 and a stronger HTML preference.
export function prefersMarkdown(accept = '') {
  const ranges = accept.toLowerCase().split(',').map((range) => {
    const [type, ...parameters] = range.trim().split(';')
    const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith('q='))
    const value = qualityParameter?.trim().slice(2).trim()
    const quality = value === undefined ? 1
      : /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(value) ? Number(value) : 0
    return { type: type.trim(), quality }
  })
  const markdown = Math.max(0, ...ranges.filter(({ type }) => type === 'text/markdown')
    .map(({ quality }) => quality))
  if (!markdown) return false

  // More specific ranges override wildcards, even if their quality is lower.
  const htmlRange = ['text/html', 'text/*', '*/*']
    .map((type) => ranges.filter((range) => range.type === type))
    .find((matches) => matches.length)
  const html = htmlRange ? Math.max(...htmlRange.map(({ quality }) => quality)) : 0
  return markdown >= html
}

export function varyOnAccept(headers) {
  const vary = headers.get('Vary')
  if (vary === '*' || vary?.split(',').some((value) => value.trim().toLowerCase() === 'accept')) return
  headers.set('Vary', vary ? `${vary}, Accept` : 'Accept')
}
export function markdownAssetPath(pathname) {
  return `/_agent-markdown${pathname === '/' ? '/index' : pathname}.md`
}
