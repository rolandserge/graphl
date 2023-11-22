import mongoose from "mongoose";

const ProjetSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In progress', 'Completed'],
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    }
})

const Project = mongoose.model('Projects', ProjetSchema)

export default Project