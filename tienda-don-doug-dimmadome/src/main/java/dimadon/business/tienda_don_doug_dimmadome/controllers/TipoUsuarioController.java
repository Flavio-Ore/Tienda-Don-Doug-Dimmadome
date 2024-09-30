package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.TipoUsuario;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceTipoUsuario;

@RestController
@RequestMapping("/tipoUsuario")
public class TipoUsuarioController {
    

    @Autowired
    ServiceTipoUsuario serviceTipoUsuario;


    @GetMapping()
    public ArrayList<TipoUsuario> obtenerTipoUsuario(){
        return serviceTipoUsuario.obtnerUsuario();
    }

    @PostMapping()
    public TipoUsuario guardarTipoUsuario(@RequestBody TipoUsuario tipoUsuario) {
        return this.serviceTipoUsuario.insertarTipoUsuario(tipoUsuario);
    }
    
}
