import { validarResposta } from "../services/ValidacaoResService.js";

async function postCode(req, res, next) {
    try {
        const code = req.body.code;
        const pais = req.body.pais;
        const numeroDesafio = req.body.numero_desafio;

        if (typeof code !== "string") {
            return res.status(400).json({
                erro: "O campo code é obrigatório."
            });
        }

        const resultado = await validarResposta(code, pais, numeroDesafio);

        return res.status(200).json({
            res: resultado
        });
    } catch (error) {
        next(error);
    }
}

export default postCode;