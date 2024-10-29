package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryTipoUsuario;
import dimadon.business.tienda_don_doug_dimmadome.entities.TipoUsuario;

@Service
public class ServiceTipoUsuario {
    


    @Autowired
    RepositoryTipoUsuario repositoryTipoUsuario;
    
    public ArrayList<TipoUsuario> obtnerTipoUsuario(){
        return (ArrayList<TipoUsuario>) repositoryTipoUsuario.findAll();
    }

    public TipoUsuario insertarTipoUsuario(TipoUsuario tipoUsuario){
        return this.repositoryTipoUsuario.save(tipoUsuario);
    }
}
