package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;

import dimadon.business.tienda_don_doug_dimmadome.entities.Cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.services.ServiceCliente;

@RestController
@RequestMapping("/cliente")
public class ClienteControllers {
    
    @Autowired
    ServiceCliente serviceCliente;

    @GetMapping()
    public ArrayList<Cliente> obtenerCliente(){
        return serviceCliente.obtenerCliente();
    }

    @PostMapping()
    public Cliente guardarCliente(@RequestBody Cliente cliente){
        return this.serviceCliente.guardarCliente(cliente);
    }

}
