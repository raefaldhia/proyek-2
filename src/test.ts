const afun = async () => {
    console.log('lmao')

    return new Promise(() => {
        console.log('yolo')
    })
}

const init = async () => {
    await afun()

    console.log('ayy')
}
