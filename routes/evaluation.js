
const express = require('express');
const router = express.Router();
const evaluationRepository = require('../repositories/EvaluationRepository');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');
const { validationResult } = require('express-validator');


router.post("/", verifyToken, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newTemplate = await evaluationRepository.createEvaluationTemplate(req.body);
        res.status(201).json(newTemplate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la evaluación: " + error.message });
    }
});

/* LISTAR TODAS LAS EVALUACIONES */
router.get("/getEvaluations", verifyToken,async (req, res) => {
    try {
        const evaluations = await evaluationRepository.getEvaluations();
        res.status(200).json(evaluations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener evaluaciones" });
    }
});


router.get("/:id",verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const evaluation = await evaluationRepository.getEvaluationById(id);

        if (!evaluation) {
            return res.status(200).json({}); 
        }

        res.status(200).json(evaluation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener evaluacion" });
    }
});


router.put("/:id", verifyToken,async (req, res) => {
    try {
        const { id } = req.params;
        const evaluation = await evaluationRepository.updateEvaluation(id,req.body);

        if (!evaluation) {
            return res.status(200).json({}); 
        }

        res.status(200).json(evaluation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar evaluacion" });
    }
});


router.post("/responseEvaluation",verifyToken,async (req,res)=>{
    try {
        const newTemplate = await evaluationRepository.responseEvaluation(req.body);
        res.status(201).json(newTemplate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al responder la evaluación: " + error.message });
    }
});

router.get("/employee/:id", verifyToken,async (req, res)=>{
    try {
        const { id } = req.params;
        const evaluation = await evaluationRepository.evaluationByEmployee(id);

        if (!evaluation) {
            return res.status(200).json({}); 
        }

        res.status(200).json(evaluation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener evaluaciones" });
    }
})



module.exports = router;