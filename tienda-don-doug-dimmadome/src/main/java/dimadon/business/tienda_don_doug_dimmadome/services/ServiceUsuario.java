package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.entities.Usuario;
import dimadon.business.tienda_don_doug_dimmadome.repositories.UsuarioRepository;

@Service
public class ServiceUsuario {
    
    @Autowired
    UsuarioRepository usuarioRepository;

    public ArrayList<Usuario> obtnerUsuario(){
        return (ArrayList<Usuario>) usuarioRepository.findAll();
    }

    public Usuario guardarUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }
}
