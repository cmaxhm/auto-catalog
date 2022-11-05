package com.proyecto.reto2.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.swing.*;
import java.net.URL;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "supplements")
public class Auto {


    private String reference;
    private String brand;
    private String category;
    private String materiales;
    private String dimensiones;
    private String description;
    private boolean availability = true;
    private double price;
    private int quantity;
    private String photography;
}
