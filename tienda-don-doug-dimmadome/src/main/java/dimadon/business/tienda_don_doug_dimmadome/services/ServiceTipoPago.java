package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryTipoPago;
import dimadon.business.tienda_don_doug_dimmadome.entities.TipoPago;

@Service
public class ServiceTipoPago {
    

    @Autowired
    RepositoryTipoPago repositoryTipoPago;

    public ArrayList<TipoPago> onbtenerTipoPago(){
        return (ArrayList<TipoPago>) repositoryTipoPago.findAll();
    }

    public TipoPago insertarTipoPago(TipoPago tipoPago){
        return this.repositoryTipoPago.save(tipoPago);
    }
}
