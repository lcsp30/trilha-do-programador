import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import traduzir from "../utils/logicaTraducao.js";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { spawn } from "node:child_process";
import { dadosValidacoes } from "../validacoes/dadosValidacoes.js";

const PASTA_TEMPORARIA = fileURLToPath(new URL("../../.tmp", import.meta.url));
const PREFIXO_PASTA = "trilha-programa-";

export async function validarResposta(code, pais, numeroDesafio) {
  const validacao = dadosValidacoes(pais, numeroDesafio);

  if (!validacao || typeof validacao !== "object") {
    throw new Error(`Desafio não encontrado: ${pais}/${numeroDesafio}`);
  }

  const entradas = validacao.entradas;
  const saidas = validacao.saidas;

  const resultado = [];

  const quantidadeSaidas = Object.keys(saidas).length;
  let contador = 0;

  for (const [chave, arrayValores] of Object.entries(entradas)) {
    console.log(chave + " :" + arrayValores);
    console.log(saidas[chave]);

     const saidaEsperada = saidas[chave].toString();

      const codeTraduzido = await traduzir(code, arrayValores);

      await mkdir(PASTA_TEMPORARIA, { recursive: true });

      const pasta = await mkdtemp(path.join(PASTA_TEMPORARIA, PREFIXO_PASTA));
      const arquivo = path.join(pasta, "programa.js");


    try {
      await writeFile(arquivo, codeTraduzido, "utf8");

      const processo = spawn(process.execPath, [arquivo], {
        cwd: pasta,
        stdio: ["ignore", "pipe", "pipe"],
        env: {
          ...process.env,
          NODE_DISABLE_COLORS: "1",
          NO_COLOR: "1",
        },
      });

      var stdout = "";
      var stderr = "";

      processo.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      processo.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      const codigoSaida = await new Promise((resolve, reject) => {
        processo.on("error", reject);
        processo.on("close", resolve);
      });

      const saidaAluno = stdout.trim();

      if(codigoSaida === 0 && saidaAluno === saidaEsperada){
            contador++;
      }

      resultado.push({
        ok: codigoSaida === 0 && saidaAluno === saidaEsperada,
        saida: saidaAluno,
        esperado: saidaEsperada,
        erro: stderr,
      });
    } finally {
      await rm(pasta, { recursive: true, force: true }).catch(() => {});
    }
  }

  if(contador == quantidadeSaidas){
    return true;
  }else{
    return {resultado};
  }

  // if (codigoSaida !== 0) {
  //     return {
  //         ok: false,
  //         erro: stderr || `O programa terminou com código ${codigoSaida}`,
  //         saida: saidaAluno,
  //         esperado: saidaEsperada,
  //     };
  // }

  // return {
  //     ok: saidaAluno === saidaEsperada,
  //     saida: saidaAluno,
  //     esperado: saidaEsperada,
  // };
}
