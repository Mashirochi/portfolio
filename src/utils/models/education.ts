import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEducation extends Document {
  vi_title: string;
  en_title: string;
  vi_duration: string;
  en_duration: string;
  vi_institution: string;
  en_institution: string;
  order: number;
}

const EducationSchema: Schema = new Schema({
  vi_title: { type: String, required: true },
  en_title: { type: String, required: true },
  vi_duration: { type: String, required: true },
  en_duration: { type: String, required: true },
  vi_institution: { type: String, required: true },
  en_institution: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Education: Model<IEducation> = mongoose.models.Education || mongoose.model<IEducation>('Education', EducationSchema);
