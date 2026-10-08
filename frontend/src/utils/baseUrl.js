/**
 * BASE_URL normalizado para sempre terminar em "/".
 *
 * O Vite monta esse valor a partir do `base` do vite.config.js
 * ("/trilha-do-programador"), e a barra final não é garantida em toda versão.
 * Sem normalizar, `${baseUrl}flag/br.svg` viraria ".../trilha-do-programadorflag/br.svg".
 *
 * Ficou aqui, e não copiado em cada arquivo, porque a mesma normalização já
 * tinha sido escrita duas vezes (Niveis e Trilha) e ia para uma terceira no
 * CartaoNivel.
 */
const baseUrl = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export default baseUrl;
