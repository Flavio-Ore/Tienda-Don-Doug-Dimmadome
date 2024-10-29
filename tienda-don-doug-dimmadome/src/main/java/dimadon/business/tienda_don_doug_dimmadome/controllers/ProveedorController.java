package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.Proveedor;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceProveedor;

@RestController
@RequestMapping("/proveedor")
@CrossOrigin(origins = "https://tienda-don-doug-dimmadome.vercel.app")
public class ProveedorController {
    
    @Autowired
    ServiceProveedor serviceProveedor;

    @GetMapping("/obtener")
    public ArrayList<Proveedor> obtenerProveedores(){
        return serviceProveedor.obtnerProveedor();
    }

    @PostMapping("/insertar")
    public Proveedor insertarProveedor(@RequestBody Proveedor proveedor){
        return serviceProveedor.insertarProveedor(proveedor);
    }
}
