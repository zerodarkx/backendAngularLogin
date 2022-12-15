const { Router } = require('express');
const router = Router();

const { verificarHeaders } = require('../middlewares/headerMiddleware');
const { validacionCrearTarea } = require('../validators/tarea')

const { nuevaTarea,
    getTareasPorUsuario,
    deleteTarea,
    getTareas,
    getTarea
} = require('../controllers/tarea')

// GETTERS
/**BUSCAR TODAS LAS TAREAS */
router.get('', [
    // verificarHeaders
], getTareas);
/**Buscar tarea por id especifica */
router.get('/:id_tarea', [
    verificarHeaders
], getTarea);
/**Buscar las tareas por usuario, el id a buscar viene en el token */
router.get('/porUsuario', [
    verificarHeaders
], getTareasPorUsuario);

// POST
router.post('', [
    verificarHeaders,
    validacionCrearTarea
], nuevaTarea);

// DELETE
router.delete('/delete/:id', [
    // verificarHeaders
], deleteTarea);



module.exports = router;