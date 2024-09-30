package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryDetalleVenta;
import dimadon.business.tienda_don_doug_dimmadome.entities.DetalleVenta;

@Service
public class ServiceDetalleVenta {
    
    @Autowired
    RepositoryDetalleVenta repositoryDetalleVenta;

     public ArrayList<DetalleVenta> obtenerDetalleVenta(){
        return (ArrayList<DetalleVenta>) repositoryDetalleVenta.findAll();
     }

     public DetalleVenta inserterDetalleVenta(DetalleVenta detalleVenta){
        return repositoryDetalleVenta.save(detalleVenta);
     }
}
