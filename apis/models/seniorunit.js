const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seniorUnitSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  smallerUnits: [{
    type: Schema.Types.ObjectId,
    ref: 'SmallerUnit'
  }]
});


const SeniorUnit = mongoose.model('SeniorUnit', seniorUnitSchema);

module.exports = SeniorUnit;
