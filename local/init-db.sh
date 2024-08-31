#!/bin/bash
set -e

# Wait for PostgreSQL to start
until pg_isready -h postgres -p $DB_PORT -U "$DB_USER"; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done

# Restore the database from the backup file
psql -h postgres -U "$DB_USER" -d "$API_DB_NAME" < /docker-entrypoint-initdb.d/init-db.sql
