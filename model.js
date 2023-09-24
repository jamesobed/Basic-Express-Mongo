import { Schema, model } from "mongoose";

const ContactUsSchema = new Schema({
  email: {
    type: String,
    allowNull: false,
  },
  fullName: {
    type: String,
    allowNull: false,
  },
  message: {
    type: String,
    allowNull: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

ContactUsSchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.toUpperCase();
  }
  next();
});

ContactUsSchema.index({ email: "text", message: "text" });

const ContactUsInstance = model("ContactUs", ContactUsSchema);

// module.exports = ContactUsInstance;
export default ContactUsInstance;
