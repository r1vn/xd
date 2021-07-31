'use strict' // 2021-03-20 12.28

type TArgs = string[]
type TOpts = { [opt: string]: boolean | string }

/**
interprets `-` and `--` as prefixes for key-value or boolean true options, `---` as boolean false option prefix<br>
strings without dash prefixes are considered to be arguments<br>
order doesn't matter
@example
xdArgvParse(['arg1', '-opt1', '--opt2', '-opt3=foo', '--opt4=bar baz', '---opt5', 'arg2'])
 // {
 //  args: [ 'arg1', 'arg2' ],
 //  opts: { opt1: true, opt2: true, opt3: 'foo', opt4: 'bar baz', opt5: false }
 // }
*/

export function xdArgvParse (argv: string[]): { args: TArgs, opts: TOpts }
{
    const args: TArgs = []
    const opts: TOpts = {}

    for (let str of argv)
    {
        if (!str.startsWith('-'))
        {
            args.push(str)
        }
        else if (str.startsWith('---'))
        {
            opts[str.slice(3)] = false
        }
        else
        {
            str = str.replace(/^-+/, '')

            if (str.indexOf('=') === -1)
            {
                opts[str] = true
            }
            else
            {
                const key = str.slice(0, str.indexOf('='))
                const val = str.slice(str.indexOf('=') + 1)
                opts[key] = val
            }
        }
    }

    return { args, opts }
}