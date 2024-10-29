package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.Kardex;
import dimadon.business.tienda_don_doug_dimmadome.entities.TipoUsuario;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceKardex;

@RestController
@RequestMapping("/kardex")
@CrossOrigin(origins = "https://tienda-don-doug-dimmadome.vercel.app")
public class KerdexController {
    
    @Autowired
    ServiceKardex serviceKardex;

    @GetMapping("/obtener")
    public ArrayList<Kardex> obtenerKardex(){
        return serviceKardex.obtnerKardex();
    }


}
