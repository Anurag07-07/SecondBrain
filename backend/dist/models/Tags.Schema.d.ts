import mongoose from "mongoose";
interface ITag extends Document {
    tags: string;
}
declare const _default: mongoose.Model<ITag, {}, {}, {}, mongoose.Document<unknown, {}, ITag, {}, {}> & ITag & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Tags.Schema.d.ts.map