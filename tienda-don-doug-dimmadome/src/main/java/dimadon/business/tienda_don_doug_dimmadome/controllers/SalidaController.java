package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.Salida;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceSalida;


@RestController
@RequestMapping("/salida")
@CrossOrigin(origins = "https://tienda-don-doug-dimmadome.vercel.app")
public class SalidaController {
    
    @Autowired
    ServiceSalida serviceSalida;

   @GetMapping("/obtener")
    public ArrayList<Salida> obtenerSalida(){
        return serviceSalida.obtenerSalida();
    }

    @PostMapping("/insertar")
    public Salida insertarSalida(@RequestBody Salida salida){
        return serviceSalida.insertarSalida(salida);
    }
       
}
