import fs from 'fs';


let pathArchivo = './ejemplo.txt';

fs.writeFile(pathArchivo, "hola probando desde callBack", (error) => {
    if (error) {
        return console.log("Error al escribir el archivo")
    }
    fs.readFile(pathArchivo, 'utf-8', (error, resultado) => {
        if (error) {
            return console.log("Error al leer el archivo")
        }
        console.log(resultado);
        fs.appendFile(pathArchivo, ' mas contenido agregado', (error) => {
            if (error) {
                return console.log("error al actualizar")
            }
            fs.readFile(pathArchivo, 'utf-8', (error, resultado) => {
                if (error) {
                    return console.log("Error al leer el archivo")
                }
                console.log(resultado)
                fs.unlink(pathArchivo, (error) => {
                    if (error) {
                        return console.log("no se pudo eliminar el archivo");
                    }
                });
            });
        });
    });
});
