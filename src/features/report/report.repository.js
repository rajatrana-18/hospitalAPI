import mongoose from "mongoose";
import { reportSchema } from "./report.schema.js";
import { ObjectId } from "mongodb";
const reportModel = mongoose.model('Report', reportSchema);

export default class ReportRepository {
    // function to register a new patient.
    async registerPatient(name, number) {
        try {
            const patient = await reportModel.findOne({ phoneNumber: number });
            if (patient) {      // if already registered, return the patient information.
                return patient;
            } else {            // Otherwise, register the new patient. 
                const newPatient = new reportModel({
                    patientName: name,
                    phoneNumber: number
                });
                await newPatient.save();
            }

        } catch (err) {
            console.log(err);
            throw new Error("Something went wrong");
        }
    }

    // creating report of the patient and adding it to the database. 
    // The database already contains the registered patient. we just need to push the report details to the report array.
    async createReport(id, name, status) {
        try {
            const addReport = await reportModel.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $push: { report: { createdBy: name, status: status } } },
                { new: true }
            );
            return addReport;
        } catch (err) {
            console.log(err);
            throw new Error("Something went wrong");
        }
    }

    // Fetch the reports of a particular patient based on the id of the patient.
    async getReportsOfOnePatient(id) {
        try {
            const patient = await reportModel.findById(new ObjectId(id));
            if (patient) {
                return patient.report;
            } else {
                console.log("patient not found");
                throw new Error("Patient not found");
            }
        } catch (err) {
            console.log(err);
            throw new Error("Something went wrong");
        }
    }

    // Fetch the report details of all the patients based on status of the report. 
    async getReportsBasedOnStatus(status) {
        try {
            const patients = await reportModel.find();
            const reports = [];     // empty array to store the details 
            patients.forEach(patient => {
                patient.report.forEach(rpt => {
                    if (rpt.status === status) {
                        reports.push({
                            patientName: patient.patientName,
                            phoneNumber: patient.phoneNumber,
                            createdBy: rpt.createdBy,
                            status: rpt.status
                        });
                    }
                });
            });
            if (reports.length !== 0) {
                return reports;
            }

        } catch (err) {
            console.log(err);
            throw new Error("Something went wrong");
        }
    }
}