.PHONY: process_raw_data
process_raw_data:
	time ls raw_chat_data/ | xargs -P 8 -I {} python scripts/process.py raw_chat_data/{} | tee stats.txt
	@echo "Total messages: $$(cat stats.txt | awk '{print $$2}' | sed 's/messages=//' | awk '{sum+=$$1;} END{print sum;}')"
	@echo "Total emotes: $$(cat stats.txt | awk '{print $$3}' | sed 's/emotes=//' | awk '{sum+=$$1;} END{print sum;}')"
	@echo "Total collisions: $$(cat stats.txt | awk '{print $$4}' | sed 's/collisions=//' | awk '{sum+=$$1;} END{print sum;}')"
	@echo "Total highlights: $$(cat stats.txt | awk '{print $$5}' | sed 's/highlights=//' | awk '{sum+=$$1;} END{print sum;}')"

.PHONY: compress_chat_data
compress_chat_data:
	rm -rf compressed_chat_data/
	cp -r chat_data compressed_chat_data
	cd compressed_chat_data; gzip -9 -- *.json

.PHONY: chrome
chrome:
	mkdir -p chrome
	cp *.js chrome/
	rm chrome/firefox*
	cp chrome-manifest.json chrome/manifest.json

	rm -rf chrome/chat_data

	cp -r compressed_chat_data chrome/chat_data
	cp -r emotes chrome/emotes
	cp -r icons chrome/icons

	cd chrome; zip -r ../RestoreFaunaEmotes-Chrome.zip *

.PHONY: firefox
firefox:
	mkdir -p firefox
	cp *.js firefox/
	rm firefox/chrome*
	cp firefox-manifest.json firefox/manifest.json

	rm -rf firefox/chat_data

	cp -r compressed_chat_data firefox/chat_data
	cp -r emotes firefox/emotes
	cp -r icons firefox/icons

	cd firefox; zip -r ../RestoreFaunaEmotes-Firefox.zip *

.PHONY: clean
clean:
	rm -rf chrome/ firefox/ compressed_chat_data/ RestoreFaunaEmotes-Chrome.zip RestoreFaunaEmotes-Firefox.zip
