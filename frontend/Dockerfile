FROM httpd:2-alpine

# Remove default files in server folder
RUN rm -f /usr/local/apache2/htdocs/*

# Install dependencies
RUN apk add nodejs
RUN apk add npm

# Copy frontend project into temporary folder and navigate to it
RUN mkdir /frontend-temp
COPY ./frontend /frontend-temp
WORKDIR /frontend-temp

# Install project dependencies and generate build
RUN npm install
RUN npx ng build

# Copy project files to server folder and remove temporary project folder
RUN cp -R ./dist/auto-catalog-frontend/* /usr/local/apache2/htdocs
RUN rm -r /frontend-temp
