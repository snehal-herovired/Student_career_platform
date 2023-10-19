const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    default: function () {
      return this.name; // Set default value to the name field
    },
  },
  startDate: {
    type: Date,
    default: function () {
      const currentDate = new Date();
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    },
  },
  endDate: {
    type: Date,
    default: function () {
      const currentDate = new Date();
      return new Date(currentDate.getFullYear(), currentDate.getMonth() + 9, currentDate.getDate());
    },
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;
