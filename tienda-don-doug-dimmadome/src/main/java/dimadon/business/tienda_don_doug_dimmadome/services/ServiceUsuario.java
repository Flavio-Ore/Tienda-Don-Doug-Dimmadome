package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryUsuario;
import dimadon.business.tienda_don_doug_dimmadome.entities.Usuario;

@Service
public class ServiceUsuario {
    
    @Autowired
    RepositoryUsuario repositoryUsuario;

    public ArrayList<Usuario> obtenerUsuarios() {
        return (ArrayList<Usuario>) repositoryUsuario.findAll();
    }

    public Usuario guardarUsuario(Usuario usuario) {
        return repositoryUsuario.save(usuario);
    }

    //login
    public boolean verificarCredenciales(String email, String contrasena) {
        Optional<Usuario> usuarioOpt = repositoryUsuario.findByEmail(email);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            return usuario.getContrasena().equals(contrasena); 
        }
        return false;
    }
    //cambiar estado del usuario
    public Usuario cambiarEstado(int id, String nuevoEstado) {
        Optional<Usuario> usuarioOpt = repositoryUsuario.findById(id);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            usuario.setEstado(nuevoEstado);
            return repositoryUsuario.save(usuario);
        } else {
            throw new RuntimeException("Usuario no encontrado");
        }
    }
    //actualizar usuario por id
    public Usuario actualizarUsuario(int id, Usuario usuarioActualizado) {
        Optional<Usuario> usuarioExistenteOpt = repositoryUsuario.findById(id);
        if (usuarioExistenteOpt.isPresent()) {
            Usuario usuarioExistente = usuarioExistenteOpt.get();

            usuarioExistente.setNombre(usuarioActualizado.getNombre());
            usuarioExistente.setEmail(usuarioActualizado.getEmail());
            usuarioExistente.setContrasena(usuarioActualizado.getContrasena());
            usuarioExistente.setTipoUsuario(usuarioActualizado.getTipoUsuario());
            usuarioExistente.setEstado(usuarioActualizado.getEstado());

            return repositoryUsuario.save(usuarioExistente);
        } else {
            return null;
        }
    }
    //obtener usuarios activos e inactivos
    public List<Usuario> obtenerUsuariosPorEstado(String estado) {
        return repositoryUsuario.findByEstado(estado);
    }
}
