/**
 * Configuración de WebPack común para las builds de desarrollo
 * y de producción.
 * 
 * Este fichero no es usado directamente en los scripts (de package.json)
 * sino que es incluído desde los ficheros de configuración de cada
 * tipo de build.
 */

const path = require('path');

// Componente principal de Webpack. Incluye plugins "built-in" que
// usamos aquí:
// - DefinePlugin : permite definir constantes en tiempo de compilación.
const webpack = require('webpack');

// Plugin para manipular el index.html e incluir la carga de recursos.
// De hecho... lo crea cada vez en ./dist a pincho.
// Crea un index.html en output.path incluyendo los scripts de los
// que hace la build (según los puntos de entrada de entry), y luego
// otra configuración que pongamos (por ejemplo el título del HTML
// configurado en plugins, new HtmlWebpackPlugin).
//
// También se puede crear un html como plantilla en lugar de que lo cree
// él entero. Es lo que haremos con ./src/index.html.
//
// npm install --save-dev html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Plugin para copiar ficheros estáticos de ./src a ./dist en cada
// build.
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Para usar variables de entorno
//const Dotenv = require('dotenv-webpack');
//require('dotenv').config({ path: './.env' });

module.exports = {
    entry: {
        main: './src/js/main.js',
    },

    plugins: [
        new HtmlWebpackPlugin({
            // Título de la página index.html que nos genera como base.
            title: 'SimViz',
            // Plantilla que usamos
            template: "src/index.html",
        }),
        new webpack.DefinePlugin({
            // Si añades alguna, defínelas para TypeScript en types/definePlugin.d.ts
            'BUILD_VERSION': JSON.stringify('1.0.0'),
            // Añadiendo esto, podemos usar las variables de entorno que 
            // tenemos en el archivo .env dentro de los archivos que creamos
            // con webpack
            "process.env": JSON.stringify(process.env)
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'images', to: 'images' },
                { from: 'data', to: 'data' }
            ],
        }),
    ],

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    // Enseñamos a Webpack a cargar ficheros diferentes a .js que
    // son los únicos que sabe cargar (y procesar para buscar
    // referencias adicionales). 
    module: {
        rules: [
            // NO añadimos, aún, cargador de ficheros .ts (de TypeScript).
            // Necesitamos un cargador diferente en desarrollo y en
            // "release", porque en este último caso usaremos compilación
            // AoT de las plantillas y se necesita un cargador distinto.
            // Lo especificamos en los ficheros específicos de cada
            // tipo de compilación.

            // Ficheros .html y .css. Normalmente NO haremos nosotros
            // inclusiones de estos ficheros a mano. Estarán referenciados
            // en directivas @Component para apuntar a las plantillas. El
            // cargador de los .ts fuerza su carga con require, y tenemos
            // que enseñar a Webpack a cargarlos y procesarlos.
            // Lo que hacemos es pedirle que los cargue simplemente como
            // cadenas, sin procesamientos posteriores (raw-loader).
            // Podríamos haber usado cargadores específicos (html-loader
            // y css-loader). Pero entonces Webpack haría un análisis del
            // contenido para buscar referencias adicionales a incluir, y
            // no queremos eso (aparte de que hace que todo tarde más).
            {
                //test: /\.(html|css)$/,
                test: /\.(html)$/,
                loader: 'raw-loader',
            },
        ] // rules
    }, // module

    // Indicamos a Webpack las extensiones predefinidas de los
    // módulos. En los import que pongamos con ficheros sin
    // extensión, probará a buscar los ficheros con las
    // extensiones siguientes. Por defecto son '.js' y '.json'
    // pero tenemos que añadir .ts[x] para TypeScript.
    // .json no lo añado. .tsx en realidad no hace falta... es
    // la extensión usada por convenio para plantillas de React.
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    // Prueba de cargas de recursos
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            /*
                    {
                        test: /\.(png|svg|jpg|gif)$/,
                        use: [
                            'file-loader'
                        ]
                    },
                    {
                        test: /\.(woff|woff2|eot|ttf|otf)$/,
                        use: [
                            'file-loader'
                        ]
                    },
                    {
                        test: /\.(csv|tsv)$/,
                        use: [
                            'csv-loader'
                        ]
                    },
                    {
                        test: /\.xml$/,
                        use: [
                            'xml-loader'
                        ]
                    }
            */
        ]
    }
}; // module.exports