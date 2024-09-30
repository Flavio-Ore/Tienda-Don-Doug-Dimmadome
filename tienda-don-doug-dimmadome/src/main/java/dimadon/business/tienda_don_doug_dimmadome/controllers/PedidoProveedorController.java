package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.PedidoProveedor;
import dimadon.business.tienda_don_doug_dimmadome.services.ServicePedidoProveedor;

@RestController
@RequestMapping("/pedidoProveedor")
public class PedidoProveedorController {
    

    @Autowired
    ServicePedidoProveedor servicePedidoProveedor;


    @GetMapping()
    public ArrayList<PedidoProveedor> obtenerPedidoProveedor(){
        return servicePedidoProveedor.obtenerPedidoProveedor();
    }

    @PostMapping()
    public PedidoProveedor guardarPedidoProveedor(@RequestBody PedidoProveedor pedidoProveedor){
        return this.servicePedidoProveedor.insertarPedidoProveedor(pedidoProveedor);
    }
}
