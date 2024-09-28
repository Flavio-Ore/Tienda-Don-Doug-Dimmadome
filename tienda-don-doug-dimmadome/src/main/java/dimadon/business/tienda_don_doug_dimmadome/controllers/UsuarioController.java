package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.Usuario;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceUsuario;



@RestController
@RequestMapping("/pi/usuarios")
public class UsuarioController {

    @Autowired
    ServiceUsuario serviceUsuario;

    @GetMapping()
    public ArrayList<Usuario> obtenerUsuarios(){
        return serviceUsuario.obtnerUsuario();
    }

    @PostMapping()
    public Usuario guardarUsuarios( @RequestBody Usuario usuario){
        return this.serviceUsuario.guardarUsuario(usuario);
    }
}
