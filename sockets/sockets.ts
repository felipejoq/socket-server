import { UsuariosLista } from './../classes/usuarios-lista';
import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente:Socket, io: socketIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);

    
}

export const desconectar = (cliente:Socket, io: socketIO.Server) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado del socket');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    })
}
// Escuchando mensajes desde el front
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: any) => {
        console.log('Mensaje recibido: ', payload.de, payload.cuerpo);

        io.emit('mensaje-nuevo', payload);
    });
}

// Escuchando configurar usuario
export const configUser = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload: { nombre:string}, callback: Function) => {

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        io.emit('usuarios-activos', usuariosConectados.getLista());

        callback({
            ok:true,
            mensaje: `Usuario ${ payload.nombre } configurado`
        });
    });
}

// Obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}