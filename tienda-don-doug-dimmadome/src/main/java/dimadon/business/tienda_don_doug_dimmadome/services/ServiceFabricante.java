package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryFabricante;
import dimadon.business.tienda_don_doug_dimmadome.entities.Fabricante;

@Service
public class ServiceFabricante {
    
    @Autowired
    RepositoryFabricante repositoryFabricante;

    public ArrayList<Fabricante> obtenerFabricante(){
        return (ArrayList<Fabricante>) repositoryFabricante.findAll();
    }

    public Fabricante insertarFabricante(Fabricante fabricante){
        return this.repositoryFabricante.save(fabricante);
    }
}
