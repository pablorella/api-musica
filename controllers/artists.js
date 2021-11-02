const { response } = require('express');
const { Artist } = require('../models');


// ADD
const addArtist = async (req, res = response) => {

    const { name } = req.body;

    const artistaDB = await Artist.findOne({ name });

    if (artistaDB) {
        return res.status(400).json({
            msg: `El artista ${artistaDB.name}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        name
    }

    const artist = new Artist(data);

    // Guardar DB
    await artist.save();

    res.status(201).json(artist);
};

// GET ALL
const getAllArtist = async (req, res = response) => {
    // `Artist.find({}, ...)` return all documents within the Artist collection
    let artists
    try {
        artists = await Artist.find({});

    } catch (error) {
        throw new Error('Error: something went wrong')
    }
    res.status(200).json(artists);

};

// GET BY ID
const getIdArtist = async (req, res = response) => {

    let artist
    try {
        artist = await Artist.findById(req.params.id);

    } catch (error) {
        throw new Error('Error: something went wrong')
    }

    res.status(200).json(artist);
};

// PUT
const upgradeArtist = async (req, res = response) => {

    const { id } = req.params;
    const { name } = req.body;

    const artist = await Artist.findByIdAndUpdate(id, { name }, { new: true });

    res.json(artist);

};

// DELETE 
const deleteArtist = async (req, res = response) => {

    const { id } = req.params;
    const artistDelete = await Artist.deleteOne({ _id: id });

    res.json(artistDelete);

};




module.exports = {
    addArtist,
    getAllArtist,
    getIdArtist,
    upgradeArtist,
    deleteArtist
}