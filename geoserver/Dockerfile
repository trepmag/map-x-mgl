# vim:set ft=dockerfile:

FROM openjdk:8-alpine

MAINTAINER Fred Moser <moser.frederic@gmail.com>

ENV GEOSERVER_VERSION=2.17.0
ENV GEOSERVER_HOME=/geoserver
ENV GEOSERVER_DATA_DIR=${GEOSERVER_HOME}/data_dir
ENV GEOSERVER_ADMIN_PASSWORD=1234
ENV JAVA_OPTS -Xms128m -Xmx512m -XX:MaxPermSize=512m

RUN set -x \
  && apk add --no-cache openssl \
  && mkdir $GEOSERVER_HOME \
  && wget -O $GEOSERVER_HOME/geoserver.zip https://downloads.sourceforge.net/project/geoserver/GeoServer/$GEOSERVER_VERSION/geoserver-$GEOSERVER_VERSION-bin.zip \
  && unzip -d $GEOSERVER_HOME $GEOSERVER_HOME/geoserver.zip \
  && rm -rf $GEOSERVER_HOME/geoserver.zip \
  && wget -O $GEOSERVER_HOME/jdbconfig.zip https://build.geoserver.org/geoserver/${GEOSERVER_VERSION:0:4}.x/community-latest/geoserver-${GEOSERVER_VERSION:0:4}-SNAPSHOT-jdbcconfig-plugin.zip \
  && unzip -d $GEOSERVER_HOME/webapps/geoserver/WEB-INF/lib $GEOSERVER_HOME/jdbconfig.zip \
  && rm -rf $GEOSERVER_HOME/jdbconfig.zip \
  && adduser -S geoserver \
  && chown -R geoserver $GEOSERVER_HOME 
  
COPY ./jdbcconfig $GEOSERVER_DATA_DIR/jdbcconfig

WORKDIR $GEOSERVER_HOME
VOLUME $GEOSERVER_DATA_DIR

COPY ./start.sh ./start.sh

CMD ["sh","./start.sh"]

EXPOSE 8080


