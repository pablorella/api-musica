const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');

const { existeAlbumPorId } = require('../helpers/db-validators');


const {
    addAlbum,
    getAlbums,
    getIdAlbum,
    deleteAlbum,
    upgradeAlbum
} = require('../controllers/albums');



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



router.post('/', [
    //    validarJWT,
    check('type', 'No es un tipo valido').isIn(['album', 'single', 'compilation']),
    //hago la validacion rapido por expressvalidation con isIn, pero deberia hacerse por base de datos, para ser escalable por si se agrega mas
    check('title', 'El title es obligatorio').not().isEmpty(),
    check('releaseDate', 'El releaseDate es obligatorio').not().isEmpty(),
    check('artist', 'El artist es obligatorio').not().isEmpty(),
], addAlbum);

router.get('/', getAlbums);

router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeAlbumPorId),
    validarCampos,
], getIdAlbum);

router.delete('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeAlbumPorId),
    validarCampos,
], deleteAlbum);

router.put('/:id', [
    //  validarJWT,
    check('type', 'No es un tipo valido').isIn(['album', 'single', 'compilation']),
    check('title', 'El title es obligatorio').not().isEmpty(),
    check('releaseDate', 'El releaseDate es obligatorio').not().isEmpty(),
    check('artist', 'El artist es obligatorio').not().isEmpty(),
    check('type', 'El type es obligatorio').not().isEmpty(),
    check('id').custom(existeAlbumPorId),
    validarCampos
], upgradeAlbum);


module.exports = router;