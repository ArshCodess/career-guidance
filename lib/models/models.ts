import mongoose, { Schema, Document } from 'mongoose';
import { seedDatabase } from './seed';

// --- COLLEGE SCHEMA ---
const PlacementSchema = new Schema({
  highest_lpa: { type: Number, default: 0 },
  median_lpa: { type: Number, default: 0 },
  average_lpa: { type: Number, default: 0 },
});

const TopCollegeSchema = new Schema({
  rank:Number,
  name: { type: String, required: true, index: true },
  location: String,
  location_tag: { type: String, index: true }, // For filtering by 'noida', 'delhi'
  type: { type: String},
  affiliation: String,
  accreditation: [String],
  entrance_exams: [String],
  eligibility: String,
  total_fee_inr: Number,
  annual_fee_inr: Number,
  fee_category: String,
  hostel_available:Boolean,
  hostel_fee_inr:Number,
  facilities: [String],
  placements: PlacementSchema,
  placement_tier: { type: String, enum: ['tier1', 'tier2', 'tier3'] },
  top_recruiters: [String],
  website: String,
});

// --- COURSE & SPECIALIZATION SCHEMA ---
const SpecializationSchema = new Schema({
  specialization_id: { type: String, required: true, unique: true },
  name: String,
  psychometric_traits: [String],
  career_paths: [String],
  top_colleges: [TopCollegeSchema],
});

const CourseSchema = new Schema({
  course_id: { type: String, required: true, unique: true },
  course_name: String,
  full_name: String,
  duration_years: Number,
  degree_level: String,
  broad_eligibility: String,
  stream: { type: String, enum: ['science', 'commerce', 'humanities', 'independent'] },
  general_entrance_exams: [String],
  specializations: [SpecializationSchema]
});
// seedDatabase();
// export const College = mongoose.models.College || mongoose.model('College', CollegeSchema);
export const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);