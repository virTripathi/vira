import Echo from 'laravel-echo';

const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY || 'local',
    // cluster: import.meta.env.VITE_REVERB_APP_CLUSTER,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT || 8080,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss']
});

export default echo;