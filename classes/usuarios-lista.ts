import { Usuario } from './usuario';

export class UsuariosLista{
    private lista: Usuario[] = [];

    constructor(){}

    // Para agregar un usuario
    public agregar(usuario:Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    // Actualizar el nombre del usuario mediante su ID del socket
    public actualizarNombre(id:string, nombre:string){
        for(let usuario of this.lista){
            if(usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('** Actualizando usuario **');
        console.log(this.lista);
    }

    // Obtener la lsita de usuarios que en este caso es privada
    public getLista(){
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    // Obtener un id por ID
    public getUsuario(id:string){
        return this.lista.find(usuario => usuario.id === id);
    }

    // Obtener los usuarios de una sala en particular
    public getUsuariosEnSala(sala:string){
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    // Borrar un usuario del socket
    public borrarUsuario(id:string){
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUsuario;
    }

}