package dimadon.business.tienda_don_doug_dimmadome.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import dimadon.business.tienda_don_doug_dimmadome.entities.Producto;

@Repository
public interface RepositoryProducto extends CrudRepository<Producto, Integer> {
    
}
