import webservice from '../src/core/webservice'
import somePlaces from '../src/core/somePlaces'

webservice.nextDepartures(somePlaces.parisGareDeLyon, process.env.TOKEN)
    .then(data => console.log(syntaxHighlight(JSON.stringify(data, null, 2))))

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = '33'
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = '31'
            } else {
                cls = '32'
            }
        } else if (/true|false/.test(match)) {
            cls = '34'
        } else if (/null/.test(match)) {
            cls = '35'
        }
        return '\x1B' + '[' + cls + 'm' + match + '\x1B' + '[0m'
    })
}