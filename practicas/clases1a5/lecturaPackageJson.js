import fs from 'fs';

const pathArchivo = './package.json';

async function procesarPackageJson() {
    try {
        const packageString = await fs.promises.readFile(pathArchivo, 'utf-8');
        const packageObject = JSON.parse(packageString);
        console.log(packageObject.license);
    } catch (error) {
        console.log('error durante el procesamiento', error);
    }
}

procesarPackageJson();