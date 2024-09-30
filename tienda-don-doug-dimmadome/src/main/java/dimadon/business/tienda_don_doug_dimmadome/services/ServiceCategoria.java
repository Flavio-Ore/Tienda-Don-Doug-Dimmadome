package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryCategoria;
import dimadon.business.tienda_don_doug_dimmadome.entities.Categoria;

@Service
public class ServiceCategoria {
    

    @Autowired
    RepositoryCategoria repositoryCategoria;


    public ArrayList<Categoria> obtenerCAtegoria(){
        return (ArrayList<Categoria>) repositoryCategoria.findAll();
    }
    
    public Categoria GuardarCategoria(Categoria categoria){
        return repositoryCategoria.save(categoria);
    }
}
