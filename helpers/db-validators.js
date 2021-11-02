const { Usuario, Album, Artist, Track } = require('../models');

/**
 * Tracks
 */


const existeTrackPorId = async (id) => {

    // Verificar si el correo existe
    const existeTrack = await Track.findById(id);
    if (!existeTrack) {
        throw new Error(`El id no existe ${id}`);
    }
}

/**
 * Albums
 */
const existeAlbumPorId = async (id) => {

    // Verificar si el correo existe
    const existeAlbum = await Album.findById(id);
    if (!existeAlbum) {
        throw new Error(`El id no existe ${id}`);
    }
}

/**
 * Artists
 */

const existeArtistaPorId = async (id) => {

    // Verificar si el correo existe
    const existeArtist = await Artist.findById(id);
    if (!existeArtist) {
        throw new Error(`El id no existe ${id}`);
    }
}



module.exports = {
    existeAlbumPorId,
    existeArtistaPorId,
    existeTrackPorId
}

