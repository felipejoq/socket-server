# Socket-Server
Configuración del server para trabajar con socket

1. Reconstruir los módulos de Node

```
npm install
```

2. Inicializar tsconfig.json
```
tsc --init
```

3. Generar carpeta dist
```
tsc -w
```
(comando de typescript para observar y compilar o "transpilar" el código a Javascript).

4. Ejecutar el servidor
```
nodemon dist/
```

c: