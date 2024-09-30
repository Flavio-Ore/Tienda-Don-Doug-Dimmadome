package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryUsuario;
import dimadon.business.tienda_don_doug_dimmadome.entities.Usuario;
        

@Service
public class ServiceUsuario {
    
    @Autowired
    RepositoryUsuario repositoryUsuario;

    public ArrayList<Usuario> obtnerUsuario(){
        return (ArrayList<Usuario>) repositoryUsuario.findAll();
    }

    public Usuario guardarUsuario(Usuario usuario){
        return repositoryUsuario.save(usuario);
    }
}
