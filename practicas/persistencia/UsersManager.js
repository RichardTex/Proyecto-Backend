import fs from 'fs';

class UserManager {

    constructor(){
        this.filePath = './usuarios.json';
    }

    async crearUsuario(usuario){

        try {

            // leer el archivo y luego obtenemos un objeto de los usuarios
            let usuarios = await this.leerUsuario();

            // agregar un usuario al listado de usuarios
            usuarios.push(usuario);

            // escribir el archivo
            await fs.promises.writeFile(this.filePath, JSON.stringify(usuarios,null,2));
            console.log("usuario creado exitosamente");
        } catch (error) {
            console.log("error al escribir los usuarios");
        }
        
    }

    //leer los usuarios del archivo
    async leerUsuario(){
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8')
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.log("error al leer los usuarios del archivo");
            return [];
        }
        
    }


}

export default UserManager;