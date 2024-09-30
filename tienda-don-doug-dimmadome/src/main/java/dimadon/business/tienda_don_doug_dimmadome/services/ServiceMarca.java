package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryMarca;
import dimadon.business.tienda_don_doug_dimmadome.entities.Marca;

@Service
public class ServiceMarca {
    

    @Autowired
    RepositoryMarca repositoryMarca;

    public ArrayList<Marca> obtenerMarca(){
        return (ArrayList<Marca>) repositoryMarca.findAll();
    
    }

    public Marca insertarMarca (Marca marca){
        return this.repositoryMarca.save(marca);
    }
}
