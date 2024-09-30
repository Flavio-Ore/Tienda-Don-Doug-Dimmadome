package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryVenta;
import dimadon.business.tienda_don_doug_dimmadome.entities.Venta;


@Service
public class ServiceVenta {
    
   @Autowired
   RepositoryVenta repositoryVenta;

   public ArrayList<Venta> obtenerVentas(){
    return (ArrayList<Venta>)repositoryVenta.findAll();
   }

   public Venta insertarVenta(Venta venta){
    return this.repositoryVenta.save(venta);
   }
}
