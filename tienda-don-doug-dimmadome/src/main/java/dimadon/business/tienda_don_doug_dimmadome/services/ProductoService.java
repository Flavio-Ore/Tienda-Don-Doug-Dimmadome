package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.entities.Producto;
import dimadon.business.tienda_don_doug_dimmadome.repositories.ProductoRepository;

@Service
public class ProductoService {
    

    @Autowired
    ProductoRepository productoRepository;

    public ArrayList<Producto> listarProducto(){
        return (ArrayList<Producto>) productoRepository.findAll();
    }
    public Producto guardarProducto(Producto producto){
        return productoRepository.save(producto);
    }
}
