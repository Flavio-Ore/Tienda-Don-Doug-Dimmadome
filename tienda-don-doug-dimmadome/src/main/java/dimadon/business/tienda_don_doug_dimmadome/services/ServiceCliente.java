package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryCliente;
import dimadon.business.tienda_don_doug_dimmadome.entities.Cliente;

@Service
public class ServiceCliente {
    
    @Autowired
    RepositoryCliente repositoryCliente;

    public ArrayList<Cliente> obtenerCliente(){
        return (ArrayList<Cliente> ) repositoryCliente.findAll();

    }

    public Cliente guardarCliente(Cliente cliente){
        return repositoryCliente.save(cliente);
    }
}
