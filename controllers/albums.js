const { response } = require('express');
const { Album, Artist } = require('../models');


// POST HANDLER
const addAlbum = async (req, res = response) => {
    const { title, artist, releaseDate, type } = req.body;
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
    // Generar la data a guardar
    const data = {
        title,
        artist: artistaDB.id,
        releaseDate,
        type
    }

    const myAlbum = new Album(data);


    // Guardar DB
    await myAlbum.save();

    res.status(201).json(myAlbum);

};

// LIST HANDLER
const getAlbums = async (req, res = response) => {
    let albums
    try {
        albums = await Album.find({});

    } catch (error) {
        throw new Error('Error: something went wrong')
    }
    res.status(200).json(albums);

};


// GET BY ID
const getIdAlbum = async (req, res = response) => {

    let album
    try {
        album = await Album.findById(req.params.id);

    } catch (error) {
        throw new Error('Error: something went wrong')
    }

    res.status(200).json(album);
};

// PUT
const upgradeAlbum = async (req, res = response) => {

    const { id } = req.params;
    const { title, releaseDate, artist, type } = req.body;

    const artistaDB = await Artist.findOne({ name: artist });

    if (!artistaDB) {
        return res.status(400).json({
            msg: `El artista ${artist}, no existe`
        });
    }

    // Generar la data a guardar
    const data = { title, releaseDate, artist: artistaDB.id, type }

    const album = await Album.findByIdAndUpdate(id, data, { new: true });

    res.json(album);

};

// DELETE 
const deleteAlbum = async (req, res = response) => {

    const { id } = req.params;
    const albumDelete = await Album.deleteOne({ _id: id });

    res.json(albumDelete);

};

module.exports = {
    addAlbum,
    getAlbums,
    getIdAlbum,
    upgradeAlbum,
    deleteAlbum
}