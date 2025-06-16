import type { Config } from '@/types.ts';
import packageJson from './package.json';

const config: Config = {
    defaultLanguage: 'sv',
<<<<<<< HEAD
    enabledLanguages: ['da', 'en', 'es', 'fi', 'fr', 'nb', 'sv', 'sl'],
=======
    enabledLanguages: ['da', 'en', 'es', 'fi', 'fr', 'nb', 'sv'],
>>>>>>> f7e27b5 (add new code base)
    apiBaseUrl: import.meta.env.PUBLIC_API_URL || '/api',
    pollingInterval: import.meta.env.PUBLIC_POLLING_INTERVAL || 5000,
    clientInfo: {
        version: packageJson.version,
        id: 'Zonemaster-GUI',
    },
    siteInfo: {
        email: 'contact@zonemaster.net',
        siteName: '',
    },
    setTitle(title: string) {
        return `${title} – Zonemaster`;
    }
};

export default config;
