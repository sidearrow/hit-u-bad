release:
	git checkout release
	git merge master
	git push
	git checkout master