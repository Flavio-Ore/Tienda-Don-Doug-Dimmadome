package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryDevolucion;
import dimadon.business.tienda_don_doug_dimmadome.entities.Devolucion;

@Service 
public class ServiceDevolucion {
    

    @Autowired
    RepositoryDevolucion repositoryDevolucion;

    public ArrayList<Devolucion> obtenerDevolucion(){
        return (ArrayList<Devolucion>) repositoryDevolucion.findAll();
    }

    public Devolucion insertatDevolucion(Devolucion devolucion){
        return this.repositoryDevolucion.save(devolucion);
    }
}
