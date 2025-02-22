PUBLIC_DIR := website/dist

COMPRESSIBLE_EXTENSIONS := css html js json mjs svg webmanifest xml

COMPRESSIBLE_FIND_INCLUDE := $(subst =, ,$(subst $(eval) , -o ,$(patsubst %,-iname='*.%',$(COMPRESSIBLE_EXTENSIONS))))
COMPRESSIBLE_FILES := $(shell find $(PUBLIC_DIR) -type f \( $(COMPRESSIBLE_FIND_INCLUDE) \) 2> /dev/null)
COMPRESSIBLE_FILES_BROTLI := $(addsuffix .br, $(COMPRESSIBLE_FILES))
COMPRESSIBLE_FILES_GZIP := $(addsuffix .gz, $(COMPRESSIBLE_FILES))

.PHONY: compress
compress: compress-brotli compress-gzip

compress-brotli: $(COMPRESSIBLE_FILES_BROTLI)
	@echo
	@echo "Finished compressing files with Brotli!"

compress-gzip: $(COMPRESSIBLE_FILES_GZIP)
	@echo
	@echo "Finished compressing files with Gzip!"

$(PUBLIC_DIR)/%.br: $(PUBLIC_DIR)/%
	@brotli -f -o $@ $<
	@touch $@
	@printf "."

$(PUBLIC_DIR)/%.gz: $(PUBLIC_DIR)/%
	@gzip -f -k $<
	@touch $@
	@printf "."
