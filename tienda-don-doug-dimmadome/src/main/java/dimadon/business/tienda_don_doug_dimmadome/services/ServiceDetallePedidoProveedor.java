package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryDetallePedidoProveedor;
import dimadon.business.tienda_don_doug_dimmadome.entities.DetallePedidoProveedor;

@Service
public class ServiceDetallePedidoProveedor {
    
    @Autowired
    RepositoryDetallePedidoProveedor repositoryDetallePedidoProveedor;

    public ArrayList<DetallePedidoProveedor> obtenerDetallePedidoProveedor(){
        return (ArrayList<DetallePedidoProveedor>) repositoryDetallePedidoProveedor.findAll();
    }

    public DetallePedidoProveedor insertarDetallePedidoProveedor(DetallePedidoProveedor detallePedido){
        return this.repositoryDetallePedidoProveedor.save(detallePedido);
    }
}
