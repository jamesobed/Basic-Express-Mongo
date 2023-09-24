import { Schema, model, Document } from "mongoose";

export interface IContactUs extends Document {
  email: string;
  fullName: string;
  message: string;
  date: Date;
}

const ContactUsSchema = new Schema<IContactUs>({
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

ContactUsSchema.pre<IContactUs>("save", function (next) {
  if (this.email) {
    this.email = this.email.toUpperCase();
  }
  next();
});

ContactUsSchema.index({ email: "text", message: "text" });

const ContactUsInstance = model<IContactUs>("ContactUs", ContactUsSchema);

export default ContactUsInstance;
