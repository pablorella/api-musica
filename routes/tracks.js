const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');

const { existeTrackPorId } = require('../helpers/db-validators');


const {
    addTrack,
    getTracks,
    getIdTracks,
    upgradeTrack,
    deleteTrack
} = require('../controllers/tracks');



const router = Router();
/* 
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignin); */


// POST ROUTE - ADD ARTIST TO COLLECTION


router.post('/', [
    //    validarJWT,
    check('title', 'El title es obligatorio').not().isEmpty(),
    check('album', 'El album es obligatorio').not().isEmpty(),
    check('artist', 'El artist es obligatorio').not().isEmpty(),
    check('duration', 'El duration es obligatorio').not().isEmpty().isNumeric(),
    check('diskNumber', 'El diskNumber es obligatorio').not().isEmpty().isNumeric(),
    check('trackNumber', 'El trackNumber es obligatorio y debe ser numerico').not().isEmpty().isNumeric(),

    validarCampos,

], addTrack);

router.get('/', getTracks);

router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeTrackPorId),
    validarCampos,
], getIdTracks);

router.delete('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeTrackPorId),
    validarCampos,
], deleteTrack);

router.put('/:id', [
    //  validarJWT,
    check('title', 'El title es obligatorio').not().isEmpty(),
    check('album', 'El album es obligatorio').not().isEmpty(),
    check('artist', 'El artist es obligatorio').not().isEmpty(),
    check('duration', 'El duration es obligatorio').not().isEmpty().isNumeric(),
    check('diskNumber', 'El diskNumber es obligatorio').not().isEmpty().isNumeric(),
    check('trackNumber', 'El trackNumber es obligatorio y debe ser numerico').not().isEmpty().isNumeric(),
    check('id').custom(existeTrackPorId),
    validarCampos
], upgradeTrack);


module.exports = router;