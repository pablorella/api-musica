const { Schema, model } = require('mongoose');

const AlbumSchema = Schema({
    title: {
        type: String,
        required: [true, 'El title es obligatorio']
    },
    releaseDate: {
        type: Date,
        required: [true, 'La fecha de lanzamiento'],
    },
    artist: {
        // reference to Artist collection
        type: Schema.Types.ObjectId, ref: 'Artist',
        required: [true, 'El artista es obligatorio']
    },
    type: {
        // reference to Artist collection
        type: String,
        required: [true, 'El tipo es obligatorio'],
        /* type (album, single, compilation) */
    },
});

AlbumSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Album', AlbumSchema);
