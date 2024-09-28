package dimadon.business.tienda_don_doug_dimmadome.controllers;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dimadon.business.tienda_don_doug_dimmadome.entities.Producto;
import dimadon.business.tienda_don_doug_dimmadome.services.ProductoService;


@RestController
@RequestMapping("/producto")
public class ProductoController {
    
    @Autowired
    ProductoService productoService;

    @GetMapping()
    public ArrayList<Producto> obtnerProducto() {
        return productoService.listarProducto();
    }

    @PostMapping()
    public Producto guardarProductos(@RequestBody Producto producto) {

        return this.productoService.guardarProducto(producto);
    }

    
}
