const mongoose = require('mongoose');


const batchSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
  },
  course: {
    type: String,
    default: function () {
      return this.name; // Set default value to the name field
    },
  },
  startDate: {
    type: Date,
    default:Date.now()
  },
  endDate: {
    type: Date,
    default:new Date(Date.now()).getMonth()+9
  },
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }]
});
  
const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;
