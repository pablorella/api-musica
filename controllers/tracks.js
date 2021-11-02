const { response } = require('express');
const { Album, Artist, Track } = require('../models');


// POST HANDLER
const addTrack = async (req, res = response) => {
    const { title, album, artist, duration, diskNumber, trackNumber } = req.body;
    let artistaDB
    try {
        artistaDB = await Artist.findOne({ name: artist });

    } catch (error) {
        return res.status(400).json({
            msg: `El artista: ${artist},no se encuentra`
        });
    }

    if (!artistaDB) {
        return res.status(400).json({
            msg: `El artista: ${artist},no se encuentra`
        });
    }

    let albumDB
    try {
        albumDB = await Album.findOne({ title: album });

    } catch (error) {
        return res.status(400).json({
            msg: `El album: ${album}, no se encuentra`
        });
    }

    if (!albumDB) {
        return res.status(400).json({
            msg: `El album: ${album}, no se encuentra`
        });
    }

    // Generar la data a guardar
    const data = {

        title,
        album: albumDB.id,
        artist: artistaDB.id,
        duration,
        diskNumber,
        trackNumber
    }

    const myTrack = new Track(data);


    // Guardar DB
    await myTrack.save();

    res.status(201).json(myTrack);

};

// LIST HANDLER
const getTracks = async (req, res = response) => {
    let tracks
    try {
        tracks = await Track.find({});

    } catch (error) {
        throw new Error('Error: something went wrong')
    }
    res.status(200).json(tracks);

};


// GET BY ID
const getIdTracks = async (req, res = response) => {

    let track
    try {
        track = await Track.findById(req.params.id);

    } catch (error) {
        throw new Error('Error: something went wrong')
    }

    res.status(200).json(track);
};

// PUT
const upgradeTrack = async (req, res = response) => {

    const { id } = req.params;
    const { title, album, artist, duration, diskNumber, trackNumber } = req.body;

    const artistaDB = await Artist.findOne({ name: artist });

    if (!artistaDB) {
        return res.status(400).json({
            msg: `El artista ${artist}, no existe`
        });
    }

    const albumDB = await Album.findOne({ title: album });

    if (!albumDB) {
        return res.status(400).json({
            msg: `El album ${album}, no existe`
        });
    }

    // Generar la data a guardar
    const data = { title, album: albumDB.id, artist: artistaDB.id, duration, diskNumber, trackNumber }

    const track = await Track.findByIdAndUpdate(id, data, { new: true });

    res.json(track);

};

// DELETE 
const deleteTrack = async (req, res = response) => {

    const { id } = req.params;
    const trackDelete = await Track.deleteOne({ _id: id });

    res.json(trackDelete);

};

module.exports = {
    addTrack,
    getTracks,
    getIdTracks,
    upgradeTrack,
    deleteTrack
}