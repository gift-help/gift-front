import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
})
