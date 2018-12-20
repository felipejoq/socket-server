import { UsuariosLista } from './../classes/usuarios-lista';
import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente:Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente:Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado del socket');
        usuariosConectados.borrarUsuario(cliente.id);
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

        callback({
            ok:true,
            mensaje: `Usuario ${ payload.nombre } configurado`
        })
    });
}