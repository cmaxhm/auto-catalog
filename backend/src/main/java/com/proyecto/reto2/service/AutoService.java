package com.proyecto.reto2.service;

import com.proyecto.reto2.model.Auto;
import com.proyecto.reto2.repository.AutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class AutoService {

    @Autowired
    private AutoRepository autoRepository;

    /* METODO PARA GUARDAR UN PRODUCTO VALIDADO POR REFERENCIA*/
    public Auto saveProduct(Auto auto){
        Optional<Auto> validarReferencia = autoRepository.findByReference(auto.getReference());
        if(!validarReferencia.isPresent()){
            autoRepository.saveProducto(auto);
        }
        return null;
    }

    /* MOSTRAR PRODUCTOS*/
    public List<Auto> getAllProducts(){
        return autoRepository.getAllProducts();
    }

    public Auto updateProduct(Auto auto){
        Optional<Auto> validarReferencia = autoRepository.findByReference(auto.getReference());
        if(validarReferencia.isPresent()){
            autoRepository.saveProducto(auto);
        }
        return null;
    }
    public void deleteProduct(String reference){
        Optional<Auto> validarExistencia = autoRepository.findByReference(reference);
        if(validarExistencia.isPresent()){
            autoRepository.deleteProduct(reference);
        }
    }

    public Optional<Auto> findByReference(String ref){
        return autoRepository.findByReference(ref);
    }

    public List<Auto> productByPrice(double price) {
        return autoRepository.productByPrice(price);
    }

    //Reto 5
    public List<Auto> findByDescriptionLike(String description) {
        return autoRepository.findByDescriptionLike(description);
    }
}
