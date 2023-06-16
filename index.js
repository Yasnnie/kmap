const prompt = require("prompt-sync")();
let vars = ["A", "B", "C"];

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

function k_map(codeGray) {
    //Linhas laterais
    const x2 = ["A`", "A"];
    const x3 = ["A`B`", "A`B", "A B", "AB`"];
    const tamanho = vars.length == 3; //Verifica se é 3 variáveis

    console.log(codeGray)
    console.log("\n==Mapa de Karnaugh==\n");


    tamanho ? console.log("____  C`| C |") : console.log("__  B`| B |");
    const escolha = tamanho ? x3 : x2;

    let line = escolha[0] + "| ";
    let count = 1;
    const left_array = codeGray.slice(0, codeGray.length / 2)
    let right_array = codeGray.slice(codeGray.length / 2, codeGray.length)

    right_array = right_array.reverse()

    const kmap_array = [...left_array, ...right_array]

    kmap_array.map((item, index) => {
        line += item.result + " | ";

        if (index % 2 != 0) {
            const start = escolha[count] != undefined ? escolha[count] + " | " : "";
            line += "\n" + start;
            count += 1;
        }
    });

    console.log(line);
}

function simplification(codeGray) {
    let simplify = "";
    let groups = [];
    let selects = [];

    codeGray.map((item, index) => {
        if (item.result == 1) {

            if(index == 0 && codeGray[codeGray.length - 1].result == 1){
                selects.push([item.row,codeGray[codeGray.length - 1].row])
            }else{
                groups = [...groups, item.row];
            }

            if (index == codeGray.length - 1 && codeGray[codeGray.length - 1].result != 1 && groups.length >= 1) selects.push(groups);
        } else {
            if (groups.length >= 1) selects.push(groups);
            groups = [];
        }
    });

    console.log(selects)

    selects.map((item) => {
        const pos_1 = []
        const pos_2 = []
        const pos_3 = []

        for (let j in item) {
            pos_1.push(Number(item[j][0]))
            pos_2.push(Number(item[j][1]))
            if (item[j][2]) pos_3.push(Number(item[j][2]))
        }

        let soma1 = pos_1.reduce(function (soma, i) {
            return soma + i;
        });

        let soma2 = pos_2.reduce(function (soma, i) {
            return soma + i;
        });

        let soma3 = undefined

        if (pos_3.length != 0)
            soma3 = pos_3.reduce(function (soma, i) {
                return soma + i;
            });

        // PEGA AS COMBINAÇÕES
        if (soma1 == 0) simplify += "A'"
        if (soma1 == pos_1.length) simplify += "A"
        if (soma2 == 0) simplify += "B'"
        if (soma2 == pos_2.length) simplify += "B"
    
        if (soma3 && soma3 == 0) simplify += "C'"
        if (soma3 && soma3 == pos_3.length) simplify += "C"
        if (selects[selects.length - 1] != item) simplify += "+";
    });

    console.log(simplify);
}

const codeGray = get_code_gray();
k_map(codeGray);
simplification(codeGray);
