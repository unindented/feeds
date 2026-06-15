FROM alpine:latest@sha256:a2d49ea686c2adfe3c992e47dc3b5e7fa6e6b5055609400dc2acaeb241c829f4

RUN apk update

RUN apk add rsync openssh-client && \
  echo "StrictHostKeyChecking no" >> /etc/ssh/ssh_config

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
