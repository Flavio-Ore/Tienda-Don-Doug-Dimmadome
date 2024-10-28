package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryEntrada;
import dimadon.business.tienda_don_doug_dimmadome.entities.Entrada;
import dimadon.business.tienda_don_doug_dimmadome.entities.Usuario;

@Service
public class ServiceEntrada {
    
    @Autowired
    RepositoryEntrada repositoryEntrada;
    
    public ArrayList<Entrada> obtnerEntrada(){
        return (ArrayList<Entrada>) repositoryEntrada.findAll();
    }

    public Entrada insertarEntrada(Entrada entrada){
        return this.repositoryEntrada.save(entrada);
    }

    
}
