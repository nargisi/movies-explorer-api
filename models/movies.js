const { Schema, model } = require('mongoose');
const validator = require('validator');

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return validator.isURL(value);
        },
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return validator.isURL(value);
        },
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return validator.isURL(value);
        },
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
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

module.exports = model('movie', movieSchema);
