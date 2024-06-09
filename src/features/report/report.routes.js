import express from 'express';
import ReportController from './report.controller.js';
import jwtAuth from '../middlewares/jwt.middleware.js';

const reportRouter = express.Router();
const reportController = new ReportController();        // creating an instance of the controller.

// post request to register a new patient
reportRouter.post('/register', jwtAuth, (req, res, next) => {
    reportController.register(req, res, next)
});

// post request to create a report of a particular patient based on the id of the patient.
reportRouter.post('/:id/create_report', jwtAuth, (req, res, next) => {
    reportController.createReport(req, res, next)
});

// get request to fetch all the reports of a particular patient based on the id of the patient
reportRouter.get('/:id/all_reports', jwtAuth, (req, res, next) => {
    reportController.getReportsOfOnePatient(req, res, next)
});

// get request to fetch all the reports based on a particular status filter. 
reportRouter.get('/:status', jwtAuth, (req, res, next) => {
    reportController.getReportsBasedOnStatus(req, res, next)
});

export default reportRouter;