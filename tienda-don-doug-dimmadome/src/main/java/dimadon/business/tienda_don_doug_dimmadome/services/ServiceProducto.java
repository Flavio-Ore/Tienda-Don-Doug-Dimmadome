package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryKardex;
import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryProducto;
import dimadon.business.tienda_don_doug_dimmadome.entities.Kardex;
import dimadon.business.tienda_don_doug_dimmadome.entities.Producto;
import dimadon.business.tienda_don_doug_dimmadome.entities.Usuario;

@Service
public class ServiceProducto {
    
    @Autowired
    RepositoryProducto repositoryProducto; 

    public ArrayList<Producto> obtenerProducto(){
        return (ArrayList<Producto>) repositoryProducto.findAll();
    }

   @Autowired
    RepositoryKardex repositoryKardex;

    public Producto insertarProducto(Producto producto) {
        // Insertar el producto
        Producto nuevoProducto = repositoryProducto.save(producto);
    
        //guardar el registro en kardex
        Kardex kardex = new Kardex();
        kardex.setProducto(nuevoProducto);
        kardex.setNombreProducto(producto.getNombre());
        kardex.setTipoOperacion("Entrada");
        kardex.setEmpresa("Don Doug Dimadon"); 
        kardex.setCantidadEntrada(producto.getStock());
        kardex.setCostoUnitarioEntrada(producto.getPrecioUnitario()); 
        kardex.setCostoTotalEntrada(producto.getPrecioUnitario() * producto.getStock());
        kardex.setCantidadSaldo(producto.getStock());
        kardex.setCostoUnitarioSaldo(producto.getPrecioUnitario());
        kardex.setCostoTotalSaldo(producto.getPrecioUnitario() * producto.getStock());
        repositoryKardex.save(kardex);
    
        return nuevoProducto;
    }

    //cambiar estado del usuario
    public Producto cambiarEstado(int id, String nuevoEstado) {
        Optional<Producto> productoOpt = repositoryProducto.findById(id);
        if (productoOpt.isPresent()) {
            Producto producto = productoOpt.get();
            producto.setEstado(nuevoEstado);
            return repositoryProducto.save(producto);
        } else {
            throw new RuntimeException("Producto no encontrado");
        }
    }

    //actualizar usuario por id
    public Producto actualizarProducto(int id, Producto productoActualizado) {
        Optional<Producto> productoExistenteOpt = repositoryProducto.findById(id);
        if (productoExistenteOpt.isPresent()) {
            Producto productoExistente = productoExistenteOpt.get();

            productoExistente.setNombre(productoActualizado.getNombre());
            productoExistente.setPrecioUnitario(productoActualizado.getPrecioUnitario());           
            productoExistente.setStock(productoActualizado.getStock());
            productoExistente.setFechaVencimiento(productoActualizado.getFechaVencimiento());
            productoExistente.setCategoria(productoActualizado.getCategoria());
            productoExistente.setEstado(productoActualizado.getEstado());
 
            return repositoryProducto.save(productoExistente);
        } else {
            return null;
        }
    }

    //obtener usuarios activos e inactivos 
    public List<Producto> obtenerProductoPorEstado(String estado) {
        return repositoryProducto.findByEstado(estado);
    }
}
