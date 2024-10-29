package dimadon.business.tienda_don_doug_dimmadome.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryDetalleEntrada;
import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryEntrada;
import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryKardex;
import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryProducto;
import dimadon.business.tienda_don_doug_dimmadome.entities.DetalleEntrada;
import dimadon.business.tienda_don_doug_dimmadome.entities.Kardex;
import dimadon.business.tienda_don_doug_dimmadome.entities.Producto;
import jakarta.transaction.Transactional;

@Service
public class ServiceDetalleEntrada {
    
    @Autowired
    private RepositoryDetalleEntrada repositoryDetalleEntrada;

    @Autowired
    private RepositoryKardex repositoryKardex;

    @Autowired
    private RepositoryProducto productoRepository;

    @Autowired
    RepositoryEntrada repositoryEntrada;

    public int obtenerUltimoIdEntrada() {
        int ultimoId = repositoryEntrada.findMaxIdEntrada();
        return ultimoId; // Retorna el último ID de salida
    }

    @Transactional
    public DetalleEntrada guardarDetalle(DetalleEntrada detalleEntrada) {
        Producto producto = productoRepository.findById(detalleEntrada.getProducto().getIdProducto())
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado en la base de datos"));
        
        detalleEntrada.setProducto(producto);

      
        DetalleEntrada savedDetalleEntrada = repositoryDetalleEntrada.save(detalleEntrada);

       
        int nuevoStock = producto.getStock() + detalleEntrada.getCantidad();
        producto.setStock(nuevoStock);
        productoRepository.save(producto);

        String fechaFormateada = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        // Registramos en Kardex
        Kardex kardex = new Kardex();
        kardex.setProducto(producto);
        kardex.setNombreProducto(detalleEntrada.getNombreProducto());
        kardex.setFecha(fechaFormateada);
        kardex.setTipoOperacion("Entrada");
        kardex.setEmpresa("Doug Dimadon");
        kardex.setCantidadEntrada(detalleEntrada.getCantidad());
        kardex.setCostoUnitarioEntrada(detalleEntrada.getCostoUnitario());
        kardex.setCostoTotalEntrada(detalleEntrada.getCantidad() * detalleEntrada.getCostoUnitario());
        kardex.setCantidadSaldo(detalleEntrada.getProducto().getStock());
        kardex.setCostoUnitarioSaldo(detalleEntrada.getProducto().getPrecioUnitario());
        kardex.setCostoTotalSaldo(detalleEntrada.getProducto().getStock() * detalleEntrada.getProducto().getPrecioUnitario());

        repositoryKardex.save(kardex);

        return savedDetalleEntrada;
    }

    public ArrayList<DetalleEntrada> obtenerDetalleEntradas() {
        return (ArrayList<DetalleEntrada>) repositoryDetalleEntrada.findAll();
    }
}
