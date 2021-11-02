const { Schema, model } = require('mongoose');

const TrackSchema = Schema({
    title: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    album: {
        required: [true, 'El album es obligatorio'],
        type: Schema.Types.ObjectId, ref: 'Album',
    },
    artist: {
        required: [true, 'El artista es obligatorio'],
        type: Schema.Types.ObjectId, ref: 'Artist',
    },
    duration: {
        type: Number,
        required: [true, 'El tiempo que dura el track es obligatorio']
    },
    diskNumber: {
        type: Number,
        required: [true, 'El numero de disco es obligatorio']
    },
    trackNumber: {
        type: Number,
        required: [true, 'El numero de track es obligatorio']
    },

});

TrackSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Track', TrackSchema);