'use strict' // 2021-07-13 10.50

export function xdStringBetween (string:string, start:string, end:string, mode:'short'|'long'|'all' = 'short') : string|string[]|undefined
{
    if (mode === 'short')
    {
        let istart = string.indexOf(start) + start.length
        if (istart - start.length === -1) return undefined
        const iend = string.indexOf(end, istart)
        if (iend === -1) return undefined
        istart = string.lastIndexOf(start, iend - 1) + start.length

        return string.slice(istart, iend)
    }
    else if (mode === 'long')
    {
        let istart = string.indexOf(start) + start.length
        let iend   = string.lastIndexOf(end)

        if (istart - start.length === -1 || iend === -1 || iend <= istart) return undefined
        return string.slice(istart, iend)
    }
    else
    {
        const matches = []

        while (1)
        {
            let istart = string.indexOf(start) + start.length
            if (istart - start.length === -1) break
            const iend = string.indexOf(end, istart)
            if (iend === -1) break
            istart = string.lastIndexOf(start, iend - 1) + start.length

            matches.push(string.slice(istart, iend))
            string = string.slice(iend + end.length)
        }

        return matches
    }
}