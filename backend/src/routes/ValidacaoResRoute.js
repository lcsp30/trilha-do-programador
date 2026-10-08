import { Router } from "express";
import postCode from "../controllers/ValidacaoResController.js";

let CodigoRoute = Router();

CodigoRoute.post("/", postCode);

export default CodigoRoute;