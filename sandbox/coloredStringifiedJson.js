export default (data) => JSON.stringify(data, null, 2)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => (/^"/.test(match) && /:$/.test(match))  ? `\x1B[31m${match}\x1B[0m` : (/^"/.test(match)) ? `\x1B[32m${match}\x1B[0m` : (/true|false/.test(match)) ? `\x1B[34m${match}\x1B[0m` : (/null/.test(match)) ? `\x1B[35m${match}\x1B[0m` : `\x1B[33m${match}\x1B[0m`)

