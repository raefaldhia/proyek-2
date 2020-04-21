import axios, { AxiosResponse } from 'axios'
import {promises as fs} from 'fs'

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
}

const sendRequest = async (url: string): Promise<AxiosResponse<any>> => {
    console.log(`await axios.get(${url})`)
    try {
        return await axios.get(url)
    }
    catch {
        console.log()
        return sendRequest(url)
    }
}

const createDirectory = async (directoryName: string) => {
    try {
        console.log(`await fs.mkdir(${directoryName})`)

        await fs.mkdir(directoryName, {recursive: true})
    }
    catch {

    }
}

const fetchSubmission = async (id: string): Promise<void> => {
    console.log(`fetchSubmission(${id})`)

    const directoryName = `usersSubmission_records/${id}`;

    await createDirectory(directoryName)

    var page = 0;

    do {
        let response: AxiosResponse = await sendRequest(`https://judgeapi.u-aizu.ac.jp/submission_records/users/${id}?page=${page}&size=1000`)

        if (response.data.length === 0) {
            console.log(`response.data.length === 0 on page ${page}`)

            break;
        }

        const fileName = `${directoryName}/${page}.json`;

        console.log(`await fs.writeFile(${fileName}, data)`)

        fs.writeFile(fileName, JSON.stringify(response.data))

        ++page;
    } while (true)
}

const fetchSolutions = async (id: string): Promise<void> => {
    console.log(`fetchSolutions(${id})`)

    const directoryName = `usersSolutions/${id}`;

    await createDirectory(directoryName)

    var page = 0;

    do {
        let response: AxiosResponse = await sendRequest(`https://judgeapi.u-aizu.ac.jp/solutions/users/${id}?page=${page}&size=1000`)

        if (response.data.length === 0) {
            console.log(`response.data.length === 0 on page ${page}`)

            break;
        }

        const fileName = `${directoryName}/${page}.json`;

        console.log(`await fs.writeFile(${fileName}, data)`)

        fs.writeFile(fileName, JSON.stringify(response.data))

        ++page;
    } while (true)
}

const fetchCategoryRating = async (id: string): Promise<void> => {
    console.log(`fetchCategoryRating(${id})`)

    const directoryName = 'usersCategoryRating';

    await createDirectory(directoryName)

    let response: AxiosResponse = await sendRequest(`https://judgedat.u-aizu.ac.jp/rating/users/${id}/category`)

    const fileName = `${directoryName}/${id}.json`

    console.log(`await fs.writeFile(${fileName}, data)`)

    fs.writeFile(fileName, JSON.stringify(response.data))
}

const fetch = async (): Promise<void> => {
    console.log(`fetch():`)

    const directoryName = 'users';
    
    await createDirectory(directoryName)

    var page = 0;

    do {
        let response: AxiosResponse = await sendRequest(`https://judgeapi.u-aizu.ac.jp/users?page=${page}&size=1000`)

        if (response.data.length === 0) {
            console.log(`response.data.length === 0 on page ${page}`)

            break;
        }

        for (let data of response.data) {
            const fileName = `${directoryName}/${data['id']}.json`;

            console.log(`await fs.writeFile(${fileName}, data)`)

            fs.writeFile(fileName, JSON.stringify(data))

            fetchCategoryRating(data['id'])

            fetchSolutions(data['id'])

            fetchSubmission(data['id'])
        }

        ++page;
    } while (true)
}

fetch()