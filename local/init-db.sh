#!/bin/bash
set -e

# Wait for PostgreSQL to start
until pg_isready -p "$POSTGRES_PORT" -U "$POSTGRES_USER"; do
  echo "<<DB_INIT_LOADER>> Waiting for PostgreSQL.."
  sleep 5
done

# Restore the database from the backup file
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" < /docker-entrypoint-initdb.d/init-data.sql
