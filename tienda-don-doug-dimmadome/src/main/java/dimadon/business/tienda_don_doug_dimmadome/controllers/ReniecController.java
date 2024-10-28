package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.Cliente;
import dimadon.business.tienda_don_doug_dimmadome.services.ReniecService;

@RestController
@RequestMapping("/api/reniec")
@CrossOrigin(origins = "https://tienda-don-doug-dimmadome.vercel.app")
public class ReniecController {

    private final ReniecService reniecService;

    @Autowired
    public ReniecController(ReniecService reniecService) {
        this.reniecService = reniecService;
    }

    @PostMapping("/dni")
    public ResponseEntity<Cliente> obtenerDatosPorDni(@RequestBody Map<String, String> requestBody) {
        String dni = requestBody.get("dni");
        String direccion = requestBody.get("direccion");
        Cliente cliente = reniecService.obtenerDatosPorDni(dni,direccion);
        return ResponseEntity.ok(cliente);
    }
}
