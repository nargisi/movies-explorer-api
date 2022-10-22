const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
      validate: {
        validator(value) {
          return validator.isEmail(value);
        },
        message: (props) => `${props.value} некорректная почта!`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: [2, 'Должно быть не менее 2 символов!'],
      maxlength: 30,
    },
  },
  {
    toObject: { useProjection: true },
    toJSON: { useProjection: true },
  },
  {
    versionKey: false,
  },
);

module.exports = model('user', userSchema);
