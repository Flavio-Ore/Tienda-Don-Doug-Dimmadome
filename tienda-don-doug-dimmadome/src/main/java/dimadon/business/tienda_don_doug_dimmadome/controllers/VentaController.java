package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.Venta;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceVenta;

@RestController
@RequestMapping("/venta")
public class VentaController {
    

    @Autowired
    ServiceVenta serviceVenta;


    @GetMapping()
    public ArrayList<Venta> obtenerVentas(){
        return serviceVenta.obtenerVentas();
    }

    @PostMapping()
    public Venta guardarVenta(@RequestBody Venta venta){
        return this.serviceVenta.insertarVenta(venta);
    }
}
