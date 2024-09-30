package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.Devolucion;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceDevolucion;

@RestController
@RequestMapping("/devolucion")
public class DevolucionController {
    

    @Autowired
    ServiceDevolucion serviceDevolucion;

    @GetMapping()
    public ArrayList<Devolucion> obtenerDevolucioin(){
        return serviceDevolucion.obtenerDevolucion();
    }

    @PostMapping()
    public Devolucion guardarDevolucion(@RequestBody Devolucion devolucion){
        return this.serviceDevolucion.insertatDevolucion(devolucion);
    }
}
