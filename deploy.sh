DEPLOY_CONNECT=root@167.71.214.240

echo "Downloading packages ...."
yarn install

echo "Compiling"
yarn generate

echo "Removing server html"
ssh ${DEPLOY_CONNECT} 'rm -r /var/www/groupbar.me/html'

echo "Mkdir folder"
ssh ${DEPLOY_CONNECT} 'mkdir /var/www/groupbar.me/html'

echo "Copying..."
scp -r -o StrictHostKeyChecking=no ./dist/* ${DEPLOY_CONNECT}:/var/www/groupbar.me/html