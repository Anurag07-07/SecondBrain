import mongoose, { Types } from "mongoose";
declare const contentTypes: string[];
interface IContent extends Document {
    link: string;
    title: string;
    userId: Types.ObjectId;
    tags: string[];
    type: typeof contentTypes[number];
}
declare const _default: mongoose.Model<IContent, {}, {}, {}, mongoose.Document<unknown, {}, IContent, {}, {}> & IContent & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Content.Schema.d.ts.map