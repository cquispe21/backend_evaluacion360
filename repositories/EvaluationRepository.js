const EvaluationTemplate = require('../models/EvaluationTemplate');
const EvaluationAssignment = require('../models/EvaluationAssigment');
const EvaluationResponse = require('../models/EvaluationResponse');
const Employee = require('../models/Employee');

const createEvaluationTemplate = async (templateData) => {
    const { title, description, questions, status } = templateData;

    const existingTemplate = await EvaluationTemplate.findOne({ title }).exec();
    if (existingTemplate) {
        throw new Error("Ya existe una plantilla de evaluación con el mismo título");
    }

    const newTemplate = new EvaluationTemplate({
        title,
        description,
        questions,
        status
    });

    await newTemplate.save();
    return {
        "data": {},
        "error": false,
        "msgRetorno": "Evaluación creada",
        "code": 200
    }

};


const assignEvaluation = async (data) => {
    const { templateId, evaluatorId, evaluatedId } = data;

    const newTemplate = new EvaluationAssignment({
        templateId,
        evaluatorId,
        evaluatedId
    });

    await newTemplate.save();
}

const getEvaluations = async () => {
    const evaluations = await EvaluationTemplate.find();

    return {
        "data": evaluations || {},
        "error": false,
        "msgRetorno": "",
        "code": 200
    }

};


const getEvaluationById = async (id) => {
    const evaluation = await EvaluationTemplate.findById(id);
    return {
        "data": evaluation || {},
        "error": false,
        "msgRetorno": "",
        "code": 200
    }

};

const updateEvaluation = async (idEvaluation, data) => {

    const evaluation = await EvaluationTemplate.findById(idEvaluation)

    await evaluation.deleteOne();

    const { title, description, questions, status } = data;

    const newEvaluation = new EvaluationTemplate({
        title,
        description,
        questions,
        status
    });

    const savedEvaluation = await newEvaluation.save()
    
    const employees = await Employee.find();

    if (data.status == "publica") {
        employees.map((employee) => {
            const assigmment = new EvaluationAssignment({
                templateId: savedEvaluation._id,
                evaluatorId: employee.idUser,
            })

            assigmment.save();
        })
    }

    return {
        "data": {},
        "error": false,
        "msgRetorno": "Evaluación actualizada correctamente",
        "code": 200
    }

}

const evaluationByEmployee = async (evaluatorId) => {
    try {
        const assignments = await EvaluationAssignment.find({ evaluatorId }).lean(); 
        

        if (!assignments.length) {
            return {
                data: [],
                error: false,
                msgRetorno: "No se encontraron evaluaciones.",
                code: 200
            };
        }

        const assignmentIds = assignments.map(a => a._id);
        const responses = await EvaluationResponse.find({ assignmentId: { $in: assignmentIds } }).lean();
        const enrichedAssignments = assignments.map(assignment => {
            const relatedResponses = responses.filter(res => res.assignmentId.toString() === assignment._id.toString());
            return {
                ...assignment,
                templateId: assignment.templateId,
                responses: relatedResponses
            };
        });

        return {
            data: enrichedAssignments,
            error: false,
            msgRetorno: "",
            code: 200
        };

    } catch (error) {
        return {
            data: null,
            error: true,
            msgRetorno: error.message,
            code: 500
        };
    }
};


const responseEvaluation = async (data) =>{
    const { assignmentId, evaluateId, answers } = data;

    const response = new EvaluationResponse({
        assignmentId,
        evaluateId,
        answers
    })

    response.save();

    return {
        "data": {},
        "error": false,
        "msgRetorno": "Evaluación respondida correctamente",
        "code": 200
    }
}

module.exports = {
    createEvaluationTemplate,
    getEvaluations,
    getEvaluationById,
    updateEvaluation,
    assignEvaluation,
    responseEvaluation,
    evaluationByEmployee
};
