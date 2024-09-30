package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.DetalleVenta;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceDetalleVenta;

@RestController
@RequestMapping("/detalleVenta")
public class DetalleVentaController {
    

    @Autowired
    ServiceDetalleVenta serviceDetalleVenta;

    @GetMapping()
    public ArrayList<DetalleVenta> obtenerDetalleVenta(){
        return serviceDetalleVenta.obtenerDetalleVenta();
    }

    @PostMapping()
    public DetalleVenta guardarDetalleVenta(@RequestBody DetalleVenta detalleVenta){
        return this.serviceDetalleVenta.inserterDetalleVenta(detalleVenta);
    }
}
