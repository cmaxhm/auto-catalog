package com.proyecto.reto2.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.Map;

@Document(collection = "orders")

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
//
//    public static String PENDING = "Pendiente";
//    public static String APROVED = "Aprobada";
//    public static String REJECTED = "Rechazada";

    @Id
    private Integer id;
    private Date registerDay;
    private String status ="Pendiente";
    private User salesMan;
    private Map<String, Auto> products;
    private Map<String, Integer> quantities;

}
