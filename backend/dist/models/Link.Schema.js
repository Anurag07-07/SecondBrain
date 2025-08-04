import mongoose, { Schema, Types } from "mongoose";
const LinkSchema = new Schema({
    hash: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});
export default mongoose.model('Link', LinkSchema);
//# sourceMappingURL=Link.Schema.js.map