import {promises as fs} from 'fs'
import path from 'path'

const generateById = async (id: string): Promise<string> => {
    let csv: Array<any> = new Array()

    const files = await fs.readdir(`usersSolutions/${id}`)

    for (const file of files) {
        const submissions = JSON.parse(await fs.readFile(`usersSolutions/${id}/${file}`, 'utf-8'))

        for (const submission of submissions) {
            let row: Array<any> = new Array()

            var value = submission['userId']
            row.push(value)
            var value = submission['problemId']
            row.push(value)
            var value = submission['submissionDate']
            row.push(value)

            csv.push(row.join(','))
        }
    }

    return csv.join('\n')
}

const init = async () => {
    const files = await fs.readdir('users');

    const fHandler: fs.FileHandle = await fs.open('solved.csv', 'w')

    await fHandler.write('userId,problemId,submissionDate,status\n')

    for (const file of files) {
        const result = await generateById(path.basename(file, '.json'))
        
        if (result.length !== 0) {
            await fHandler.write(result.concat('\n'))
        }
    }

    fHandler.close()
}

init()
