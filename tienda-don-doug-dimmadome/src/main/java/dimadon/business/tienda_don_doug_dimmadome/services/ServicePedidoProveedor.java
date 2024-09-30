package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryPedidoProveedor;
import dimadon.business.tienda_don_doug_dimmadome.entities.PedidoProveedor;

@Service
public class ServicePedidoProveedor {
    

    @Autowired
    RepositoryPedidoProveedor repositoryPedidoProveedor;

    public ArrayList<PedidoProveedor> obtenerPedidoProveedor(){
        return (ArrayList<PedidoProveedor>) repositoryPedidoProveedor.findAll();
    }

    public PedidoProveedor insertarPedidoProveedor(PedidoProveedor pedidoProveedor){
        return this.repositoryPedidoProveedor.save(pedidoProveedor);
    }
}
