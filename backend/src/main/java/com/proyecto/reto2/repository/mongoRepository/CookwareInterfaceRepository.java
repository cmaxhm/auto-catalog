package com.proyecto.reto2.repository.mongoRepository;

import com.proyecto.reto2.model.Auto;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CookwareInterfaceRepository extends MongoRepository<Auto,String> {

    Optional<Auto> findByReference(String reference);

    public List<Auto> findByPriceLessThanEqual(double precio);

    @Query("{'description':{'$regex':'?0','$options':'i'}}")
    public List<Auto> findByDescriptionLike(String description);
}
