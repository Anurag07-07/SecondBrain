import mongoose, { Schema, Types } from "mongoose";
const contentTypes = ['audio', 'video', 'article', 'image'];
const ContentSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: contentTypes
    },
    tags: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});
export default mongoose.model('Content', ContentSchema);
//# sourceMappingURL=Content.Schema.js.map