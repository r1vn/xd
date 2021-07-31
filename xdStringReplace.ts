'use strict' // 2021-07-13 15.42

export function xdStringReplace (string:string, replacee:string, replacement:string) : string
{
    let body = ''
    let tail = string

    while (1)
    {
        const n = tail.indexOf(replacee)
        if (n === -1) break
        body += tail.slice(0, n) + replacement
        tail = tail.slice(n + replacee.length)
    }

    return body + tail
}