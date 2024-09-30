package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.DetallePedidoProveedor;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceDetallePedidoProveedor;


@RestController
@RequestMapping("/detallePedido/proveedor")
public class DetallePedidoProveedorController {
    
     @Autowired
    ServiceDetallePedidoProveedor serviceDetallePedidoProveedor;

    @GetMapping()
    public ArrayList<DetallePedidoProveedor> obtenerDetallePedidoProveedor(){
        return serviceDetallePedidoProveedor.obtenerDetallePedidoProveedor();
    }

    @PostMapping()
    public DetallePedidoProveedor guardarDetallePedidoProveedor(@RequestBody DetallePedidoProveedor detallePedidoProveedor){
        return this.serviceDetallePedidoProveedor.insertarDetallePedidoProveedor(detallePedidoProveedor);
    }
}
