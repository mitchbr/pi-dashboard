test:
	echo "hi"

pull:
	git pull

deploy:
	sudo npm ci
	npm run build
	npm run start

fulldeploy: pull deploy
