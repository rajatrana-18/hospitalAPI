import ReportRepository from "./report.repository.js";

export default class ReportController {
    constructor() {
        this.reportRepository = new ReportRepository();
    }

    // This function is used to register a new patient
    // If the patient is already registered, it will return the patient information.
    async register(req, res, next) {
        try {
            const { patientName, phoneNumber } = req.body;
            const patient = await this.reportRepository.registerPatient(patientName, phoneNumber);
            if (patient) {
                res.status(200).send(patient);
            } else {
                res.status(200).send("New patient registered successfully");
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("Something went wrong")
        }
    }

    // This function is used to create a report of a patient. The report will contain the name of the doctor and the status of illness. 
    // It takes the id of the patient as a parameter in the url.
    async createReport(req, res, next) {
        try {
            const id = req.params.id;
            console.log("The id is " + id);
            const { createdBy, status } = req.body;
            const newReport = await this.reportRepository.createReport(id, createdBy, status);
            if (newReport) {
                res.status(200).send("Report created successfully");
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("Something went wrong")
        }
    }

    // This function is used to get all the reports of a particular patient.
    // If no such patient with the id specified in the url is found, it will display "No such patient found"
    async getReportsOfOnePatient(req, res, next) {
        try {
            const id = req.params.id;
            const getReports = await this.reportRepository.getReportsOfOnePatient(id);
            if (getReports) {
                res.status(200).send(getReports);
            } else {
                res.status(400).send("No such patient found");
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("Something went wrong")
        }
    }

    // THis function is used to filter all the reports of all the patients based on a particular status. 
    // if there is no patient found with a parituclar status or the status is different from the enums specified in the schema then it will return "No report found"
    async getReportsBasedOnStatus(req, res, next) {
        try {
            const status = req.params.status;
            const reports = await this.reportRepository.getReportsBasedOnStatus(status);
            if (reports) {
                res.status(200).send(reports);
            } else {
                res.status(200).send("No report found")
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("Something went wrong")
        }
    }
}