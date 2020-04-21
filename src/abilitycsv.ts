import {promises as fs} from 'fs'
import path from 'path'

const generateById = async (id: string): Promise<string> => {
    let csv: Array<any> = new Array();

    var data = JSON.parse(await fs.readFile(`users/${id}.json`, 'utf-8'))
    csv.push(data['id'])

    try {
        csv.push(data['status']['solved'])
    }
    catch {
        csv.push(0)
    }

    var data = JSON.parse(await fs.readFile(`usersCategoryRating/${id}.json`, 'utf-8'))
    var value = data['whatCategoryRatings'].find((element: any) => element.categoryId === '0')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['whatCategoryRatings'].find((element: any) => element.categoryId === '1')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['whatCategoryRatings'].find((element: any) => element.categoryId === '2')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['whatCategoryRatings'].find((element: any) => element.categoryId === '3')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['whatCategoryRatings'].find((element: any) => element.categoryId === '4')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['whatCategoryRatings'].find((element: any) => element.categoryId === '5')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['whatCategoryRatings'].find((element: any) => element.categoryId === '6')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['whatCategoryRatings'].find((element: any) => element.categoryId === '7')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['whatCategoryRatings'].find((element: any) => element.categoryId === '8')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['whatCategoryRatings'].find((element: any) => element.categoryId === '9')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['whatCategoryRatings'].find((element: any) => element.categoryId === '10')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['whatCategoryRatings'].find((element: any) => element.categoryId === '11')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['whatCategoryRatings'].find((element: any) => element.categoryId === '12')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['whatCategoryRatings'].find((element: any) => element.categoryId === '13')
    csv.push(value === undefined ? 0 : value.value)

    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '100')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '110')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '200')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '210')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '220')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '300')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '310')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '320')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '330')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '400')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '410')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '420')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '430')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '440')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '450')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '500')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '510')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '520')
    csv.push(value === undefined ? 0 : value.value)
    var value = data['howCategoryRatings'].find((element: any) => element.categoryId === '530')
    csv.push(value === undefined ? 0 : value.value)

    return csv.join(',')
}

const init = async () => {
    const files = await fs.readdir('users');

    const fHandler: fs.FileHandle = await fs.open('ability.csv', 'w')
    for (const file of files) {
        await fHandler.write((await generateById(path.basename(file, '.json'))) + '\n')
    } 
    fHandler.close()
}

init()