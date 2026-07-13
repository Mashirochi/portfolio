import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  vi_title: string;
  en_title: string;
  vi_role: string;
  en_role: string;
  vi_short_description: string;
  en_short_description: string;
  vi_description: string;
  en_description: string;
  vi_problem: string;
  en_problem: string;
  vi_solution: string;
  en_solution: string;
  vi_features: string;
  en_features: string;
  vi_challenges: string;
  en_challenges: string;
  cover_image: string;
  youtube_url: string;
  github_url: string;
  url: string; // kept for backward compatibility
  published_at: string;
  tags: string[];
  order: number;
}

const ProjectSchema: Schema = new Schema({
  vi_title: { type: String, required: true },
  en_title: { type: String, required: true },
  vi_role: { type: String, default: '' },
  en_role: { type: String, default: '' },
  vi_short_description: { type: String, default: '' },
  en_short_description: { type: String, default: '' },
  vi_description: { type: String, default: '' },
  en_description: { type: String, default: '' },
  // Detail sections
  vi_problem: { type: String, default: '' },
  en_problem: { type: String, default: '' },
  vi_solution: { type: String, default: '' },
  en_solution: { type: String, default: '' },
  vi_features: { type: String, default: '' },
  en_features: { type: String, default: '' },
  vi_challenges: { type: String, default: '' },
  en_challenges: { type: String, default: '' },
  cover_image: { type: String },
  youtube_url: { type: String, default: '' },
  github_url: { type: String, default: '' },
  url: { type: String, default: '' }, // backward compat
  published_at: { type: String },
  tags: { type: [String] },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
