package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dimadon.business.tienda_don_doug_dimmadome.entities.Usuario;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceUsuario;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "https://tienda-don-doug-dimmadome.vercel.app")
public class UsuarioController {

    @Autowired
    ServiceUsuario serviceUsuario;

    @GetMapping()
    public ArrayList<Usuario> obtenerUsuarios() {
        return serviceUsuario.obtenerUsuarios();
    }

    @PostMapping()
    public Usuario guardarUsuarios(@RequestBody Usuario usuario) {
        return this.serviceUsuario.guardarUsuario(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String contrasena = loginData.get("contrasena");

        Map<String, Object> response = new HashMap<>();
        try {
            if (serviceUsuario.verificarCredenciales(email, contrasena)) {
                response.put("success", true);
                response.put("message", "Login exitoso");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Credenciales incorrectas");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error en el servidor. Por favor intenta más tarde.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    //cambiar estado del usuario
    @PutMapping("/{id}/estado")
    public ResponseEntity<Usuario> cambiarEstado(@PathVariable("id") int id, @RequestBody Map<String, String> estadoData) {
        String nuevoEstado = estadoData.get("estado");
        Usuario usuarioActualizado = serviceUsuario.cambiarEstado(id, nuevoEstado);
        return new ResponseEntity<>(usuarioActualizado, HttpStatus.OK);
    }
    //actualiza segun el id
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable("id") int id, @RequestBody Usuario usuario) {
        Usuario usuarioActualizado = serviceUsuario.actualizarUsuario(id, usuario);
        if (usuarioActualizado != null) {
            return ResponseEntity.ok(usuarioActualizado);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); 
        }
    }
    //obtener usuarios activos e inactivos
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Usuario>> obtenerUsuariosPorEstado(@PathVariable String estado) {
        List<Usuario> usuarios = serviceUsuario.obtenerUsuariosPorEstado(estado);
        return ResponseEntity.ok(usuarios);
    }
    
}
