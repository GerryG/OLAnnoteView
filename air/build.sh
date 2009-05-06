#!/bin/bash -xv
# Build script for OpenLaszlo AIR applications.

COMPILE_ACTION=build
if [ "$1" = test ]; then
    COMPILE_ACTION=test
fi

# TODO: Make sure JAVA_HOME and LPS_HOME
#       are set and uses MIXED format (forward slashes)
export JAVA_HOME=/usr

WORKDIR=/Users/gerry/work
SRCDIR=${WORKDIR}/OLAnnoteView
OPENLASZLO_HOME="/Applications/OpenLaszlo Server 4.3.0/Server/lps-4.3.0/"
OPENLASZLO_WORK="${WORKDIR}/OLAnnoteView/air"
OPENLASZLO_WORKDIR="${OPENLASZLO_WORK}/work"

# Link sources to workdir
ln -s ${WORKDIR}/cardtest.lzx ${OPENLASZLO_WORKDIR}
ln -s ${WORKDIR}/getnote.lzs ${OPENLASZLO_WORKDIR}

OPENLASZLO_COMPILER="${OPENLASZLO_HOME}/WEB-INF/lps/server/bin/lzc"
cd "${OPENLASZLO_HOME}/WEB-INF/lps/server/bin/"
export LPS_HOME="${OPENLASZLO_HOME}"

FLEX_HOME="${WORKDIR}/flex_sdk_3.3.0.4852"
FLEX_WORKDIR=${OPENLASZLO_WORK}/flx/
FLEX_COMPILER=${FLEX_HOME}/bin/amxmlc # mxmlc

AIR_HOME="${WORKDIR}/work/AIR SDK"
AIR_WORKDIR="${OPENLASZLO_WORK}"
AIR_TESTER="${FLEX_HOME}/bin/adl"
AIR_COMPILER="${FLEX_HOME}/bin/adt"
AIR_INSTALLER_FILENAME="OpenLaszloAir.air"

OL_RUNTIME_OPTION=swf7
OL_OPTIONS="--runtime=${OL_RUNTIME_OPTION}"
OL_BASENAME=my-openlaszlo-air-app
OL_SRC_FILENAME=${OL_BASENAME}.lzx
OL_BIN_FILENAME="${OL_BASENAME}.lzx.${OL_RUNTIME_OPTION}.swf"

FLEX_BASENAME=MyOpenLaszloAirApp
FLEX_SRC_FILENAME=${FLEX_BASENAME}.mxml
FLEX_BIN_FILENAME=${FLEX_BASENAME}.swf



# Compile OpenLaszlo
OPENLASZLO_FILE="${OPENLASZLO_WORKDIR}/${OL_SRC_FILENAME}"
if ! "$OPENLASZLO_COMPILER" "$OL_OPTIONS" "$OPENLASZLO_FILE"; then
    # OL compile failed
    exit 1
fi

# Copy OL SWF to Flex directory
OPENLASZLO_SWF="${OPENLASZLO_WORKDIR}/${OL_BIN_FILENAME}"
if [ -e "${OPENLASZLO_SWF}" ]; then
    #echo "Skip copy $OPENLASZLO_WORKDIR == $FLEX_WORKDIR"
    if ! cp "${OPENLASZLO_SWF}" "${FLEX_WORKDIR}"; then
        # Copy failed
        echo "Unable to copy OpenLaszlo SWF to ${FLEX_WORKDIR}."
        exit 1
    fi
else
    # File doesn't exist
    echo "OpenLaszlo SWF not found at ${OPENLASZLO_SWF}."
    exit 1
fi

# Compile Flex SWF
cd "$FLEX_WORKDIR"
FLEX_FILE="${FLEX_WORKDIR}/${FLEX_SRC_FILENAME}"
if ! "$FLEX_COMPILER" "$FLEX_FILE"; then
    # Flex compile failed
    echo "Unable to compile Flex SWF from ${FLEX_FILE}."
    exit 1
fi

# Copy Flex SWF to AIR directory
FLEX_SWF="${FLEX_WORKDIR}/${FLEX_BIN_FILENAME}"
if [ -e "${FLEX_SWF}" ]; then
    #echo "Skip cp ${FLEX_SWF} ${AIR_WORKDIR}"
    if ! cp "${FLEX_SWF}" "${AIR_WORKDIR}"; then
        # Copy failed
        echo "Unable to copy Flex SWF to ${AIR_WORKDIR}."
        exit 1
    fi
else
    # File doesn't exist
    echo "Flex SWF not found at ${FLEX_SWF}."
    exit 1
fi

cd "$AIR_WORKDIR"
AIR_DESCRIPTOR_FILENAME="OpenLaszloAir-app.xml"
AIR_DESCRIPTOR="${AIR_WORKDIR}/${AIR_DESCRIPTOR_FILENAME}"
if [ "$COMPILE_ACTION" = test ]; then
    # Test
    "$AIR_TESTER" "${AIR_DESCRIPTOR}"
else
    # Build
    # Create self-signed certificate.
    CERTIFICATE_NAME="openlaszlocert.pfx"
    CERTIFICATE_PASSWORD="openlaszlo"
    AIR_SWF="${AIR_WORKDIR}/${FLEX_BIN_FILENAME}"
    "${AIR_COMPILER}" -certificate -cn SelfSigned 1024-RSA "${CERTIFICATE_NAME}" "${CERTIFICATE_PASSWORD}"
    # Compile AIR installer
    # "${AIR_COMPILER}" -package -storetype pkcs12 -keystore "${CERTIFICATE_NAME}" "${AIR_INSTALLER_FILENAME}" "${AIR_DESCRIPTOR}" "${AIR_SWF}"
    echo "Enter $CERTIFICATE_PASSWORD for the password here:"
    ${AIR_COMPILER} -package -storetype pkcs12 -keystore "${CERTIFICATE_NAME}" "${AIR_INSTALLER_FILENAME}" "${AIR_DESCRIPTOR_FILENAME}" "${FLEX_BIN_FILENAME}"
fi

exit 0
