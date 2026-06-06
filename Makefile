test:
	echo "hi"

pull:
	git pull

deploy:
	sudo npm ci
	sudo rm -rf dist
	npm run build
	npm run start

fulldeploy: pull deploy
