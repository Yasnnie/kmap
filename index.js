const prompt = require("prompt-sync")();
let vars = ["A", "B", "C"];

function get_code_gray() {
  let truthTable = [];

  const numbers_vars = Number(prompt("Qual a quantidade de entradas?"));
  vars = vars.slice(0, numbers_vars);

  for (let i = 0; i < 2 ** numbers_vars; i++) {
    //gera as linhas da tabela verdade
    const binaryString = i.toString(2).padStart(numbers_vars, "0");
    const row = [];
    for (let j = 0; j < numbers_vars; j++)
      row.push(binaryString[j] === "0" ? 0 : 1);

    const row_code_gray = [];

    for (let j in row) {
      let number_start = 0;
      let number_stay = 0;

      if (j == 0) {
        number_stay = row[j];
      } else {
        if (row[j - 1]) number_start = row[j - 1];
        number_stay = row[j] ^ number_start;
      }
      row_code_gray.push(number_stay);
    }

    //saida da tabela verdade
    const value = Number(prompt(`Valor da linha ${i}:`));
    truthTable.push({ result: value, row: row_code_gray });
  }

  return truthTable;
}

function k_map(codeGray) {
  const x2 = ["A`", "A"];
  const x3 = ["A`B`", "A`B", "A B", "AB`"];

  console.log("\n==Mapa de Karnaugh==\n");

  const tamanho = vars.length == 3;
  tamanho ? console.log("____  C`| C |") : console.log("__  B`| B |");
  const escolha = tamanho ? x3 : x2;

  let line = escolha[0] + "| ";
  let count = 1;

  codeGray.map((item, index) => {
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
console.log(codeGray)
  codeGray.map((item, index) => {
    if (item.result == 1) {
      groups = [...groups, item.row];
      
      if (index == codeGray.length -1 && groups.length >= 1) selects.push(groups);
    } else {
      if (groups.length >= 1) selects.push(groups);
      groups = [];
    }
  });

  selects.map((item) => {
    const array1 = item[0];
    const array2 = item[1];
    const array3 = item[2];
    const array4 = item[4];

    for (let j in array1) {
      const bit1 = array1[j];

      if (array2) {
        const bit2 = array2[j];
        if (bit1 === bit2) simplify += `${vars[j]}${bit1 === 0 ? "`" : ""}`;
      } else {
        simplify += `${vars[j]}${bit1 === 0 ? "`" : ""}`;
      }
    }
    if (selects[selects.length - 1] != item) simplify += "+";
  });

  console.log(simplify);
}

const codeGray = get_code_gray();
k_map(codeGray);
simplification(codeGray);
