import mongoose, { Schema, models, model } from 'mongoose';

// --- SUB-SCHEMAS ---

const PlacementSchema = new Schema({
  highest_lpa: { type: Number, default: 0 },
  median_lpa: { type: Number, default: 0 },
  average_lpa: { type: Number, default: 0 },
});

const SpecializationOfferedSchema = new Schema({
  course_id: String,
  course_name: String,
  stream: String,
  specialization_id: String,
  specialization_name: String,
  rank_in_specialization: Number,
  total_fee_inr: Number,
  annual_fee_inr: Number,
  fee_category: String,
  entrance_exams: [String],
  eligibility: String,
  psychometric_traits: [String],
  career_paths: [String],
});

// --- MAIN COLLEGE SCHEMA ---

const CollegeSchema = new Schema({
  college_id: { type: String, required: true, unique: true },
  name: { type: String, required: true, index: true },
  location: String,
  location_tag: { type: String, index: true },
  type: String,
  affiliation: String,
  accreditation: String, // Based on your JSON "NAAC A"
  hostel_available: Boolean,
  hostel_fee_inr: Number,
  facilities: [String],
  placement_tier: { type: String, enum: ['tier1', 'tier2', 'tier3'] },
  placements: PlacementSchema,
  top_recruiters: [String],
  website: String,
  specializations_offered: [SpecializationOfferedSchema], // This matches your JSON key
});

// --- COURSE SCHEMA (Keep if you have a separate collection for global course info) ---

const CourseSchema = new Schema({
  course_id: { type: String, required: true, unique: true },
  course_name: String,
  full_name: String,
  duration_years: Number,
  degree_level: String,
  stream: { type: String, enum: ['science', 'commerce', 'humanities', 'independent'] },
  specializations: [{
      specialization_id: String,
      name: String,
      psychometric_traits: [String]
  }]
});

const UserSchema = new Schema({
  clerkUserId: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, index: true },
  emailVerified: { type: Boolean, default: false },
  firstName: String,
  lastName: String,
  fullName: String,
  imageUrl: String,
  phoneNumber: String,
  role: { type: String, enum: ['student', 'counselor', 'admin', 'guest'], default: 'student' },
  onboardingStatus: { type: String, default: 'pending' },
  preferences: {
    interests: [String],
    streams: [String],
    careerGoals: [String],
  },
  metadata: Schema.Types.Mixed,
}, {
  timestamps: true,
});

// --- EXPORTS ---

export const College = models.College || model('College', CollegeSchema);
export const Course = models.Course || model('Course', CourseSchema);
export const User = models.User || model('User', UserSchema);