package dimadon.business.tienda_don_doug_dimmadome.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dimadon.business.tienda_don_doug_dimmadome.entities.Producto;

@Repository
public interface  RepositoryProducto extends JpaRepository<Producto, Integer> {

    //para llamar a los usuarios por estado activo o inactivo
    List<Producto> findByEstado(String estado);
}
