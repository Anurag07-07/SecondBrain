import mongoose, { Types } from "mongoose";
interface ILink extends Document {
    hash: string;
    userId: Types.ObjectId;
}
declare const _default: mongoose.Model<ILink, {}, {}, {}, mongoose.Document<unknown, {}, ILink, {}, {}> & ILink & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Link.Schema.d.ts.map