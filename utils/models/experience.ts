import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExperience extends Document {
  vi_title: string;
  en_title: string;
  vi_company: string;
  en_company: string;
  vi_duration: string;
  en_duration: string;
  order: number;
}

const ExperienceSchema: Schema = new Schema({
  vi_title: { type: String, required: true },
  en_title: { type: String, required: true },
  vi_company: { type: String, required: true },
  en_company: { type: String, required: true },
  vi_duration: { type: String, required: true },
  en_duration: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Experience: Model<IExperience> = mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
