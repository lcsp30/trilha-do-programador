import lexar from "./lexar.js";
import criarParser from "./parser.js";
import geradorJs from "./geradorJs.js";

const code = `
variavel v;
variavel y;

v = 10;
y = 8;

mostrar(v + y);
`;

function index(code){

let c = lexar(code);
let d = criarParser(c);
let codeJs = geradorJs(d);
console.log(c);
console.log("--------------------------------");
console.log(d);
console.log("--------------------------------");
console.log(codeJs);

let excultar = new Function(codeJs);
let res = excultar();
// console.log(res);


// console.log(codeJs);
// return codeJs;
}

index(code);

export default index;



