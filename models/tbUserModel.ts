import mongoose, { Document, Schema, Model } from "mongoose";

interface IUser extends Document {
  name: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
});

const userModel: Model<IUser> = mongoose.model<IUser>("tbUser", userSchema);
export default userModel;
