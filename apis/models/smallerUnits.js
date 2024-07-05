const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const smallerUnitSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  seniorUnit: {
    type: Schema.Types.ObjectId,
    ref: 'SeniorUnit'
  },
  officers: [{
    type: Schema.Types.ObjectId,
    ref: 'Officer'
  }]
});

const SmallerUnit = mongoose.model('SmallerUnit', smallerUnitSchema);

module.exports = SmallerUnit;
