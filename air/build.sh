#!/bin/bash
# Build script for OpenLaszlo AIR applications.

COMPILE_ACTION=$1
if [ "$1" != test ]; then
  COMPILE_ACTION=build
fi

# This is the base workdir where some tools and the app are installed
WORKDIR=/Users/gerry/work

# Where stuff is installed
export JAVA_HOME=/usr
export LPS_HOME="/Applications/OpenLaszlo Server 4.3.0/Server/lps-4.3.0/"
OPENLASZLO_COMPILER="${LPS_HOME}/WEB-INF/lps/server/bin/lzc"
FLEX_HOME="${WORKDIR}/flex_sdk_3.3.0.4852"
AIR_TESTER="${FLEX_HOME}/bin/adl"
AIR_COMPILER="${FLEX_HOME}/bin/adt"

# Work directories for building, etc.
OPENLASZLO_WORK="${WORKDIR}/OLAnnoteView/air"
OPENLASZLO_WORKDIR="${OPENLASZLO_WORK}/work"
FLEX_WORKDIR=${OPENLASZLO_WORK}/flx/
FLEX_COMPILER=${FLEX_HOME}/bin/amxmlc
AIR_WORKDIR="${OPENLASZLO_WORK}"

# Base source files and dir
SRCDIR="${WORKDIR}/OLAnnoteView"
OL_BASENAME="cardtest"
OL_FILENAME="${OL_BASENAME}.lzx"
AIR_INSTALLER_FILENAME="OpenLaszloAir.air"
FLEX_BASENAME=MyOpenLaszloAirApp
FLEX_SRC_FILENAME=${FLEX_BASENAME}.mxml
FLEX_BIN_FILENAME=${FLEX_BASENAME}.swf
FLEX_SWF="${FLEX_WORKDIR}/${FLEX_BIN_FILENAME}"
AIR_DESCRIPTOR_FILENAME="OpenLaszloAir-app.xml"
AIR_DESCRIPTOR="${AIR_WORKDIR}/${AIR_DESCRIPTOR_FILENAME}"

# Link sources to workdir
if [ ! -d ${OPENLASZLO_WORKDIR} ] ; then
  mkdir ${OPENLASZLO_WORKDIR}
fi
if [ ! -e "${OPENLASZLO_WORKDIR}/cardtest.lzx" ] ; then
  ln -s ${SRCDIR}/cardtest.lzx ${OPENLASZLO_WORKDIR}
  ln -s ${SRCDIR}/cardlist.lzx ${OPENLASZLO_WORKDIR}
  ln -s ${SRCDIR}/cardview.lzx ${OPENLASZLO_WORKDIR}
  ln -s ${SRCDIR}/getnote.lzs ${OPENLASZLO_WORKDIR}
fi

OL_RUNTIME_OPTION=swf7
OL_OPTIONS="-linfo --runtime=${OL_RUNTIME_OPTION}"
OL_BIN_FILENAME="${OL_BASENAME}.${OL_RUNTIME_OPTION}.swf"

# Compile OpenLaszlo
if ! "$OPENLASZLO_COMPILER" $OL_OPTIONS "${OPENLASZLO_WORKDIR}/${OL_FILENAME}" ; then
    exit 1 # OL compile failed
fi

# Copy OL SWF to Flex directory
OPENLASZLO_SWF="${OPENLASZLO_WORKDIR}/${OL_BIN_FILENAME}"
if [ -e "${OPENLASZLO_SWF}" ]; then
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
if ! "$FLEX_COMPILER" "${FLEX_WORKDIR}/${FLEX_SRC_FILENAME}"; then
    # Flex compile failed
    echo "Unable to compile Flex SWF from ${FLEX_SRC_FILENAME}."
    exit 1
fi

# Copy Flex SWF to AIR directory
if [ -e "${FLEX_SWF}" ]; then
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
if [ "$COMPILE_ACTION" = test ]; then
    # Test
    "$AIR_TESTER" "${AIR_DESCRIPTOR}"
else
    # Build
    # Create self-signed certificate.
    CERTIFICATE_NAME="openlaszlocert.pfx"
    CERTIFICATE_PASSWORD="openlaszlo"
    "${AIR_COMPILER}" -certificate -cn SelfSigned 1024-RSA "${CERTIFICATE_NAME}" "${CERTIFICATE_PASSWORD}"
    # Compile AIR installer
    echo "Enter $CERTIFICATE_PASSWORD for the password here:"
    ${AIR_COMPILER} -package -storetype pkcs12 -keystore "${CERTIFICATE_NAME}" "${AIR_INSTALLER_FILENAME}" "${AIR_DESCRIPTOR_FILENAME}" "${FLEX_BIN_FILENAME}"
fi

exit 0
