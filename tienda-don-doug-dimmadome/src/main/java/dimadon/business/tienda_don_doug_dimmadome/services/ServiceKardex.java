package dimadon.business.tienda_don_doug_dimmadome.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryKardex;
import dimadon.business.tienda_don_doug_dimmadome.Repository.RepositoryProducto;
import dimadon.business.tienda_don_doug_dimmadome.entities.Kardex;




@Service
public class ServiceKardex {

    @Autowired
    RepositoryKardex repositoryKardex;

    public ArrayList<Kardex> obtnerKardex(){
        return (ArrayList<Kardex>) repositoryKardex.findAll();
    }


    
    
}
