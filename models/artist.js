const { Schema, model } = require('mongoose');

const ArtistSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    }
});

ArtistSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Artist', ArtistSchema);
