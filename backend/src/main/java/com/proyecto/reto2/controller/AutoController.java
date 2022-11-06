package com.proyecto.reto2.controller;

import com.proyecto.reto2.model.Auto;
import com.proyecto.reto2.service.AutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auto")
public class AutoController {

    @Autowired
    private AutoService autoService;

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<Auto> getAllCookware(){
        return autoService.getAllProducts();
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Auto saveCookware(@RequestBody Auto auto){
        return autoService.saveProduct(auto);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Auto updateCookware(@RequestBody Auto auto){
        return autoService.updateProduct(auto);
    }

    @DeleteMapping("/{reference}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCokkware(@PathVariable String reference){
        autoService.deleteProduct(reference);
    }

    @GetMapping("/{reference}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<Auto> getByRef(@PathVariable String reference){
        return autoService.findByReference(reference);
    }

    //Reto 5
    @GetMapping("/price/{price}")
    public List<Auto> gadgetsByPrice(@PathVariable("price") double precio) {
        return autoService.productByPrice(precio);
    }
    //Reto 5
    @GetMapping("/description/{description}")
    public List<Auto> findByDescriptionLike(@PathVariable("description") String description) {
        return autoService.findByDescriptionLike(description);
    }
}
