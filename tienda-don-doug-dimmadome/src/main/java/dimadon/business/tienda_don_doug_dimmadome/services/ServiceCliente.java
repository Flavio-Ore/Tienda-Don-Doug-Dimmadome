package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryCliente;
import dimadon.business.tienda_don_doug_dimmadome.entities.Cliente;


@Service
public class ServiceCliente {
    

    @Autowired
    RepositoryCliente repositoryCliente;

    public ArrayList<Cliente> obtenerClientes() {
        return (ArrayList<Cliente>) repositoryCliente.findAll();
    }
    
    //guardar cliente
    public Cliente guardarCliente(Cliente cliente) {
        return repositoryCliente.save(cliente);
    }
    
    //cambiar estado del cliente
    public Cliente cambiarEstado(int id, String nuevoEstado) {
        Optional<Cliente> clienteOpt = repositoryCliente.findById(id);
        if (clienteOpt.isPresent()) {
            Cliente cliente = clienteOpt.get();
            cliente.setEstado(nuevoEstado);
            return repositoryCliente.save(cliente);
        } else {
            throw new RuntimeException("Cliente no encontrado");
        }
    }
    
    //obtener usuarios activos e inactivos
    public List<Cliente> obtenerClientePorEstado(String estado) {
        return repositoryCliente.findByEstado(estado);
    }

}
