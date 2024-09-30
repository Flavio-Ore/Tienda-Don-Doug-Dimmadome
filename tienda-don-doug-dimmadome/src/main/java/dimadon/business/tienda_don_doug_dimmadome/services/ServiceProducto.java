package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryProducto;
import dimadon.business.tienda_don_doug_dimmadome.entities.Producto;

@Service
public class ServiceProducto {
    @Autowired
    RepositoryProducto repositoryProducto;

    public ArrayList<Producto> listarProducto(){
        return (ArrayList<Producto>) repositoryProducto.findAll();
    }
    public Producto guardarProducto(Producto producto){
        return repositoryProducto.save(producto);
    }
}
