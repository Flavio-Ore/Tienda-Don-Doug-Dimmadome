package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.Proveedor;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceProveedor;

@RestController
@RequestMapping("/proveedor")
public class ProveedorController {
    

    @Autowired
    ServiceProveedor serviceProveedor;


    @GetMapping()
    public ArrayList<Proveedor> obtenerProveedor(){
        return serviceProveedor.obtenerProveedor();
    }

    @PostMapping()
    public Proveedor guardarProveedor(@RequestBody Proveedor proveedor){
        return this.serviceProveedor.insertarProveedor(proveedor);
    }
}
