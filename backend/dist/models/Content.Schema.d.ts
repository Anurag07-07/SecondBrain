import mongoose, { Types } from "mongoose";
interface IContent extends Document {
    link: string;
    title: string;
    userId: Types.ObjectId;
    tags: [Types.ObjectId];
    type: string;
}
declare const _default: mongoose.Model<IContent, {}, {}, {}, mongoose.Document<unknown, {}, IContent, {}, {}> & IContent & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Content.Schema.d.ts.map