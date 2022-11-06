package com.proyecto.reto2.repository;

import com.proyecto.reto2.model.Auto;
import com.proyecto.reto2.repository.mongoRepository.CookwareInterfaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class AutoRepository {

    @Autowired
    private CookwareInterfaceRepository cookwareInterfaceRepository;

    public Auto saveProducto(Auto producto){
        return (Auto) cookwareInterfaceRepository.save(producto);
    }

    public List<Auto> getAllProducts(){
        return (List<Auto>) cookwareInterfaceRepository.findAll();
    }

    public void deleteProduct(String reference){
        cookwareInterfaceRepository.deleteById(reference);
    }

    public Optional<Auto> findByReference(String reference){
        return cookwareInterfaceRepository.findByReference(reference);
    }

    public List<Auto> productByPrice(double precio) {
        return cookwareInterfaceRepository.findByPriceLessThanEqual(precio);
    }

    //Reto 5
    public List<Auto> findByDescriptionLike(String description) {
        return cookwareInterfaceRepository.findByDescriptionLike(description);
    }
}
