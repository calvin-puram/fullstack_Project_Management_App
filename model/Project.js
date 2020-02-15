const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  title: {
    type: String,
    required: [true, 'a title is required']
  },
  description: {
    type: String,
    required: [true, 'a project require description']
  },
  due: {
    type: Date,
    required: [true, 'a due date is required']
  },
  remark: {
    type: String,
    enum: {
      values: ['Ongoing', 'Over-due', 'complete'],
      message: 'only ongoing, over-due, complete is required'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ProjectSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name'
  });
  next()
});

module.exports = mongoose.model('Projects', ProjectSchema);
