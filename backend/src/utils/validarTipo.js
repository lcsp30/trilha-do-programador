export function validarTipoVariavel(valor, variavel, tipo) {
  if (tipo == "int") {
    if (typeof valor === "number" && Number.isInteger(valor)) {
      return valor;
    }

    if (typeof valor !== "string") {
      throw new Error(`${variavel} deve ser um número inteiro válido!`);
    }

    const texto = valor.trim();

    const numeroSemAspas = /^\d+$/.test(texto);

    if (numeroSemAspas) {
      return Number(texto);
    }

    const numeroComAspas = /^(['"])(\d+)\1$/.exec(texto);

    if (numeroComAspas) {
      return Number(numeroComAspas[2]);
    }

    throw new Error(`${variavel} deve ser um número inteiro válido!`);
  }

   if (tipo == "float") {
    
    // 1. Caso o valor já seja um número puro (inteiro ou decimal)
    if (typeof valor === "number" && isFinite(valor)) {
      return valor; // O JS já trata 12 e 12.0 como o mesmo número internamente
    }

    // 2. Bloqueia o que não for string
    if (typeof valor !== "string") {
       throw new Error(`${variavel} deve ser um número decimal válido!`);
    }

    const texto = valor.trim();

    // 3. String numérica pura (Inteiro ou Decimal, ex: "12" ou "12.34")
    // O (\.\d+)? torna a parte do ponto e dos decimais opcional
    const numeroSemAspas = /^\d+(\.\d+)?$/.test(texto);

    if (numeroSemAspas) {
      return Number(texto); // Converte "12" para 12 e "12.34" para 12.34
    }

    // 4. String com aspas litelas embutidas (ex: '"12.34"' ou "'12'")
    // Mudamos o grupo 2 para aceitar o ponto e decimais opcionais também
    const numeroComAspas = /^(['"])(\d+(?:\.\d+)?)\1$/.exec(texto);

    if (numeroComAspas) {
      return Number(numeroComAspas[2]); // Extrai apenas o número de dentro das aspas
    }

    // 5. Botão de emergência
    throw new Error(`${variavel} deve ser um número decimal válido!`);
  }

  if(tipo == "string"){
    if(typeof valor == "string"){
        return valor;
    }else{
         throw new Error(`${variavel} deve ser um texto válido!`);
    }
  }

   throw new Error(`${variavel} deve ser uma variavel valida!`);
}
