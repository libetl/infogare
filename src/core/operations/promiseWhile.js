

const iterate = (condition, oldResponse, promiseGenerator) => {
    const forcedResponseAsFunction = typeof oldResponse === 'function' ? oldResponse : () => oldResponse
    if (oldResponse && !condition(forcedResponseAsFunction())) {
        return forcedResponseAsFunction
    }
    return promiseGenerator().then(newResponse => iterate(condition, newResponse, promiseGenerator))
}

const promiseWhile = (condition, execute, oldResponse) => iterate(condition, oldResponse,
    () => execute().then(newResponse => promiseWhile(condition, execute, newResponse)))

export default promiseWhile