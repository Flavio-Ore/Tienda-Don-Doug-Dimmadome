package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.Cliente;
import dimadon.business.tienda_don_doug_dimmadome.entities.Producto;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceCliente;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "https://tienda-don-doug-dimmadome.vercel.app")
public class ClienteController {
    
    @Autowired
    private ServiceCliente serviceCliente;

    @GetMapping("/listar")
    public ArrayList<Cliente> obtenerClientes() {
        return serviceCliente.obtenerClientes();
    }

    @PostMapping("/guardar")    
    public Cliente guardarCliente(@RequestBody Cliente cliente) {
        return serviceCliente.guardarCliente(cliente);
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Cliente> cambiarEstado(@PathVariable("id") int id, @RequestBody Map<String, String> estadoData) {
        String nuevoEstado = estadoData.get("estado");
        Cliente clienteActualizado = serviceCliente.cambiarEstado(id, nuevoEstado);
        return new ResponseEntity<>(clienteActualizado, HttpStatus.OK);
    }

}
