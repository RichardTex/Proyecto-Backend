export default function errorHandler(err, req, res, next) {
    // Muestro el error en la consola
    console.error(`[ERROR] ${err.message}`);

    // Respondo con un mensaje de error
    res.status(err.status || 500).json({
        success: false, // Indico que la respuesta fue un error
        message: err.message || 'Internal Server Error', // Muestro el mensaje de error o uno por defecto
    });

    next();
}