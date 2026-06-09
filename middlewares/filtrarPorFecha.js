const filtrarPorFecha = (req, res, next) => {
    const mesesVisibles = parseInt(process.env.MESES_VISIBLES) || 6
    const fecha = new Date()
    fecha.setMonth(fecha.getMonth() - mesesVisibles)
    req.cutoffDate = fecha
    next()
}

module.exports = filtrarPorFecha