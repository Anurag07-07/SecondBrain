import mongoose, { Schema } from "mongoose";
const TagSchema = new Schema({
    tag: {
        type: String
    }
});
export default mongoose.model('Tag', TagSchema);
//# sourceMappingURL=Tags.Schema.js.map