package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import dimadon.business.tienda_don_doug_dimmadome.entities.Marca;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceMarca;

@RestController
@RequestMapping("/marca")
public class MarcaController {
    

    @Autowired
    ServiceMarca serviceMarca;


    @GetMapping()
    public ArrayList<Marca> obtenerMarca(){
        return serviceMarca.obtenerMarca();
    }

    @PostMapping()
    public Marca guardarMarca(@RequestBody Marca marca){
        return this.serviceMarca.insertarMarca(marca);
    }
}
