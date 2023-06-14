const prompt = require("prompt-sync")();
let vars = ["A", "B", "C"]

function get_code_gray() {
    let truthTable = []

    const numbers_vars = Number(prompt("Qual a quantidade de entradas?"));
    vars = vars.slice(0, numbers_vars)

    for (let i = 0; i < 2 ** numbers_vars; i++) {

        //gera as linhas da tabela verdade
        const binaryString = i.toString(2).padStart(numbers_vars, '0');
        const row = [];
        for (let j = 0; j < numbers_vars; j++) row.push(binaryString[j] === '0' ? 0 : 1);

        const row_code_gray = []

        for (let j in row) {
            let number_start = 0
            let number_stay = 0

            if (j == 0) {
                number_stay = row[j]
            } else {
                if (row[j - 1]) number_start = row[j - 1]
                number_stay = row[j] ^ number_start
            }
            if(i % 2 == 0)number_stay.reverse()
            row_code_gray.push(number_stay )
        }


        //saida da tabela verdade
        const value = Number(prompt(`Valor da linha ${i}:`))
        truthTable.push({ result: value, row: row_code_gray });
    }

    return truthTable


}

function simplification(codeGray) {
    let simplify = ""
    let groups = []
    console.log(codeGray)
    codeGray.map((item) => {

        if (item.result == 1) {
            groups = [...groups, ...item.row]
        } else {
          
            for (let i = 0; i < groups.length / 2; i++) {
                const bit1 = groups[i]
                const bit2 = groups[i + vars.length]
                if (bit1 === bit2) simplify += `${vars[i]}${bit1 === 0 ? "`" : ""}`
            }

            groups = []
        }

    })

    // selects.map((item) => {

    //     const array1 = item[0]
    //     const array2 = item[1]
    //     const array3 = item[2]
    //     const array4 = item[4]

    //     console.log(item)

    //         for (let j in array1) {
    //             const bit1 = array1[j]

    //             if (array2) {
    //                 const bit2 = array2[j]
    //                 if (bit1 === bit2)
    //                 simplify +=`${vars[j]}${bit1 === 0 ? "`" : ""}`
    //             }
    //         }
    //         if(selects[selects.length - 1] != item) simplify+="+"
    // })

    console.log(simplify)

}

const codeGray = get_code_gray()

simplification(codeGray)