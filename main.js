const getDistanceBetween = (firstWord, secondWord) => {
    const distanceTable = makeTable(firstWord, secondWord)
    return distanceTable[secondWord.length][firstWord.length]
}

const makeTable = (firstWord, secondWord) => {
    let distanceTable = [ makeFirstRow(firstWord) ]
    for (let row = 1; row < secondWord.length + 1; row++)
        distanceTable.push(makeRow(distanceTable[row - 1], row, firstWord, secondWord))

    return distanceTable
}

const makeFirstRow = (firstWord) => [...Array(firstWord.length + 1).keys()]

const makeRow = (previousRow, currentRowPos, firstWord, secondWord) => {
    currentRow = [currentRowPos]
    const totalCols = firstWord.length + 1
    for (let colPos = 1; colPos < totalCols; colPos++)
        currentRow.push(getMinima(currentRow, previousRow, currentRowPos, colPos, firstWord, secondWord))

    return currentRow
}

const getMinima = (currentRow, previousRow, rowPos, colPos, firstWord, secondWord) => {
    const isSameLetter = firstWord[colPos - 1] === secondWord[rowPos - 1]
    return Math.min(currentRow[colPos - 1] + 1, previousRow[colPos] + 1, previousRow[colPos - 1] + (isSameLetter ? 0 : 2))
}

const main = () => {
    const firstWord = process.argv[2]
    const secondWord = process.argv[3]
    const levenshteinDistance = getDistanceBetween(firstWord, secondWord)
    console.log("The Levenshtein distance between " + firstWord + " and " + secondWord + " is " + levenshteinDistance)
}

main()
