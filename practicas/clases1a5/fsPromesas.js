import fs from 'fs';

const operacionesAsincronas =

    async () => {

        try {

            await fs.promises.writeFile('./ejemploPromesa.txt', 'estoy en promesa')

            let resultado = await fs.promises.readFile('./ejemploPromesa.txt', 'utf-8');
            console.log(resultado);

            await fs.promises.appendFile('./ejemploPromesa.txt', ' agregando mas contenido')

            resultado = await fs.promises.readFile('./ejemploPromesa.txt', 'utf-8');
            console.log(resultado);

            //await fs.promises.unlink('./ejemploPromesa.txt');
        }catch(error){
            console.log("error durante la operacion con los archivos");
        }
    }

operacionesAsincronas();