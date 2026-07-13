import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPersonalData extends Document {
  name: string;
  profile: string;
  vi_designation: string;
  en_designation: string;
  vi_description: string;
  en_description: string;
  email: string;
  phone: string;
  vi_address: string;
  en_address: string;
  github: string;
  facebook: string;
  linkedIn: string;
  twitter: string;
  stackOverflow: string;
  leetcode: string;
  devUsername: string;
  resume: string;
}

const PersonalDataSchema: Schema = new Schema({
  name: { type: String, required: true },
  profile: { type: String, required: true },
  vi_designation: { type: String, required: true },
  en_designation: { type: String, required: true },
  vi_description: { type: String, required: true },
  en_description: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  vi_address: { type: String, required: true },
  en_address: { type: String, required: true },
  github: { type: String },
  facebook: { type: String },
  linkedIn: { type: String },
  twitter: { type: String },
  stackOverflow: { type: String },
  leetcode: { type: String },
  devUsername: { type: String },
  resume: { type: String },
}, { timestamps: true });

export const PersonalData: Model<IPersonalData> = mongoose.models.PersonalData || mongoose.model<IPersonalData>('PersonalData', PersonalDataSchema);
