package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositorySalida;
import dimadon.business.tienda_don_doug_dimmadome.entities.Salida;

@Service

public class ServiceSalida {
    

    @Autowired
    RepositorySalida repositorySalida;

    public Salida insertarSalida(Salida salida){
        return repositorySalida.save(salida);
    }

    public ArrayList<Salida> obtenerSalida(){
        return (ArrayList<Salida>) repositorySalida.findAll();
    }
}
