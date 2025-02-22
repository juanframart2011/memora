rm -rf www
rm -rf android
ionic build
npx cap add android
npx cap sync

-- abrir android studio


///
opciones B
ionic build
ionic capacitor copy android
npm install jetifier
npx jetify
npx cap sync android