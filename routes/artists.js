const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');

const { existeArtistaPorId } = require('../helpers/db-validators');

const { deleteArtist,
    upgradeArtist,
    getIdArtist,
    getAllArtist,
    addArtist } = require('../controllers/artists');


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
    check('type', 'No es un tipo valido').isIn(['album', 'single', 'compilation'])
    //hago la validacion rapido por expressvalidation con isIn, pero deberia hacerse por base de datos, para ser escalable por si se agrega mas

], addArtist);

// GET ROUTE - RETURN ARTIST COLLECTION
router.get('/', getAllArtist);

// GET ROUTE - RETURN SPECIFIC ARTIST FROM COLLECTION
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeArtistaPorId),
    validarCampos,
], getIdArtist);

// PUT ROUTE - UPDATE AN ARTIST PROFILE
router.put('/:id',);

router.put('/:id', [
    //  validarJWT,
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('id').custom(existeArtistaPorId),
    validarCampos
], upgradeArtist);






// DELETE ROUTE - DELETE AN ARTIST PROFILE
router.delete('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeArtistaPorId),
    validarCampos,
], deleteArtist);


module.exports = router;