import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Planext CRM',
        short_name: 'Planext',
        description: 'Premium Real Estate Management',
        start_url: '/',
        display: 'standalone', // Essential for "App" feel
        background_color: '#0f172a', // Slate-950
        theme_color: '#1e40af',      // Blue-800
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
