rm -rf www
rm -rf android
ionic build
npx cap add android
npx cap sync

-- abrir android studio