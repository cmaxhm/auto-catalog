package com.proyecto.reto2.repository.mongoRepository;

import com.proyecto.reto2.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MongoInterfaceRepository extends MongoRepository<User,Integer> {

     Optional<User> findByEmail(String email);
     Optional<User> findByEmailAndPassword(String email,String password);
     //Para seleccionar el usuario con el id maximo
     Optional<User> findTopByOrderByIdDesc();

     List<User> findByMonthBirthtDay(String monthBirthtDay);
}
