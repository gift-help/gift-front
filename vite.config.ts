import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process';

let commitHash = 'DEV';
try {
  commitHash = execSync('git rev-parse --short=7 HEAD').toString().trim();
} catch (e) {
  console.warn('Could not get git hash, using default.', e);
}

const now = new Date();
const buildTime = now.toLocaleString('ru-RU', {
  timeZone: 'Asia/Yekaterinburg',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Важно для доступа с других устройств
    port: 5174,
    allowedHosts: [
      '.loca.lt', // Разрешаем все субдомены loca.lt
      'localhost',
      '.ngrok-free.app', // Для ngrok
      '.serveo.net', // Для serveo
      '.loca.lt',
      'salty-wombats-own.loca.lt' // Конкретно ваш домен
    ]
  },
  define: {
    'import.meta.env.VITE_COMMIT_HASH': JSON.stringify(commitHash),
    'import.meta.env.VITE_BUILD_TIME': JSON.stringify(buildTime),
  },
})
