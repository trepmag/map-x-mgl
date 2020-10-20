#!/bin/sh

#
# Set default credential using custom variable
#
updateCred="<?xml version='1.0' encoding='UTF-8'?>\
  <userRegistry version='1.0' xmlns='http://www.geoserver.org/security/users'>\
  <users><user enabled='true' name='admin' password='plain:"${GEOSERVER_ADMIN_PASSWORD}"'/></users>\
  <groups/></userRegistry>" 


#
# If the data dir does not exist, import the default one, else, do nothing
#
if [ ! -d ${GEOSERVER_DATA_DIR}/security ]
then
  cp -R ${GEOSERVER_HOME}/data_dir ${GEOSERVER_DATA_DIR}
else
  echo "Data folder ${GEOSERVER_DATA_DIR} exists, don't copy default"
fi

#
# Update password
#
echo "Update admin default password"
echo ${updateCred} > ${GEOSERVER_DATA_DIR}/security/usergroup/default/users.xml

#
# Setup jdbcconfig
#
echo "Setup jdbcconfig"
if [ ! -d "${GEOSERVER_DATA_DIR}/jdbcconfig/" ]; then
  cp -a /geoserver/data_dir/jdbcconfig ${GEOSERVER_DATA_DIR}/
fi
JDBC_URL_ESCAPED=`echo $GEOSERVER_JDBC_URL | sed -E 's/([&\/])/\\\\\1/g'`
GEOSERVER_JDBC_USERNAME=postgres
GEOSERVER_JDBC_PASSWORD=$POSTGRES_PASSWORD
JDBC_USERNAME_ESCAPED=`echo $GEOSERVER_JDBC_USERNAME | sed -E 's/([&\/])/\\\\\1/g'`
JDBC_PASSWORD_ESCAPED=`echo $GEOSERVER_JDBC_PASSWORD | sed -E 's/([&\/])/\\\\\1/g'`
sed -i 's/^enabled=.*$/enabled='${GEOSERVER_JDBC_ENABLE}'/' ${GEOSERVER_DATA_DIR}/jdbcconfig/jdbcconfig.properties
sed -i 's/^jdbcUrl=.*$/jdbcUrl='${JDBC_URL_ESCAPED}'/' ${GEOSERVER_DATA_DIR}/jdbcconfig/jdbcconfig.properties
sed -i 's/^username=.*$/username='${JDBC_USERNAME_ESCAPED}'/' ${GEOSERVER_DATA_DIR}/jdbcconfig/jdbcconfig.properties
sed -i 's/^password=.*$/password='${JDBC_PASSWORD_ESCAPED}'/' ${GEOSERVER_DATA_DIR}/jdbcconfig/jdbcconfig.properties

#
# Start the app
#
sh ${GEOSERVER_HOME}"/bin/startup.sh"
