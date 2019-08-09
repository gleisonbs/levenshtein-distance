const makeTable = () => {
    const firstWord = process.argv[2]
    const secondWord = process.argv[3]

    console.log("making table for " + firstWord + " and " + secondWord)

    let distanceTable = makeFirstCol(secondWord)
    distanceTable[0] = makeFirstRow(firstWord)
    fillTable(distanceTable, firstWord, secondWord)

    console.log(distanceTable)
}

const makeFirstRow = (firstWord) => {
    let firstRow = [...Array(firstWord.length + 1).keys()]
    return firstRow
}

const makeFirstCol = (secondWord) => {
    let firstCol = []
    for (let i = 0; i <= secondWord.length; i++)
        firstCol.push([i])
    return firstCol
}

const fillTable = (table, firstWord, secondWord) => {
    cols = firstWord.length + 1
    rows = secondWord.length + 1
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            table[i].push(999)
        }
    }

    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            table[i][j] = getMinima(table[i], table[i-1], i, j, firstWord, secondWord)
        }
    }
}

const isSameLetter = (firstWord, secondWord, row, col) => {
    return firstWord[col] === secondWord[row]
}

const getMinima = (currentLine, upperLine, row, col, firstWord, secondWord) => {
    if (isSameLetter(firstWord, secondWord, row-1, col-1)) {
        return upperLine[col-1]
    }
    const m1 = currentLine[col-1] + 1
    const m2 = upperLine[col] + 1
    const m3 = upperLine[col-1] + (isSameLetter(firstWord, secondWord, row-1, col-1) ? 0 : 2)
    return Math.min(m1, m2, m3)
}

makeTable()
