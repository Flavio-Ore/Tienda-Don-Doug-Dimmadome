package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.Fabricante;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceFabricante;

@RestController
@RequestMapping("/fabricante")
public class FabricanteController {
    

    @Autowired
    ServiceFabricante serviceFabricante;


    @GetMapping()
    public ArrayList<Fabricante> obtenerFabricante(){
        return serviceFabricante.obtenerFabricante();
    }

    @PostMapping()
    public Fabricante guardarFabricante(@RequestBody Fabricante fabricante){
        return this.serviceFabricante.insertarFabricante(fabricante);
    }
}
