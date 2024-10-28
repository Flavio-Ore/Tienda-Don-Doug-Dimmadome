package dimadon.business.tienda_don_doug_dimmadome.controllers;

import java.util.ArrayList;
import java.util.List;
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

import dimadon.business.tienda_don_doug_dimmadome.entities.Producto;
import dimadon.business.tienda_don_doug_dimmadome.entities.Usuario;
import dimadon.business.tienda_don_doug_dimmadome.services.ServiceProducto;


@RestController
@RequestMapping("/producto")
@CrossOrigin(origins = "https://tienda-don-doug-dimmadome.vercel.app")
public class ProductoController {
    
    @Autowired
    ServiceProducto serviceProducto;

    @GetMapping()
    public ArrayList<Producto> obtenerProducto(){
        return serviceProducto.obtenerProducto();
    }

    @PostMapping()
    public Producto guardarProducto(@RequestBody Producto producto) {
        return this.serviceProducto.insertarProducto(producto);
    }

    //cambiar estado del producto
    @PutMapping("/{id}/estado")
    public ResponseEntity<Producto> cambiarEstado(@PathVariable("id") int id, @RequestBody Map<String, String> estadoData) {
        String nuevoEstado = estadoData.get("estado");
        Producto productoActualizado = serviceProducto.cambiarEstado(id, nuevoEstado);
        return new ResponseEntity<>(productoActualizado, HttpStatus.OK);
    }

    //actualiza segun el id
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable("id") int id, @RequestBody Producto producto) {
         Producto productoActualizado = serviceProducto.actualizarProducto(id, producto);
        if (productoActualizado != null) {
            return ResponseEntity.ok(productoActualizado);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); 
        }
    }

    //obtener usuarios activos e inactivos
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Producto>> obtenerProductosPorEstado(@PathVariable String estado) {
        List<Producto> producto = serviceProducto.obtenerProductoPorEstado(estado);
        return ResponseEntity.ok(producto);
    }
}
