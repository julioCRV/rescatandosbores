# React + Vite

# LlajtaSolutions
App web que tiene como objetivo recuperar nuestras tradiciones culinarias cochabambinas


# RescatandoSabores - API Backend
1. [Introducion](#Introduccion)
2. [Prerequisitos](#Prerequisitos_API)
3. [Instalacion](#Instalacion_API)
4. [Configuracion](#Configuracion_API)
5. [Ejecucion](#ejecucion-de-la-aplicacion)
6. [Uso](#Uso_Backend)

### Introduccion
Este README muestra las instrucciones paso a paso para instalacion y ejecucion del proyecto en los diferentes sistemas operativos: Windows

### Prerequisitos
Antes de realizar la instalacion y ejecucion, es necesario cumplir los siguientes prerequisitos: 
- Tener instalado [NodeJS](https://nodejs.org/en) y npm.

### Instalacion [vite+react](https://vitejs.dev/guide/)
##### Windows 
1. Abrir la terminal (cmd) o PowerShell, a preferencia. 
2. Navegar sobre el directorio del proyecto utilizando el comando: 
    ```bash
        cd direccion/al/proyecto
    ```
3. Ejecutar el siguiente comando, para crear la estrucura de trabajo. 
    ```bash
        npm create vite@latest . -- --template react
    ```
4. Instalar dependecias 
    ```bash
        npm install
    ```

#### Linux
1. Abre una terminal. 
2. Navega al directorio del proyecto: 
    ```bash 
        cd direcion/al/proyecto
    ```
3. Ejecutar el siguiente comando para crear la estructura del proyecto: 
    ```bash 
        npm create vite@latest . -- --template react
    ```
4. Instalar dependecias 
    ```bash
        npm install
    ```

#### MacOS
1. Abre una terminal. 
2. Navega al directorio del proyecto: 
    ```bash 
        cd direcion/al/proyecto
    ```
3. Ejecutar el siguiente comando para crear la estructura del proyecto: 
    ```bash 
        npm create vite@latest . -- --template react
    ```
4. Instalar dependecias 
    ```bash
        npm install
    ```
### Configuracion
Antes de ejecutar el proyecto, se debe tener las siguientes recomendaciones, el servidor se ejecutara sobre el puerto 5173, por lo que este debe estar vacio. 
#### Instalar dependencias
Debe estar en el directorio del proyecto
1. instalar react Router [React-Router](https://reactrouter.com/en/main/start/tutorial), ejecutar:
    ```bash
    npm install react-router-dom localforage match-sorter sort-by
    ```
1. instalar axios [Axios](https://axios-http.com/docs/intro), ejecutar:
    ```bash
    npm install axios
    ```
2. instalar ant desing [Ant Design](https://ant.design/docs/react/introduce), ejecutar:
    ```bash
    npm install antd --save
    ```
3. instalar Ant Design Icon, ejecutar:
    ```bash
    npm install @ant-design/icons --save
    ```
3. instalar React Player, ejecutar:
    ```bash
    npm i react-player
    ```

### Ejecucion de la aplicacion
Para la ejecucion de la aplicacion, previamente leer el README.md de la direccion: ./api/README.md, para la instalacion de la api. Posteriormente ejecutar el siguiente comando: 
    ```  
    npm run start
    ```
### Uso_API
Una vez que el servidor este ejecutandose, se vera un mensaje por la terminal iniciado, 'Servidor ejecutandose sobre el puerto 5173'(por defecto). Posteriormente ya se encuentra listo para realizarle peticiones a la API. 
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh# llajtaSolution
