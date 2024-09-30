package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryProveedor;
import dimadon.business.tienda_don_doug_dimmadome.entities.Proveedor;

@Service
public class ServiceProveedor {
    

    @Autowired
    RepositoryProveedor repositoryProveedor;

    public ArrayList<Proveedor> obtenerProveedor(){
        return (ArrayList<Proveedor>) repositoryProveedor.findAll();
    }

    public Proveedor insertarProveedor(Proveedor proveedor){
        return this.repositoryProveedor.save(proveedor);
    }
}
