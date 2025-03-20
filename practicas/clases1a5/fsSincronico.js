import fs, { existsSync } from 'fs';

let pathArchivo = './ejemplo.txt';

fs.writeFileSync(pathArchivo, "hola probando");

if (existsSync(pathArchivo)) {
    let contenido = fs.readFileSync(pathArchivo, 'utf-8');
    console.log(contenido);

    fs.appendFileSync(pathArchivo, ' mas contenido agregado');
    contenido = fs.readFileSync(pathArchivo, 'utf-8');
    console.log(contenido);

    fs.unlinkSync(pathArchivo);
}