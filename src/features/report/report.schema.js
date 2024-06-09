import mongoose from "mongoose";
export const reportSchema = new mongoose.Schema({
    patientName: String,
    phoneNumber: String,
    report: [
        {
            createdBy: String,
            status: {
                type: String,
                enum: ["Negative", "Travelled-Quarantine", "Symptoms-Quarantine",
                    "Positive-Admit"]
            }
        }
    ]
})