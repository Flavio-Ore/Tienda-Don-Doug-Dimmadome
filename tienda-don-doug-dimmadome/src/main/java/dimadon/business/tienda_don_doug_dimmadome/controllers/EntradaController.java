package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.Entrada;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceEntrada;

@RestController
@RequestMapping("/entrada")
@CrossOrigin(origins = "https://tienda-don-doug-dimmadome.vercel.app")
public class EntradaController {
    

    @Autowired
    ServiceEntrada serviceEntrada;

    @GetMapping("/obtener")
    public ArrayList<Entrada> obtenerEntradas(){
        return serviceEntrada.obtnerEntrada();
    }

    @PostMapping("/insertar")
    public Entrada insertarEntrada(@RequestBody Entrada entrada){
        return serviceEntrada.insertarEntrada(entrada);
    }

    
}
