/**
 * Configuración de WebPack para la build de desarrollo.
 * Se incorporan las opciones compartidas configuradas en
 * webpack.common.js.
 * 
 * Para que esta inclusión funcione, es necesario instalar
 * el paquete (de node) webpack-merge.
 */

// Para poder hacer "includes" de ficheros de configuración
// de webpack.
const { merge } = require('webpack-merge');

// Añadimos la configuración común.
const common = require('./webpack.common.js');

// Aunque esté definido en webpack.common.js, es local a él
// y lo necesitamos definir otra vez.
const path = require('path');

// Componente principal de Webpack. Incluye plugins "built-in" que
// usamos aquí:
//  - DefinePlugin : permite definir constantes en tiempo de compilación.
const webpack = require('webpack');

// Exportamos la configuración usando la función merge importada,
// y mezclando la configuración que añadimos con la común, también
// importada.
module.exports = merge(common, {

    // Atajo (desde Webpack 4) para configuración típica en modo
    // debug. Nos define automáticamente con webpack.DefinePlugin
    // la constante de precompilador 'process.env.NODE_ENV' con
    // el valor 'development'. Además, audita el código para
    // facilitar la depuración en el navegador, hace compilación
    // incremental para que los ciclos de pruebas sean más rápidos,
    // e incluye mensajes de error ricos en tiempo de ejecución.
    mode: 'development',

    // Se crean los "source map's" para que los errores de JS digan
    // estar en el punto del código original, no del bundle. Se generan
    // inline, directamente en los .js de los bundle's generados, lo que
    // los hace más grandes pero más cómodos de usar al no tener que
    // preocuparnos de los ficheros independientes.
    devtool: 'inline-source-map',

    // Configuración de webpack-dev-server que lanzamos durante el
    // desarrollo. Requiere haberlo instalado previamente con
    // npm install --save-dev webpack-dev-server
    devServer: {
        // Configuramos la ruta de los ficheros. Si no, se usará la ruta
        // actual.
        // Basta poner una ruta relativa pero recomiendan poner la ruta
        // entera.
        // Se podrían pasar varias opciones en un array.
        static: { 
            directory: path.join(__dirname, './dist'),
        },

        // Por defecto escucha en el 8080, pero colisiona con Tomcat, así es que
        // se mueve a 8081... para evitarlo (y que se enganche en 8080 si no tienes
        // aún tomcat lanzado) lo pongo en el 3000 (que es donde escuchan otros
        // servidores de desarrollo con Node)
        port: 3000,

        // Por defecto, el servidor de Webpack escucha en loopback.
        // Si lanzas node desde un contenedor, necesitas que escuche en
        // la IP "pública" del contenedor para que Docker se pueda conectar
        // y engancharlo con el puerto correspondiente en el anfitrión.
        // Para eso, hay que pedírselo explícitamente.
        // Ten en cuenta que esto solo lo querrás si efectivamente lo lanzas
        // desde un contenedor...
        host: '0.0.0.0',

        // Proxy realizado por el servidor para unirnos con el backend.
        proxy: {
            '/api': 'http://localhost:8080/',
        },
        // Hay más posibilidades, como https, especificar el index, ...
    }, // devServer

    module: {
        // Enseñamos a Webpack a cargar ficheros diferentes a .js que
        // son los únicos que sabe cargar (y procesar para buscar
        // referencias adicionales). 
        rules: [
            // La mayoría de las directivas ya se incluyeron en la
            // configuración compartida para ambos tipos de build.
            // Solo nos dejamos los de TypeScript, que necesitamos
            // cargar de forma diferente durante el desarrollo y en
            // la build final.

            // Ficheros .ts de TypeScript. Usamos dos cargadores
            // diferentes (que requieren sendos paquetes de Node).
            // El primero es ts-loader, que enseña a Webpack a
            // cargarlos y a compilarlos.
            // El segundo (que se ejecuta *antes*) es angular2-template-loader
            // que mira si el .ts que se está cargando es un componente
            // de Angular (directiva @Component), y si tiene campos
            // templateUrl y/o styleUrls que referencian a ficheros .html
            // y .css externos. Si es así, modifica las referencias a esos
            // ficheros para rodearlos con un require() y forzar así su
            // carga y que Webpack "los vea".
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        /*
        // Se generan unos warnings feos... pero en realidad se generan otros que no
        // se arreglan con esto, así es que lo mismo me da.
        // No sé muy bien de qué va. Pero creo que es porque en el código de Angular
        // se hacen "imports" de módulos con cadenas construídas en tiempo de ejecución,
        // y eso no es muy amigable para Webpack, al no estar en tiempo de
        // ejecución... El plugin ContextReplacementPlugin busca los "imports dinámicos"
        // y ayuda a Webpack a "resolverlos" para que sea qué hay que incluir o algo así.
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /(.+)?angular(\\|\/)core(.+)?/,
            path.resolve(__dirname, './src'), // location of your src
            {} // a map of your routes
        ),*/
        /*
        // Webpack 3.x. Con 4.x lo hace Webpack automáticamente al
        // establecer mode: development
        // Definimos constantes de precompilador específicas para este
        // tipo de builds.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
        */
    ],

}); // module.exports