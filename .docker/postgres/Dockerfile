ARG POSTGIS_ARM64=gangstead/postgis:13-arm
ARG POSTGIS_AMD=postgis/postgis
ARG POSTGIS=${POSTGIS_AMD}
FROM ${POSTGIS}

WORKDIR /docker-entrypoint-initdb.d

ADD init.sh /docker-entrypoint-initdb.d

EXPOSE 5432
