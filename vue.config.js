module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
          @import "@/scss/main.scss";
        `
            }
        }
    },
    pwa: {
        manifestOptions: {
            name: 'IDashBoard',
            short_name: 'idashboard',
            themeColor: '#FFFFFF',
            msTileColor: '#000000',
            appleMobileWebAppCapable: 'yes',
            appleMobileWebAppStatusBarStyle: 'black',
            icons: [
                {
                    "src": "./img/icons/android-launchericon-144-144.png",
                    "sizes": "144x144",
                    "type": "image/png"
                },
                {
                    "src": "./img/icons/android-launchericon-48-48.png",
                    "sizes": "48x48",
                    "type": "image/png"
                },
                {
                    "src": "./img/icons/android-launchericon-72-72.png",
                    "sizes": "72x72",
                    "type": "image/png"
                },
                {
                    "src": "./img/icons/android-launchericon-96-96.png",
                    "sizes": "96x96",
                    "type": "image/png"
                },
                {
                    "src": "./img/icons/android-launchericon-192-192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "./img/icons/android-launchericon-512-512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                }
            ],
            start_url: 'index.html',
            display: 'standalone',
            orientation: 'portrait',
        },

        // configure the workbox plugin
        workboxPluginMode: 'GenerateSW',

    }
};
