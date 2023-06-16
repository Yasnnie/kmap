const prompt = require("prompt-sync")();
let vars = ["A", "B", "C"];

const soma_array = (array) => array.reduce(function (soma, i) {
    return soma + i;
})

function divideArray(array) {
    let result = [];

    if (array.length == 3) {
        result.push(array.slice(0, 2));
        result.push(array.slice(-2));
    }else if (array.length == 5) {
        console.log("5")
    } else {
        result.push(array)
    }

    return result;
}

function get_code_gray() {
    let codeGray = []
    //Recebe quantas variáveis são
    const numbers_vars = Number(prompt("Qual a quantidade de entradas?"));
    vars = vars.slice(0, numbers_vars);

    for (let i = 0; i < 2 ** numbers_vars; i++) {
        //gera as linhas da tabela verdade
        const binaryString = i.toString(2).padStart(numbers_vars, "0");

        const row = [];
        for (let j = 0; j < numbers_vars; j++)
            row.push(binaryString[j] === "0" ? 0 : 1);


        // Gera apartir das linhas da tabela verdade o código de gray 
        const row_code_gray = [];

        for (let j in row) {
            let number_start = 0;
            let number_stay = 0;

            //Transforma apartir da linha https://www.youtube.com/watch?v=bcmD_nGWSQg
            if (j == 0) {
                number_stay = row[j];
            } else {
                if (row[j - 1]) number_start = row[j - 1];
                number_stay = row[j] ^ number_start;
            }
            row_code_gray.push(number_stay);
        }

        //Saida da tabela verdade
        const value = Number(prompt(`Valor da linha ${i}:`));

        codeGray.push({ result: value, row: row_code_gray.join("") });
    }

    return codeGray;
}

function criarMapaKarnaugh(vetor) {
    const numVariaveis = Math.log2(vetor.length);

    if (numVariaveis == 2) {
        const mapa = `     
  ''  B~  B
  A~| ${vetor[0].result} | ${vetor[1].result} | 
  A | ${vetor[3].result} | ${vetor[2].result} |
    `;
        return mapa;
    } else if (numVariaveis == 3) {
        const mapa = `     
  ''    C~  C
  A~B~| ${vetor[0].result} | ${vetor[1].result} | 
  A~B | ${vetor[3].result} | ${vetor[2].result} |
  A B | ${vetor[4].result} | ${vetor[5].result} |
  A B~| ${vetor[7].result} | ${vetor[6].result} |
    `;
        return mapa;
    }
}



function simplification(codeGray) {
    let simplify = "";
    let groups = [];
    let selects = [];

    codeGray.map((item, index) => {
        if (item.result == 1) {

            if (index == 0 && codeGray[codeGray.length - 1].result == 1) {
                selects.push([item.row, codeGray[codeGray.length - 1].row])
            } else {
                groups = [...groups, item.row];
            }

            if (index == codeGray.length - 1 && codeGray[codeGray.length - 1].result != 1 && groups.length >= 1) selects.push(groups);
        } else {
            if (groups.length >= 1) selects.push(groups);
            groups = [];
        }
    });

    let new_select = []
    
    selects.map((item) => {
        const subArrays = divideArray(item)
        new_select = [...new_select, ...subArrays]
    })

    
    new_select.map((item) => {
        const pos_1 = []
        const pos_2 = []
        const pos_3 = []

        for (let j in item) {
            pos_1.push(Number(item[j][0]))
            pos_2.push(Number(item[j][1]))
            if (item[j][2]) pos_3.push(Number(item[j][2]))
        }

        let soma1 = soma_array(pos_1);
        let soma2 = soma_array(pos_2)
        let soma3 = undefined
        if (pos_3.length != 0) soma3 = soma_array(pos_3)

        // PEGA AS COMBINAÇÕES
        if (soma1 == 0) simplify += "A'"
        if (soma1 == pos_1.length) simplify += "A"
        if (soma2 == 0) simplify += "B'"
        if (soma2 == pos_2.length) simplify += "B"

        if (soma3 && soma3 == 0) simplify += "C'"
        if (soma3 && soma3 == pos_3.length) simplify += "C"

        if (new_select[new_select.length - 1] != item) simplify += "+";
    });

    console.log(simplify);
}

const codeGray = get_code_gray();
console.log(codeGray)
console.log(criarMapaKarnaugh(codeGray));
simplification(codeGray);
