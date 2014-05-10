package com.kizy.web;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class ResponseEntities {
    public static class Builder<T> {
        private T object;
        private HttpStatus status = HttpStatus.OK;
        private String contentType = "text/plain";
        private String charset;
        private String location;

        public Builder<T> set(T t) {
            this.object = t;
            return this;
        }

        public Builder<T> status(HttpStatus newStatus) {
            this.status = newStatus;
            return this;
        }

        public Builder<T> contentType(String newContentType) {
            this.contentType = newContentType;
            return this;
        }

        public Builder<T> charset(String newCharset) {
            this.charset = newCharset;
            return this;
        }

        public Builder<T> location(String newLocation) {
            this.location = newLocation;
            return this;
        }

        public ResponseEntity<T> build() {
            HttpHeaders headers = new HttpHeaders();
            if (contentType != null) {
                String value = contentType;
                if (charset != null) {
                    value = value + "; charset=" + charset;
                }
                headers.add("Content-Type", value);
            }

            if (location != null) {
                headers.add("Location", location);
            }
            return new ResponseEntity<T>(object, headers, status);
        }
    }

    private ResponseEntities() {
        // no instantiation.
    }

    public static <T> Builder<T> builder() {
        return new Builder<T>();
    }


    public static ResponseEntity<String> redirect(String to) {
        String backup = "<a href='" + to + "'>" + to + "</a>";
        return ResponseEntities.<String>builder()
                .set(backup)
                .status(HttpStatus.FOUND)
                .location(to)
                .build();
    }

    public static ResponseEntity<String> plaintext(String text) {
        return plaintext(text, HttpStatus.OK);
    }

    public static ResponseEntity<String> plaintext(String text, HttpStatus status) {
        return ResponseEntities.<String>builder()
                .set(text)
                .contentType(MediaType.TEXT_PLAIN.toString())
                .charset("utf-8")
                .status(status)
                .build();
    }

    public static ResponseEntity<String> json(String json) {
        return json(json, HttpStatus.OK);
    }

    public static ResponseEntity<String> json(String json, HttpStatus status) {
        return ResponseEntities.<String>builder()
                .set(json)
                .contentType(MediaType.APPLICATION_JSON.toString())
                .charset("utf-8")
                .status(status)
                .build();
    }
}
