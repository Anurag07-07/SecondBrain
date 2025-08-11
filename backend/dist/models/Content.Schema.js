import mongoose, { Schema, Types } from "mongoose";
const contentTypes = ['audio', 'video', 'article', 'image', 'pdf'];
const ContentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: contentTypes
    },
    tags: {
        type: [String],
        default: []
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, description: {
        type: String,
    }
});
export default mongoose.model('Content', ContentSchema);
//# sourceMappingURL=Content.Schema.js.map