FROM httpd:2-alpine

# Remove default files in server folder
RUN rm -f /usr/local/apache2/htdocs/*

# Copy project files to server folder
COPY ./frontend-vanilla /usr/local/apache2/htdocs

EXPOSE 80:80
