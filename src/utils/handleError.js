const httpError = (res, msj, status) => {
    res.status(status).json({
        ok: false,
        error: msj
    });
}

module.exports = { httpError };