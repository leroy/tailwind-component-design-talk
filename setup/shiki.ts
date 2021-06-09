import { defineShikiSetup } from '@slidev/types'

export default defineShikiSetup(({BUNDLED_LANGUAGES}) => {
    return {
        theme: {
            dark: 'min-dark',
            light: 'material-palenight',
        },

        langs: [
            ...BUNDLED_LANGUAGES,
            {
                id: 'blade',
                scopeName: 'text.html.php.blade',
                path: '../../highlight/blade.tmLanguage.json'
            }
        ]
    }
})