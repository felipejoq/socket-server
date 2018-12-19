import { Socket } from 'socket.io';
import socketIO from 'socket.io';
export const desconectar = (cliente:Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado del socket');
    })
}
// Escuchando mensajes desde el front
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: any) => {
        console.log('Mensaje recibido: ', payload.de, payload.cuerpo);

        io.emit('mensaje-nuevo', payload);
    });
}