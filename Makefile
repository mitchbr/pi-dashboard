pull:
	git pull

deploy:
	npm ci
	npm run build
	npm run start

fulldeploy: pull deploy
