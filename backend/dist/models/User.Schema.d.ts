import mongoose from 'mongoose';
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=User.Schema.d.ts.map