const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OfficerSchema = new mongoose.Schema(
  {
    seniortyNumber: {
      type: String,
    },
    NationalID:{
      type:String
    },
    militryNumber: {
      type: String,
    },
    rank: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: 'SmallerUnit' },

    previous_unit:{
      type:String
    },
    theTopUnit: {
      type: String, 
    },
    Job: {
      type: String,
    },
    Weapon: {
      type: String,
    },
    category: {
      type: String,
    },
    join_date: {
      type: Date,
    },
    join_order: {
      type: String,
    },
    join_order_date: {
      type: Date,
    },
    last_unit: {
      type: String,
    },
    leadUnit:{
      type:String
    },
    movement_date:{
      type:Date
    },
    movement_order_date:{
      type:Date
    },
    movement_order:{
      type:String
    },
    number_of_do_transfer: {
      type: Number,
    },
    date_of_do_transfer: {
      type: Date,
    },
    unit_of_transfer: {
      type: String,
    },
    Job_in_unit: {
      type: String,
    },
    blood_type: {
      type: String,
    },
    attachment_unit: {
      type: String,
    },
    attaching_party: {
      type: String,
    },
    academy_batch: {
      type: String,
    },
    social_status: {
      type: String,
    },
    graduation_date: {
      type: Date,
    },
    upgrade_date: {
      type: Date,
    },
    birthday_date: {
      type: Date,
    },
    religion: {
      type: String,
    },
    midical: {
      type: Boolean,
    },
    medical_status_type: {
      type: String,
    },
    medical_status_date: {
      type: Date,
    },
    medical_diagnosis:{
      type:String
    },
    Is_there_midical: {
      type: Boolean,
    },
    traveling_abroad: {
      type: String,
    },
    traveling_country: {
      type: String,
    },
    traveling_name: {
      type: String,
    },
    traveling_from_date:{
      type:Date
    },
    traveling_to_date:{
      type:Date
    },
    height: {
      type: String,
    },
    weight: {
      type: String,
    },
    weight_difference: {
      type: String,
    },
    weight_difference_from: {
      type: String,
    },
    weight_difference_to: {
      type: String,
    },
    number_child_male: {
      type: String,
    },
    number_child_female: {
      type: String,
    },
    governorate: {
      type: String,
    },
    district: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    phone_number2: {
      type: String,
    },
    address:{
      type:String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Officer", OfficerSchema);
