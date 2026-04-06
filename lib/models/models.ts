import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  rank: Number,
  name: String,
  location: String,
  location_tag: String,
  type: String,
  affiliation: String,
  accreditation: String,
  entrance_exams: [String],
  eligibility: String,
  total_fee_inr: Number,
  annual_fee_inr: Number,
  fee_category: String,
  hostel_available: Boolean,
  hostel_fee_inr: Number,
  facilities: [String],
  placements: { highest_lpa: Number, median_lpa: Number, average_lpa: Number },
  placement_tier: String,
  top_recruiters: [String],
  website: String
});

const specializationSchema = new mongoose.Schema({
  specialization_id: String,
  specialization_name: String,
  psychometric_traits: [String],
  career_paths: [String],
  top_colleges: [collegeSchema]
});

export const courseSchema = new mongoose.Schema({
  course_id: String,
  course_name: String,
  stream: String,
  full_name: String,
  degree_level: String,
  broad_eligibility: String,
  general_entrance_exams: [String],
  // Update: LLB uses options, BCA uses a single number
  duration_years: Number, 
  duration_years_options: [Number], 
  specializations: [specializationSchema]
});

// FIX: You must pass the schema when creating the model
// And specify 'courses' to match your Atlas collection name
export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema, 'courses');