package dimadon.business.tienda_don_doug_dimmadome.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import dimadon.business.tienda_don_doug_dimmadome.entities.Venta;

@Repository
public interface RepositoryVenta  extends CrudRepository<Venta, Integer> {
    
}
